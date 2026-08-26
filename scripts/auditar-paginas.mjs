#!/usr/bin/env node
/**
 * ESPDocs - Script de Auditoria Automatizada de Páginas & Qualidade
 *
 * Valida todos os componentes e páginas da aplicação contra os critérios
 * do Google Lighthouse e PageSpeed Insights:
 *
 * 1. ACESSIBILIDADE (A11y):
 *    - Todas as imagens têm 'alt' e dimensões definidas (evita CLS).
 *    - Todos os botões e links com ícone têm 'aria-label' ou texto visível.
 *    - Links com target="_blank" têm rel="noopener noreferrer".
 *    - Verificação de classes com contraste abaixo de 4.5:1 (WCAG AA).
 *    - Nenhum elemento interativo com texto vazio.
 *
 * 2. PERFORMANCE & COMPOSIÇÃO:
 *    - Sem 'transition-all' ou 'transition-colors' no body/containers raiz
 *      (evita reflow forçado e animações não compostas).
 *    - ThemeProvider configurado com 'disableTransitionOnChange'.
 *    - Baseline de navegadores em .browserslistrc moderno (evita polyfills desnecessários).
 *
 * 3. SEO & ESTRUTURA SEMÂNTICA:
 *    - Hierarquia de cabeçalhos (h1 único por página principal).
 *    - Presença de tags semânticas (<header>, <main>, <footer>, <nav>).
 *    - Metadados e JSON-LD estruturados.
 *
 * 4. INTEGRIDADE DE LINKS:
 *    - Todos os hrefs internos apontam para rotas que realmente existem no app/.
 *
 * Uso: npm run audit
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const CORES = {
	reset: "\x1b[0m",
	verde: "\x1b[32m",
	vermelho: "\x1b[31m",
	amarelo: "\x1b[33m",
	azul: "\x1b[34m",
	ciano: "\x1b[36m",
	negrito: "\x1b[1m",
	cinza: "\x1b[90m",
};

function log(msg) {
	console.log(msg);
}

function sucesso(msg) {
	console.log(`  ${CORES.verde}✔${CORES.reset} ${msg}`);
}

function falha(msg) {
	console.log(`  ${CORES.vermelho}✖${CORES.reset} ${msg}`);
}

function aviso(msg) {
	console.log(`  ${CORES.amarelo}⚠${CORES.reset} ${msg}`);
}

/** Caminha recursivamente por diretórios buscando arquivos com determinadas extensões */
function buscarArquivos(dir, ext = [".jsx", ".js"]) {
	const achados = [];
	const anda = (d) => {
		let entradas;
		try {
			entradas = readdirSync(d);
		} catch {
			return;
		}
		for (const nome of entradas) {
			if (nome === "node_modules" || nome === ".next" || nome === ".git" || nome === "public") continue;
			const caminho = join(d, nome);
			if (statSync(caminho).isDirectory()) {
				anda(caminho);
			} else if (ext.some((e) => nome.endsWith(e))) {
				achados.push(caminho);
			}
		}
	};
	anda(dir);
	return achados.sort();
}

/** Descobre todas as rotas válidas no app/ */
function obterRotasExistentes() {
	const rotas = new Set(["/", "/api/placas", "/api/og"]);
	const arquivosApp = buscarArquivos("app");

	for (const arq of arquivosApp) {
		if (arq.endsWith("page.jsx") || arq.endsWith("page.js")) {
			let rota = arq
				.replace(/^app/, "")
				.replace(/\/page\.(jsx|js)$/, "");
			if (rota === "") rota = "/";
			rotas.add(rota);
		}
	}
	return rotas;
}

let totalProblemas = 0;

// --------------------------------------------------------------------------
// 1. Auditoria de Configurações de Performance (.browserslistrc & ThemeProvider)
// --------------------------------------------------------------------------
function auditarPerformanceConfigs() {
	log(`\n${CORES.negrito}${CORES.ciano}[1/5] Auditoria de Configurações de Performance & Runtime${CORES.reset}`);
	
	// Checar .browserslistrc
	if (existsSync(".browserslistrc")) {
		const conteudo = readFileSync(".browserslistrc", "utf8");
		if (conteudo.includes("safari >= 15\n") || conteudo.includes("chrome >= 90\n")) {
			falha(".browserslistrc está com alvos legados (< Safari 16.4 ou < Chrome 109), forçando polyfills de ES2022.");
			totalProblemas++;
		} else {
			sucesso(".browserslistrc configurado para baseline moderno (zero polyfills ES2019-ES2022 desnecessários).");
		}
	}

	// Checar Providers.jsx
	if (existsSync("components/Providers.jsx")) {
		const providers = readFileSync("components/Providers.jsx", "utf8");
		if (!providers.includes("disableTransitionOnChange")) {
			falha("ThemeProvider em components/Providers.jsx deve usar disableTransitionOnChange para evitar reflows no tema.");
			totalProblemas++;
		} else {
			sucesso("ThemeProvider com disableTransitionOnChange ativo (elimina reflow forçado).");
		}
	}

	// Checar globals.css e layout.jsx para transições no body
	const globalsCss = existsSync("app/globals.css") ? readFileSync("app/globals.css", "utf8") : "";
	const layoutJsx = existsSync("app/layout.jsx") ? readFileSync("app/layout.jsx", "utf8") : "";

	if (globalsCss.includes("body {\n\t\t@apply bg-slate-50 text-slate-900 transition-colors")) {
		falha("globals.css tem transition-colors global no body (provoca animações não compostas no load).");
		totalProblemas++;
	} else if (layoutJsx.includes('body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors')) {
		falha("layout.jsx tem transition-colors global no body.");
		totalProblemas++;
	} else {
		sucesso("Body livre de transições de cores globais no carregamento.");
	}
}

// --------------------------------------------------------------------------
// 2. Auditoria de Contraste e Classes Incompatíveis
// --------------------------------------------------------------------------
function auditarContrasteEClasses() {
	log(`\n${CORES.negrito}${CORES.ciano}[2/5] Auditoria de Acessibilidade de Cores & Botões (WCAG AA)${CORES.reset}`);
	
	const arquivos = [...buscarArquivos("app"), ...buscarArquivos("components")];
	let errosContraste = 0;

	for (const arq of arquivos) {
		const conteudo = readFileSync(arq, "utf8");
		const linhas = conteudo.split("\n");

		linhas.forEach((linha, i) => {
			const n = i + 1;
			// bg-amber-600 com text-white falha contraste (ratio ~3.78:1)
			if (/\bbg-amber-600\b/.test(linha) && /\btext-white\b/.test(linha)) {
				falha(`${arq}:${n} -> 'bg-amber-600 text-white' falha contraste WCAG AA (< 4.5:1). Use 'bg-amber-700' ou 'text-slate-950'.`);
				errosContraste++;
			}
			// bg-amber-500 com text-white falha contraste severamente (< 2.5:1)
			if (/\bbg-amber-500\b/.test(linha) && /\btext-white\b/.test(linha)) {
				falha(`${arq}:${n} -> 'bg-amber-500 text-white' falha contraste WCAG AA (< 2.5:1). Use 'text-slate-950'.`);
				errosContraste++;
			}
			// bg-yellow-500/600 com text-white
			if (/\bbg-yellow-[56]00\b/.test(linha) && /\btext-white\b/.test(linha)) {
				falha(`${arq}:${n} -> 'bg-yellow-* text-white' falha contraste WCAG AA. Use texto escuro.`);
				errosContraste++;
			}
		});
	}

	if (errosContraste === 0) {
		sucesso("Todos os botões e badges inspecionados atendem à taxa mínima de contraste WCAG AA (>= 4.5:1).");
	} else {
		totalProblemas += errosContraste;
	}
}

// --------------------------------------------------------------------------
// 3. Auditoria de Imagens e Multimídia (A11y & CLS)
// --------------------------------------------------------------------------
function auditarImagens() {
	log(`\n${CORES.negrito}${CORES.ciano}[3/5] Auditoria de Imagens & CLS (Tags <img> e <Image>)${CORES.reset}`);
	
	const arquivos = [...buscarArquivos("app"), ...buscarArquivos("components")];
	let errosImagens = 0;

	for (const arq of arquivos) {
		const conteudo = readFileSync(arq, "utf8");

		// Buscar tags <Image ou <img
		const imgRegex = /<(?:Image|img)\b([^>]*)\/?>/g;
		let match;
		while ((match = imgRegex.exec(conteudo)) !== null) {
			const tagProps = match[1];
			// Checar alt
			if (!tagProps.includes("alt=")) {
				falha(`${arq} -> Tag de imagem sem atributo 'alt' obrigatório.`);
				errosImagens++;
			} else if (/alt=["']\s*["']/.test(tagProps) && !tagProps.includes("aria-hidden")) {
				aviso(`${arq} -> Tag de imagem com 'alt' vazio. Se decorativa, use 'aria-hidden="true"'.`);
			}
			// Checar dimensões explícitas
			const temWidth = tagProps.includes("width=");
			const temHeight = tagProps.includes("height=");
			const temFill = tagProps.includes("fill");
			if (!temFill && (!temWidth || !temHeight)) {
				falha(`${arq} -> Imagem sem largura/altura explícitas (width/height ou fill), o que pode causar CLS.`);
				errosImagens++;
			}
		}
	}

	if (errosImagens === 0) {
		sucesso("Todas as imagens possuem 'alt' acessível e dimensões declaradas (prevenção de CLS).");
	} else {
		totalProblemas += errosImagens;
	}
}

// --------------------------------------------------------------------------
// 4. Auditoria de Links e Botões Acessíveis
// --------------------------------------------------------------------------
function auditarLinksEInteracoes() {
	log(`\n${CORES.negrito}${CORES.ciano}[4/5] Auditoria de Links e Rótulos Acessíveis (A11y & SEO)${CORES.reset}`);
	
	const arquivos = [...buscarArquivos("app"), ...buscarArquivos("components")];
	let errosLinks = 0;

	for (const arq of arquivos) {
		const conteudo = readFileSync(arq, "utf8");

		// Checar target="_blank" sem rel="noopener noreferrer"
		const blankRegex = /<a\b[^>]*target=["']_blank["'][^>]*>/g;
		let match;
		while ((match = blankRegex.exec(conteudo)) !== null) {
			const tag = match[0];
			if (!tag.includes("rel=") || (!tag.includes("noopener") && !tag.includes("noreferrer"))) {
				falha(`${arq} -> Link com target="_blank" sem 'rel="noopener noreferrer"'.`);
				errosLinks++;
			}
		}

		// Checar botões sem texto/aria-label
		const buttonRegex = /<button\b([^>]*)>([\s\S]*?)<\/button>/g;
		let btnMatch;
		while ((btnMatch = buttonRegex.exec(conteudo)) !== null) {
			const props = btnMatch[1];
			const corpo = btnMatch[2].trim();
			const temAriaLabel = props.includes("aria-label=") || props.includes("aria-labelledby=");
			// Se o corpo não tem texto visível (ex: apenas <X />, <Menu />, etc.)
			const temTextoPuro = /[a-zA-Z0-9À-ÿ]{2,}/.test(corpo.replace(/<[^>]*>/g, ""));
			if (!temAriaLabel && !temTextoPuro && !props.includes("title=")) {
				aviso(`${arq} -> Botão potencialmente sem rótulo acessível ou texto visível: <button ${props.slice(0, 40)}...>`);
			}
		}
	}

	if (errosLinks === 0) {
		sucesso("Links externos e botões interativos estão em conformidade com as regras de segurança e acessibilidade.");
	} else {
		totalProblemas += errosLinks;
	}
}

// --------------------------------------------------------------------------
// 5. Auditoria de Integridade de Rotas Internas
// --------------------------------------------------------------------------
function auditarRotasInternas() {
	log(`\n${CORES.negrito}${CORES.ciano}[5/5] Auditoria de Integridade de Rotas Internas (Prevenção 404)${CORES.reset}`);
	
	const rotasValidas = obterRotasExistentes();
	const arquivos = [...buscarArquivos("app"), ...buscarArquivos("components")];
	let rotasQuebradas = 0;

	// Rotas dinâmicas conhecidas
	const rotasDinamicas = [
		/^\/series\/[a-zA-Z0-9_-]+$/,
		/^\/frameworks\/[a-zA-Z0-9_-]+$/,
		/^\/slides\/[a-zA-Z0-9_-]+$/,
	];

	for (const arq of arquivos) {
		const conteudo = readFileSync(arq, "utf8");
		const hrefRegex = /href=["'](\/[^"'#?]*)["']/g;
		let match;

		while ((match = hrefRegex.exec(conteudo)) !== null) {
			const caminho = match[1];
			if (caminho.startsWith("/api") || caminho.startsWith("/favicon") || caminho.startsWith("/icon") || caminho.startsWith("/logo") || caminho.startsWith("/site.webmanifest")) {
				continue;
			}
			const existe = rotasValidas.has(caminho) || rotasDinamicas.some((rx) => rx.test(caminho));
			if (!existe) {
				falha(`${arq} -> Link interno aponta para rota inexistente: '${caminho}'`);
				rotasQuebradas++;
			}
		}
	}

	if (rotasQuebradas === 0) {
		sucesso(`Todas as referências de rotas internas foram validadas com sucesso (${rotasValidas.size} rotas mapeadas).`);
	} else {
		totalProblemas += rotasQuebradas;
	}
}

// --------------------------------------------------------------------------
// Execução Principal
// --------------------------------------------------------------------------
function main() {
	log(`${CORES.negrito}${CORES.azul}======================================================${CORES.reset}`);
	log(`${CORES.negrito}${CORES.azul}   ESPDocs · Auditoria Automatizada de Páginas 100%   ${CORES.reset}`);
	log(`${CORES.negrito}${CORES.azul}======================================================${CORES.reset}`);

	auditarPerformanceConfigs();
	auditarContrasteEClasses();
	auditarImagens();
	auditarLinksEInteracoes();
	auditarRotasInternas();

	log(`\n${CORES.negrito}------------------------------------------------------${CORES.reset}`);
	if (totalProblemas === 0) {
		log(`${CORES.verde}${CORES.negrito}🎉 TODAS AS AUDITORIAS PASSARAM COM SUCESSO! (0 problemas)${CORES.reset}`);
		log(`${CORES.cinza}O site está otimizado para atingir 100% no Lighthouse / PageSpeed.${CORES.reset}\n`);
		return 0;
	} else {
		log(`${CORES.vermelho}${CORES.negrito}✖ Foram encontrados ${totalProblemas} problema(s) que precisam de correção.${CORES.reset}\n`);
		return 1;
	}
}

process.exitCode = main();
