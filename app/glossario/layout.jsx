import { paginaMeta, jsonLd } from "@/lib/seo";
import { categoriasGlossario } from "@/lib/glossarioData";

export const metadata = paginaMeta({
	titulo: "Glossário Técnico do ESP32: Termos e Conceitos",
	descricao: "Mais de 50 termos e conceitos essenciais do ecossistema ESP32 explicados em português: GPIO, Strapping Pins, ULP, PSRAM, FreeRTOS, eFuse, Deep Sleep, OTA, Secure Boot, ECDSA, Matter e Thread.",
	caminho: "/glossario",
	keywords: [
		"glossário ESP32",
		"o que é GPIO",
		"o que é strapping pins",
		"o que é ULP ESP32",
		"o que é PSRAM ESP32",
		"termos técnicos microcontrolador",
		"conceitos ESP32 português",
	],
});

export default function GlossarioLayout({ children }) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd.glossario(categoriasGlossario)),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						jsonLd.trilha([
							{ nome: "Início", caminho: "/" },
							{ nome: "Glossário Técnico", caminho: "/glossario" },
						])
					),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						jsonLd.aplicacaoWeb({
							nome: "Glossário Técnico do ESP32",
							descricao: "Enciclopédia de termos técnicos e conceitos de hardware e software do ecossistema ESP32.",
							caminho: "/glossario",
						})
					),
				}}
			/>
			{children}
		</>
	);
}
