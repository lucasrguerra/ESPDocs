import { paginaMeta } from "@/lib/seo";

/**
 * A página desta rota é um client component, e client component não pode
 * exportar metadata. Sem este layout, ela herdaria o título genérico do site,
 * e o Google veria várias páginas com o mesmo título e a mesma descrição.
 */
export const metadata = paginaMeta({
	titulo: "Séries ESP32",
	descricao: "As 12 séries de ESP32 lado a lado: ESP32, S2, S3, S31, C2, C3, C5, C6, C61, P4, H2 e H4. Arquitetura, memória, rádio, periféricos e pinagem de cada uma, em português.",
	caminho: "/series",
	keywords: ["séries ESP32", "modelos de ESP32", "ESP32 S3", "ESP32 C6", "ESP32 P4", "diferença entre ESP32"],
});

// Um layout que define title como string simples substitui o template do root
// para toda a subárvore, e as páginas de série perdiam o sufixo "· ESPDocs".
// Redeclarar o template aqui devolve o comportamento às filhas.
metadata.title = { default: "Séries ESP32", template: "%s · ESPDocs" };

export default function Layout({ children }) {
	return children;
}
