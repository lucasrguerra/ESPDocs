import { paginaMeta } from "@/lib/seo";

/**
 * A página desta rota é um client component, e client component não pode
 * exportar metadata. Sem este layout, ela herdaria o título genérico do site,
 * e o Google veria várias páginas com o mesmo título e a mesma descrição.
 */
export const metadata = paginaMeta({
	titulo: "Catálogo de placas ESP32",
	descricao: "Placas de desenvolvimento com ESP32 disponíveis no Brasil, com filtro por série, conector e conversor USB-serial.",
	caminho: "/catalogo",
	keywords: ["placas ESP32", "DevKit ESP32", "comprar ESP32", "ESP32 DevKitC"],
});

export default function Layout({ children }) {
	return children;
}
