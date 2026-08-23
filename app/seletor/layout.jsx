import { paginaMeta } from "@/lib/seo";

/**
 * A página desta rota é um client component, e client component não pode
 * exportar metadata. Sem este layout, ela herdaria o título genérico do site,
 * e o Google veria várias páginas com o mesmo título e a mesma descrição.
 */
export const metadata = paginaMeta({
	titulo: "Qual ESP32 escolher",
	descricao: "Responda seis perguntas sobre conectividade, energia, periféricos e segurança e receba a série de ESP32 recomendada para o seu projeto, com a justificativa técnica de cada ponto.",
	caminho: "/seletor",
	keywords: ["qual ESP32 escolher", "qual ESP32 usar", "escolher microcontrolador", "ESP32 para meu projeto"],
});

export default function Layout({ children }) {
	return children;
}
