import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const modulo = process.argv[2] || "1";
const publicDir = path.resolve("public/formacoes", modulo);
const htmlFile = path.join(publicDir, "index.html");

if (!fs.existsSync(htmlFile)) {
	console.error(`❌ Erro: Apostila do módulo ${modulo} não encontrada em ${htmlFile}`);
	process.exit(1);
}

const outputDir = path.resolve("dist/apostilas");
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

const tmpRgbPdf = path.join(outputDir, `modulo-${modulo}-rgb-temp.pdf`);
const finalCmykPdf = path.join(outputDir, `LASER-ESP32-Modulo-${modulo}-CMYK.pdf`);

console.log(`\n🚀 Iniciando exportação da Apostila (Módulo ${modulo})...`);
console.log(`📄 Arquivo fonte: ${htmlFile}`);

async function exportar() {
	console.log("\n[1/3] Renderizando páginas no Puppeteer e aguardando Paged.js...");
	const browser = await puppeteer.launch({
		headless: "new",
		args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security", "--allow-file-access-from-files"]
	});

	try {
		const page = await browser.newPage();
		await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
		
		await page.goto(`file://${htmlFile}`, { waitUntil: "networkidle0", timeout: 60000 });

		// Aguarda o Paged.js concluir a montagem de todas as páginas
		await page.waitForFunction(() => {
			const pages = document.querySelectorAll(".pagedjs_page");
			return pages.length > 0 && !document.querySelector(".aviso-carregando");
		}, { timeout: 30000 });

		// Aguarda 1 segundo adicional para renderização de fontes e SVG
		await new Promise((r) => setTimeout(r, 1000));

		console.log("[2/3] Gerando PDF em alta resolução...");
		await page.pdf({
			path: tmpRgbPdf,
			format: "A4",
			printBackground: true,
			preferCSSPageSize: true,
			margin: { top: 0, right: 0, bottom: 0, left: 0 }
		});

		console.log(`[3/3] Convertendo espaço de cor para CMYK (ISO Coated) via Ghostscript...`);
		const gsCmd = `gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -sColorConversionStrategy=CMYK -dProcessColorModel=/DeviceCMYK -dCompatibilityLevel=1.4 -sOutputFile="${finalCmykPdf}" "${tmpRgbPdf}"`;
		
		execSync(gsCmd, { stdio: "pipe" });

		if (fs.existsSync(tmpRgbPdf)) {
			fs.unlinkSync(tmpRgbPdf);
		}

		const stats = fs.statSync(finalCmykPdf);
		const tamanhoMB = (stats.size / (1024 * 1024)).toFixed(2);

		console.log(`\n✅ PDF em CMYK gerado com sucesso!`);
		console.log(`📂 Destino: ${finalCmykPdf}`);
		console.log(`📊 Tamanho: ${tamanhoMB} MB\n`);
	} catch (err) {
		console.error("❌ Erro durante a geração:", err);
		process.exit(1);
	} finally {
		await browser.close();
	}
}

exportar();
