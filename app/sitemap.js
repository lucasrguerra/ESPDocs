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
	const agora = new Date();

	const fixas = [
		{ caminho: "", prioridade: 1.0, frequencia: "weekly" },
		{ caminho: "/series", prioridade: 0.9, frequencia: "weekly" },
		{ caminho: "/comparacao", prioridade: 0.9, frequencia: "weekly" },
		{ caminho: "/seletor", prioridade: 0.8, frequencia: "monthly" },
		{ caminho: "/frameworks", prioridade: 0.8, frequencia: "monthly" },
		{ caminho: "/glossario", prioridade: 0.7, frequencia: "monthly" },
		{ caminho: "/catalogo", prioridade: 0.6, frequencia: "weekly" },
		{ caminho: "/sobre", prioridade: 0.4, frequencia: "yearly" },
	];

	const series = Object.keys(seriesData).map((chave) => ({
		caminho: `/series/${chave}`,
		prioridade: 0.9,
		frequencia: "monthly",
	}));

	const frameworks = Object.keys(frameworksData).map((chave) => ({
		caminho: `/frameworks/${encodeURIComponent(chave)}`,
		prioridade: 0.6,
		frequencia: "monthly",
	}));

	return [...fixas, ...series, ...frameworks].map(({ caminho, prioridade, frequencia }) => ({
		url: `${SITE.url}${caminho}`,
		lastModified: agora,
		changeFrequency: frequencia,
		priority: prioridade,
	}));
}
