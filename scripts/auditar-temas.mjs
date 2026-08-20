#!/usr/bin/env node
/**
 * Auditor de consistência entre os temas claro e escuro.
 *
 * Verifica quatro coisas nos arquivos .jsx do projeto:
 *
 *   1. TOM INEXISTENTE: classe usando um valor fora da escala declarada.
 *                         Não gera CSS: o elemento herda a cor do pai.
 *   2. PAR INVERTIDO: no tema escuro o texto deveria clarear (número menor)
 *                         e o fundo/borda deveria escurecer (número maior).
 *   3. CONTRASTE BAIXO: par abaixo de 4.5:1 (AA para texto).
 *   4. SEM TEMA ESCURO: arquivo que pinta cor mas não tem nenhuma variante
 *                       dark:. Foi assim que o glossário passou meses só com
 *                       tema claro sem ninguém notar.
 *   5. FAMÍLIA FORA DO PADRÃO: gray/zinc/neutral/stone no lugar de slate. Além
 *                       de destoar, escapa das checagens acima, que olham slate.
 *   6. COR FIXA INLINE: style={{ borderColor: 'rgba(...)' }} com valor literal.
 *                         Style inline vence classe, então anula a cor do tema
 *                         (inclusive as variantes dark: e hover:). Cor vinda do
 *                         dado (serie.cor) é permitida, ver DESIGN.md seção 5.
 *
 * Uso:  npm run auditar-temas
 * Sai com código 1 se encontrar problema. Ver DESIGN.md.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// Escala slate: oficial do Tailwind + os meios-tons declarados em globals.css
const ESCALA = {
	"50": "#f8fafc", "100": "#f1f5f9", "150": "#eaeef4", "200": "#e2e8f0",
	"250": "#d6dee8", "300": "#cbd5e1", "350": "#b0bccc", "400": "#94a3b8",
	"450": "#7c8ca2", "500": "#64748b", "550": "#56647a", "600": "#475569",
	"650": "#3d4b5f", "700": "#334155", "750": "#283548", "800": "#1e293b",
	"850": "#162032", "900": "#0f172a", "950": "#020617",
};

const FUNDO_CLARO = "#ffffff";
const FUNDO_ESCURO = "#0f172a"; // slate-900, superfície de card no tema escuro
const AA = 4.5;

function luminancia(hexa) {
	const limpo = hexa.replace("#", "");
	const canal = (c) => {
		c /= 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	};
	const [r, g, b] = [0, 2, 4].map((i) => canal(parseInt(limpo.slice(i, i + 2), 16)));
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(a, b) {
	const [maior, menor] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
	return (maior + 0.05) / (menor + 0.05);
}

/** Caminha app/ e components/ recursivamente atrás de .jsx. */
function arquivos() {
	const achados = [];
	const anda = (dir) => {
		let entradas;
		try {
			entradas = readdirSync(dir);
		} catch {
			return;
		}
		for (const nome of entradas) {
			const caminho = join(dir, nome);
			if (statSync(caminho).isDirectory()) anda(caminho);
			else if (nome.endsWith(".jsx")) achados.push(caminho);
		}
	};
	anda("app");
	anda("components");
	return achados.sort();
}

const RX_QUALQUER = /\b(?:text|bg|border|divide|ring|from|via|to)-slate-(\d+)\b/g;
const RX_TEXTO = /\btext-slate-(\d+) dark:text-slate-(\d+)\b/g;
const RX_SUPERFICIE = /\b(bg|border)-slate-(\d+)(?:\/\d+)? dark:\1-slate-(\d+)(?:\/\d+)?\b/g;
// texto que acompanha um componente invertido: claro -> escuro (sem /g: usado com .test)
const RX_TEXTO_INVERTIDO = /\btext-white dark:text-slate-(?:[5-9]\d0|950)\b/;
// Blocos style={{ ... }}: só dentro deles uma cor literal é problema.
// Fora disso, `color: "#6366f1"` costuma ser tabela de dados (categorias de pino).
const RX_BLOCO_STYLE = /style=\{\{([\s\S]*?)\}\}/g;
// Cor literal: aspas seguidas de #, rgb(), hsl() ou nome de cor.
const RX_COR_FIXA = /\b(borderColor|backgroundColor|color)\s*:\s*['"](?:#|rgb|hsl|transparent|white|black)/g;
// Qualquer classe que pinte cor, para medir se o arquivo tem tema escuro.
const RX_PINTA = /\b(?:text|bg|border|divide|from|via|to)-(?:slate|gray|zinc|neutral|stone|white)(?:-\d+)?(?:\/\d+)?\b/g;
// Famílias de cinza fora do padrão do projeto (que é slate).
const RX_FAMILIA_ERRADA = /\b(?:text|bg|border|divide|from|via|to)-(gray|zinc|neutral|stone)-\d+/g;
// Variante dark: DE VERDADE, seguida de um utilitário. Procurar só por "dark:"
// daria falso negativo: a palavra aparece em comentário e em texto visível.
const RX_VARIANTE_DARK = /\bdark:(?:hover:|focus:|group-hover:|active:)?[a-z]+-/;

/** Cor literal dentro de style={{}}: vence a classe e mata a variante dark:. */
function coresFixasInline(arq) {
	const texto = readFileSync(arq, "utf8");
	const achados = [];
	for (const bloco of texto.matchAll(RX_BLOCO_STYLE)) {
		for (const m of bloco[1].matchAll(RX_COR_FIXA)) {
			const posicao = bloco.index + m.index;
			const linha = texto.slice(0, posicao).split("\n").length;
			achados.push([arq, linha, m[1], "cor literal inline anula a classe de tema"]);
		}
	}
	return achados;
}

function main() {
	const inexistentes = new Map();
	const invertidos = [];
	const fracos = [];
	const fixas = [];
	const semTemaEscuro = [];
	const familiaErrada = new Map();

	for (const arq of arquivos()) {
		fixas.push(...coresFixasInline(arq));

		const bruto = readFileSync(arq, "utf8");
		// Um arquivo que pinta muita cor e não tem nenhuma variante dark: quase
		// certamente não acompanha o tema.
		const pinta = (bruto.match(RX_PINTA) || []).length;
		const temDark = RX_VARIANTE_DARK.test(bruto);
		if (pinta >= 8 && !temDark) {
			semTemaEscuro.push([arq, `${pinta} classes de cor, nenhuma variante dark:`]);
		}
		for (const m of bruto.matchAll(RX_FAMILIA_ERRADA)) {
			const chave = `${arq}  ${m[1]}-*`;
			familiaErrada.set(chave, (familiaErrada.get(chave) ?? 0) + 1);
		}

		const linhas = bruto.split("\n");
		linhas.forEach((linha, i) => {
			const n = i + 1;

			for (const m of linha.matchAll(RX_QUALQUER)) {
				if (!(m[1] in ESCALA)) {
					const chave = `${arq}:${n}  ${m[0]}`;
					inexistentes.set(chave, (inexistentes.get(chave) ?? 0) + 1);
				}
			}

			for (const m of linha.matchAll(RX_TEXTO)) {
				const [, claro, escuro] = m;
				if (!(claro in ESCALA) || !(escuro in ESCALA)) continue;
				if (Number(escuro) > Number(claro)) {
					invertidos.push([arq, n, m[0], "texto escurece no tema escuro"]);
				}
				const c1 = contraste(ESCALA[claro], FUNDO_CLARO);
				const c2 = contraste(ESCALA[escuro], FUNDO_ESCURO);
				if (c1 < AA || c2 < AA) {
					fracos.push([arq, n, m[0], +c1.toFixed(2), +c2.toFixed(2)]);
				}
			}

			for (const m of linha.matchAll(RX_SUPERFICIE)) {
				const [, , claro, escuro] = m;
				if (!(claro in ESCALA) || !(escuro in ESCALA)) continue;
				if (Number(escuro) > Number(claro)) continue;
				// Inversão deliberada (DESIGN.md seção 4): superfície escura nos DOIS
				// temas: tooltip, bloco de código, botão escuro secundário.
				if (Number(claro) >= 800 && Number(escuro) >= 800) continue;
				// Botão que inverte preto<->branco NÃO é exceção: é bug.
				// Ver DESIGN.md 4.1: botão carrega a própria cor.
				const textoInverte =
					RX_TEXTO_INVERTIDO.test(linha) ||
					[...linha.matchAll(RX_TEXTO)].some((t) => Number(t[2]) > Number(t[1]));
				if (textoInverte) {
					invertidos.push([arq, n, m[0],
						"botão invertendo preto/branco, use cor própria (DESIGN.md 4.1)"]);
					continue;
				}
				invertidos.push([arq, n, m[0], "fundo/borda não escurece no tema escuro"]);
			}
		});
	}

	const secao = (titulo, itens) => {
		console.log(`\n${titulo}: ${itens.length}`);
		for (const i of itens) console.log("   ", ...i);
	};

	if (inexistentes.size) {
		const total = [...inexistentes.values()].reduce((a, b) => a + b, 0);
		console.log(`\nTONS FORA DA ESCALA: ${total}`);
		console.log("   (não geram CSS: declare em globals.css ou troque por um tom válido)");
		for (const [k, v] of [...inexistentes].sort((a, b) => b[1] - a[1])) {
			console.log(`    ${v}x  ${k}`);
		}
	}

	secao("ARQUIVOS SEM TEMA ESCURO", semTemaEscuro);

	if (familiaErrada.size) {
		const total = [...familiaErrada.values()].reduce((a, b) => a + b, 0);
		console.log(`\nFAMÍLIA DE CINZA FORA DO PADRÃO: ${total}`);
		console.log("   (o projeto usa slate; gray/zinc/neutral/stone destoam e escapam da auditoria)");
		for (const [k, v] of [...familiaErrada].sort((a, b) => b[1] - a[1])) {
			console.log(`    ${v}x  ${k}`);
		}
	}

	secao("PARES INVERTIDOS", invertidos);
	secao(`PARES ABAIXO DE AA (${AA}:1)`, fracos);
	secao("COR FIXA EM STYLE INLINE", fixas);

	const total =
		[...inexistentes.values()].reduce((a, b) => a + b, 0) +
		[...familiaErrada.values()].reduce((a, b) => a + b, 0) +
		invertidos.length + fracos.length + fixas.length + semTemaEscuro.length;
	console.log(`\n${total === 0 ? "OK, nenhum problema." : `${total} problema(s).`}`);
	console.log("Exceção legítima: painel escuro nos DOIS temas (tooltip, bloco de código).");
	console.log("Nesses casos não use variante dark:. Ver DESIGN.md seção 4.");
	return total ? 1 : 0;
}

process.exitCode = main();
