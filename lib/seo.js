/**
 * Fonte única das informações de SEO do ESPDocs.
 *
 * Centralizar aqui evita o problema clássico de metadata espalhado: a URL do
 * site aparecendo com valores diferentes em cada arquivo, ou uma página nova
 * nascendo sem título próprio.
 */

export const SITE = {
	url: "https://espdocs.cienciaembarcada.com.br",
	nome: "ESPDocs",
	autor: "Lucas Rayan Guerra",
	autorUrl: "https://lucasrguerra.dev.br",
	autorLinkedin: "https://linkedin.com/in/lucasrguerra",
	autorEmail: "contato@lucasrguerra.dev.br",
	repositorio: "https://github.com/lucasrguerra/ESPDocs",
	blog: "https://cienciaembarcada.com.br",
};

/**
 * Monta o objeto `metadata` de uma página, já com canonical e Open Graph.
 * Usar isto em vez de escrever o objeto à mão garante que nenhuma página fique
 * sem canonical ou sem og:title.
 */
export function paginaMeta({ titulo, descricao, caminho, keywords = [], tipo = "website" }) {
	const url = `${SITE.url}${caminho}`;
	return {
		title: titulo,
		description: descricao,
		keywords,
		alternates: { canonical: caminho },
		openGraph: {
			type: tipo,
			locale: "pt_BR",
			url,
			siteName: SITE.nome,
			title: `${titulo} · ${SITE.nome}`,
			description: descricao,
		},
		twitter: {
			card: "summary_large_image",
			title: `${titulo} · ${SITE.nome}`,
			description: descricao,
		},
	};
}

/* ------------------------------------------------------------------------
   Dados estruturados (JSON-LD). São eles que rendem os resultados ricos:
   trilha de navegação, box de busca e reconhecimento de autoria.
   ------------------------------------------------------------------------ */

export const jsonLd = {
	siteESociedade() {
		return {
			"@context": "https://schema.org",
			"@graph": [
				{
					"@type": "WebSite",
					"@id": `${SITE.url}/#site`,
					url: SITE.url,
					name: SITE.nome,
					inLanguage: "pt-BR",
					description:
						"Documentação do ecossistema ESP32 em português brasileiro: especificações, pinagem, comparação e seleção de séries.",
					publisher: { "@id": `${SITE.url}/#autor` },
				},
				{
					"@type": "Person",
					"@id": `${SITE.url}/#autor`,
					name: SITE.autor,
					url: SITE.autorUrl,
					email: SITE.autorEmail,
					sameAs: [SITE.autorLinkedin, SITE.repositorio, SITE.blog],
				},
			],
		};
	},

	/** Trilha de navegação: aparece acima do título no resultado de busca. */
	trilha(itens) {
		return {
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: itens.map((it, i) => ({
				"@type": "ListItem",
				position: i + 1,
				name: it.nome,
				item: `${SITE.url}${it.caminho}`,
			})),
		};
	},

	/** Ficha técnica de uma série, com as especificações como propriedades. */
	serie(chave, serie) {
		const prop = (nome, valor) =>
			valor ? { "@type": "PropertyValue", name: nome, value: String(valor) } : null;

		return {
			"@context": "https://schema.org",
			"@type": "Product",
			"@id": `${SITE.url}/series/${chave}#produto`,
			name: serie.nome_completo || chave,
			description: serie.descricao,
			category: "Microcontrolador",
			brand: { "@type": "Brand", name: "Espressif Systems" },
			url: `${SITE.url}/series/${chave}`,
			additionalProperty: [
				prop("Arquitetura", serie.arquitetura),
				prop("Núcleos", serie.nucleos),
				prop("Frequência máxima", serie.frequencia),
				prop("SRAM", serie.memoria_sram),
				prop("GPIO", serie.gpio),
				prop("Wi-Fi", serie.wifi),
				prop("Bluetooth", serie.bluetooth),
				prop("Encapsulamento", serie.encapsulamento),
				prop("ESP-IDF mínimo", serie.esp_idf_minimo),
			].filter(Boolean),
		};
	},

	/** Glossário: marca cada verbete como termo definido. */
	glossario(categorias) {
		return {
			"@context": "https://schema.org",
			"@type": "DefinedTermSet",
			"@id": `${SITE.url}/glossario#glossario`,
			name: "Glossário Técnico do ESP32",
			inLanguage: "pt-BR",
			hasDefinedTerm: categorias.flatMap((cat) =>
				cat.termos.map((t) => ({
					"@type": "DefinedTerm",
					name: t.termo,
					description: t.definicao,
					inDefinedTermSet: `${SITE.url}/glossario#glossario`,
				}))
			),
		};
	},

	/** Perguntas frequentes: pode render o bloco expansível no Google. */
	perguntas(pares) {
		return {
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: pares.map(({ pergunta, resposta }) => ({
				"@type": "Question",
				name: pergunta,
				acceptedAnswer: { "@type": "Answer", text: resposta },
			})),
		};
	},
};
