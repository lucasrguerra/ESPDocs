/**
 * Exporta os slides de uma formação para PDF em 16:9 exato.
 *
 *   npm run slides-pdf            → módulo 1
 *   npm run slides-pdf -- 2       → módulo 2
 *
 * A página do PDF tem 1280 x 720 px (338,667 x 190,5 mm), a mesma caixa do
 * palco do slide.html, então nada é reescalado nem cortado. Sai um arquivo por
 * formação, ao lado do próprio slide.html.
 *
 * Existe porque a caixa de impressão do navegador depende de o usuário lembrar
 * de marcar "gráficos de segundo plano" e "margens: nenhuma". Aqui isso é fixo.
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modulo = (process.argv[2] || "1").replace(/\D/g, "") || "1";
const pastaModulo = path.join(raiz, "public", "formacoes", modulo);
const saida = path.join(pastaModulo, `LASER-ESP32-Modulo-${modulo}-Slides.pdf`);

if (!fs.existsSync(path.join(pastaModulo, "slide.html"))) {
	console.error(`Não achei public/formacoes/${modulo}/slide.html`);
	process.exit(1);
}

/* Um servidor estático efêmero: com file:// o Chrome bloqueia as fontes e as
   imagens de pastas irmãs, e o PDF sai com o tipo errado. */
const TIPOS = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".svg": "image/svg+xml",
	".png": "image/png",
	".jpg": "image/jpeg",
	".json": "application/json",
};

const servidor = http.createServer((req, res) => {
	const rel = decodeURIComponent(req.url.split("?")[0]);
	const arquivo = path.join(raiz, "public", path.normalize(rel).replace(/^(\.\.[/\\])+/, ""));
	if (!arquivo.startsWith(path.join(raiz, "public")) || !fs.existsSync(arquivo) || fs.statSync(arquivo).isDirectory()) {
		res.writeHead(404).end("não encontrado");
		return;
	}
	res.writeHead(200, { "Content-Type": TIPOS[path.extname(arquivo)] || "application/octet-stream" });
	fs.createReadStream(arquivo).pipe(res);
});

await new Promise((r) => servidor.listen(0, "127.0.0.1", r));
const porta = servidor.address().port;
const url = `http://127.0.0.1:${porta}/formacoes/${modulo}/slide.html`;

console.log(`[1/3] Abrindo ${url}`);
const navegador = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });

try {
	const pagina = await navegador.newPage();
	await pagina.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
	await pagina.evaluate(() => document.fonts.ready);

	console.log("[2/3] Conferindo o encaixe de cada slide no 16:9");
	await pagina.emulateMediaType("print");
	await new Promise((r) => setTimeout(r, 500));

	const caixas = await pagina.evaluate(() =>
		[...document.querySelectorAll("#palco .slide")].map((s) => {
			const b = s.getBoundingClientRect();
			return { t: s.dataset.titulo, w: Math.round(b.width), h: Math.round(b.height) };
		})
	);
	const fora = caixas.filter((c) => c.w !== 1280 || c.h !== 720);
	if (fora.length) {
		console.warn(`  atenção: ${fora.length} slide(s) fora de 1280x720:`, fora.slice(0, 5));
	} else {
		console.log(`  ${caixas.length} slides, todos em 1280x720`);
	}

	console.log("[3/3] Gerando o PDF");
	await pagina.pdf({
		path: saida,
		printBackground: true,
		preferCSSPageSize: true,
		margin: { top: 0, right: 0, bottom: 0, left: 0 },
	});

	const kb = (fs.statSync(saida).size / 1024).toFixed(0);
	console.log(`\nPronto: ${path.relative(raiz, saida)} (${kb} KB, ${caixas.length} páginas em 16:9)`);
} finally {
	await navegador.close();
	servidor.close();
}
