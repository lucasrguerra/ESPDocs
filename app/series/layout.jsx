import { paginaMeta, jsonLd } from "@/lib/seo";

export const metadata = paginaMeta({
	titulo: "Séries ESP32",
	descricao: "As 12 séries de ESP32 lado a lado: ESP32, S2, S3, S31, C2, C3, C5, C6, C61, P4, H2 e H4. Arquitetura, memória, rádio, periféricos e pinagem de cada uma, em português.",
	caminho: "/series",
	keywords: ["séries ESP32", "modelos de ESP32", "ESP32 S3", "ESP32 C6", "ESP32 P4", "diferença entre ESP32"],
});

metadata.title = { default: "Séries ESP32", template: "%s · ESPDocs" };

const faqs = [
	{
		pergunta: "Quantas séries de ESP32 existem atualmente?",
		resposta: "Atualmente o ecossistema Espressif conta com 12 séries principais: ESP32 clássico, ESP32-S2, ESP32-S3, ESP32-S31, ESP32-C2, ESP32-C3, ESP32-C5, ESP32-C6, ESP32-C61, ESP32-P4, ESP32-H2 e ESP32-H4.",
	},
	{
		pergunta: "Quais são as séries mais recentes da Espressif?",
		resposta: "As séries mais recentes incluem o ESP32-P4 (focado em alto desempenho com dual-core RISC-V a 400 MHz), o ESP32-C5 (primeiro chip com Wi-Fi dual-band 2.4/5 GHz da Espressif) e o ESP32-C61 (Wi-Fi 6 e Bluetooth 6 de baixo custo).",
	},
];

export default function Layout({ children }) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						jsonLd.trilha([
							{ nome: "Início", caminho: "/" },
							{ nome: "Séries ESP32", caminho: "/series" },
						])
					),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd.perguntas(faqs)),
				}}
			/>
			{children}
		</>
	);
}
