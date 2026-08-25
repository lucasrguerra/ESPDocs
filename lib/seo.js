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

	/** Documentação e ficha técnica da série como TechArticle para o Google. */
	serie(chave, serie) {
		const prop = (nome, valor) =>
			valor ? { "@type": "PropertyValue", name: nome, value: String(valor) } : null;

		const propriedades = [
			prop("Fabricante", "Espressif Systems"),
			prop("Arquitetura", serie.arquitetura),
			prop("Núcleos", serie.nucleos),
			prop("Frequência máxima", serie.frequencia),
			prop("SRAM", serie.memoria_sram),
			prop("RTC SRAM", serie.memoria_sram_rtc),
			prop("Flash suportada", serie.flash_suportada),
			prop("PSRAM suportada", serie.psram_suportada),
			prop("GPIO", serie.gpio),
			prop("Wi-Fi", serie.wifi),
			prop("Bluetooth", serie.bluetooth),
			prop("Zigbee / Thread / 802.15.4", serie.zigbee_thread),
			prop("Encapsulamento", serie.encapsulamento),
			prop("ESP-IDF mínimo", serie.esp_idf_minimo),
		].filter(Boolean);

		return {
			"@context": "https://schema.org",
			"@type": "TechArticle",
			"@id": `${SITE.url}/series/${chave}#artigo`,
			headline: `${serie.nome_completo || chave}: especificações e pinagem`,
			name: `${serie.nome_completo || chave} - Documentação Técnica e Especificações`,
			description: serie.descricao,
			inLanguage: "pt-BR",
			mainEntityOfPage: `${SITE.url}/series/${chave}`,
			url: `${SITE.url}/series/${chave}`,
			author: {
				"@type": "Person",
				name: SITE.autor,
				url: SITE.autorUrl,
			},
			publisher: {
				"@type": "Organization",
				name: "Ciência Embarcada",
				url: SITE.blog,
				logo: {
					"@type": "ImageObject",
					url: `${SITE.url}/marca/espdocs-marca.svg`,
				},
			},
			about: {
				"@type": "Thing",
				name: serie.nome_completo || chave,
				description: serie.descricao,
				additionalProperty: propriedades,
			},
		};
	},

	/** Documentação técnica de framework. */
	framework(chave, framework) {
		return {
			"@context": "https://schema.org",
			"@type": "TechArticle",
			"@id": `${SITE.url}/frameworks/${encodeURIComponent(chave)}#artigo`,
			headline: `${framework.nome} para ESP32: Guia e Documentação`,
			name: `${framework.nome_completo || framework.nome} para ESP32`,
			description: framework.descricao,
			inLanguage: "pt-BR",
			mainEntityOfPage: `${SITE.url}/frameworks/${encodeURIComponent(chave)}`,
			url: `${SITE.url}/frameworks/${encodeURIComponent(chave)}`,
			author: {
				"@type": "Person",
				name: SITE.autor,
				url: SITE.autorUrl,
			},
			publisher: {
				"@type": "Organization",
				name: "Ciência Embarcada",
				url: SITE.blog,
				logo: {
					"@type": "ImageObject",
					url: `${SITE.url}/marca/espdocs-marca.svg`,
				},
			},
			about: {
				"@type": "SoftwareApplication",
				name: framework.nome_completo || framework.nome,
				applicationCategory: "DeveloperApplication",
				operatingSystem: "Embedded",
				description: framework.descricao,
				url: framework.documentacao || `${SITE.url}/frameworks/${encodeURIComponent(chave)}`,
			},
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

	/** Aplicação web / ferramenta interativa (Seletor, Comparador, Catálogo). */
	aplicacaoWeb({ nome, descricao, caminho }) {
		return {
			"@context": "https://schema.org",
			"@type": "WebApplication",
			"@id": `${SITE.url}${caminho}#app`,
			name: nome,
			description: descricao,
			url: `${SITE.url}${caminho}`,
			applicationCategory: "DeveloperApplication",
			operatingSystem: "All",
			browserRequirements: "Requires JavaScript",
			inLanguage: "pt-BR",
			author: {
				"@type": "Person",
				name: SITE.autor,
				url: SITE.autorUrl,
			},
			publisher: {
				"@type": "Organization",
				name: "Ciência Embarcada",
				url: SITE.blog,
				logo: {
					"@type": "ImageObject",
					url: `${SITE.url}/marca/espdocs-marca.svg`,
				},
			},
			offers: {
				"@type": "Offer",
				price: "0",
				priceCurrency: "BRL",
			},
		};
	},

	/** Página Sobre com metadados E-E-A-T de autoria e reputação. */
	paginaSobre() {
		return {
			"@context": "https://schema.org",
			"@type": "AboutPage",
			"@id": `${SITE.url}/sobre#sobre`,
			name: "Sobre o ESPDocs",
			description: "O ESPDocs é uma plataforma independente que reúne a documentação do ecossistema ESP32 em português brasileiro.",
			url: `${SITE.url}/sobre`,
			inLanguage: "pt-BR",
			mainEntity: {
				"@type": "Person",
				name: SITE.autor,
				url: SITE.autorUrl,
				email: SITE.autorEmail,
				sameAs: [
					SITE.autorLinkedin,
					SITE.repositorio,
					SITE.blog,
				],
			},
		};
	},
};
