import { paginaMeta, jsonLd } from "@/lib/seo";

export const metadata = paginaMeta({
	titulo: "Frameworks & SDKs para ESP32: Guia Completo e Comparativo",
	descricao: "Guia completo de desenvolvimento: ESP-IDF, ESP-RainMaker, ESP-Matter, Rust, ESP-ADF, ESP-SR, ESP-WHO, Arduino e MicroPython com exemplos de código.",
	caminho: "/frameworks",
	keywords: [
		"ESP-IDF",
		"ESP-RainMaker",
		"ESP-Matter",
		"Rust ESP32",
		"ESP-SR",
		"ESP-ADF",
		"ESP-IoT-Solution",
		"Arduino ESP32",
		"MicroPython ESP32",
		"frameworks ESP32",
		"programar ESP32",
	],
});

export default function FrameworksLayout({ children }) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						jsonLd.trilha([
							{ nome: "Início", caminho: "/" },
							{ nome: "Frameworks", caminho: "/frameworks" },
						])
					),
				}}
			/>
			{children}
		</>
	);
}
