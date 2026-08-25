import seriesData from "@/public/series.json";
import frameworksData from "@/public/frameworks.json";
import { SITE } from "@/lib/seo";

/**
 * Sitemap gerado a partir dos próprios dados do site.
 *
 * Antes não existia sitemap nenhum, então o Google só chegava às páginas de
 * série e de framework se topasse com um link. Como são geradas a partir de
 * JSON, uma série nova entra aqui sozinha.
 */
export default function sitemap() {
	// Usar uma data de revisão estável evita que todo deploy force o Googlebot
	// a reprocessar páginas idênticas ao mesmo tempo.
	const dataRevisao = new Date("2026-08-25T00:00:00.000Z");

	const fixas = [
		{ caminho: "", prioridade: 1.0, frequencia: "weekly", lastModified: dataRevisao },
		{ caminho: "/series", prioridade: 0.9, frequencia: "weekly", lastModified: dataRevisao },
		{ caminho: "/comparacao", prioridade: 0.9, frequencia: "weekly", lastModified: dataRevisao },
		{ caminho: "/diagnostico", prioridade: 0.9, frequencia: "weekly", lastModified: dataRevisao },
		{ caminho: "/seletor", prioridade: 0.8, frequencia: "monthly", lastModified: dataRevisao },
		{ caminho: "/frameworks", prioridade: 0.8, frequencia: "monthly", lastModified: dataRevisao },
		{ caminho: "/componentes", prioridade: 0.8, frequencia: "weekly", lastModified: dataRevisao },
		{ caminho: "/glossario", prioridade: 0.7, frequencia: "monthly", lastModified: dataRevisao },
		{ caminho: "/catalogo", prioridade: 0.6, frequencia: "weekly", lastModified: dataRevisao },
		{ caminho: "/sobre", prioridade: 0.4, frequencia: "yearly", lastModified: dataRevisao },
	];

	const series = Object.keys(seriesData).map((chave) => ({
		caminho: `/series/${chave}`,
		prioridade: 0.9,
		frequencia: "monthly",
		lastModified: dataRevisao,
	}));

	const frameworks = Object.keys(frameworksData).map((chave) => ({
		caminho: `/frameworks/${encodeURIComponent(chave)}`,
		prioridade: 0.6,
		frequencia: "monthly",
		lastModified: dataRevisao,
	}));

	return [...fixas, ...series, ...frameworks].map(({ caminho, prioridade, frequencia, lastModified }) => ({
		url: `${SITE.url}${caminho}`,
		lastModified,
		changeFrequency: frequencia,
		priority: prioridade,
	}));
}
