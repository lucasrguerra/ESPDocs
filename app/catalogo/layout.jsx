import { paginaMeta, jsonLd } from "@/lib/seo";

export const metadata = paginaMeta({
	titulo: "Catálogo de placas ESP32",
	descricao: "Placas de desenvolvimento com ESP32 disponíveis no Brasil, com filtro por série, conector e conversor USB-serial.",
	caminho: "/catalogo",
	keywords: ["placas ESP32", "DevKit ESP32", "comprar ESP32", "ESP32 DevKitC"],
});

export default function Layout({ children }) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						jsonLd.aplicacaoWeb({
							nome: "Catálogo de Placas ESP32",
							descricao: "Guia e catálogo interativo de placas de desenvolvimento e DevKits com microcontroladores ESP32.",
							caminho: "/catalogo",
						})
					),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						jsonLd.trilha([
							{ nome: "Início", caminho: "/" },
							{ nome: "Catálogo de Placas", caminho: "/catalogo" },
						])
					),
				}}
			/>
			{children}
		</>
	);
}
