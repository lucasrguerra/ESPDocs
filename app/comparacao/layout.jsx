import { paginaMeta } from "@/lib/seo";

/**
 * A página desta rota é um client component, e client component não pode
 * exportar metadata. Sem este layout, ela herdaria o título genérico do site,
 * e o Google veria várias páginas com o mesmo título e a mesma descrição.
 */
export const metadata = paginaMeta({
	titulo: "Comparar séries ESP32",
	descricao: "Compare até quatro séries de ESP32 lado a lado: processador, Wi-Fi, Bluetooth, memória, GPIO, periféricos e segurança em hardware, com os dados dos datasheets oficiais.",
	caminho: "/comparacao",
	keywords: ["comparar ESP32", "ESP32 vs ESP32-S3", "tabela comparativa ESP32", "qual ESP32 é melhor"],
});

export default function Layout({ children }) {
	return children;
}
