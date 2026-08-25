import { paginaMeta, jsonLd } from "@/lib/seo";

export const metadata = paginaMeta({
	titulo: "Comparar séries ESP32",
	descricao: "Compare até quatro séries de ESP32 lado a lado: processador, Wi-Fi, Bluetooth, memória, GPIO, periféricos e segurança em hardware, com os dados dos datasheets oficiais.",
	caminho: "/comparacao",
	keywords: ["comparar ESP32", "ESP32 vs ESP32-S3", "tabela comparativa ESP32", "qual ESP32 é melhor"],
});

const faqs = [
	{
		pergunta: "Como comparar microcontroladores ESP32 lado a lado?",
		resposta: "O comparador do ESPDocs permite selecionar até quatro séries simultaneamente para confrontar arquitetura, frequência de clock, memória SRAM/PSRAM, padrões de rádio (Wi-Fi 4/6, Bluetooth 5/6, 802.15.4), interfaces de periféricos e blocos de segurança em hardware.",
	},
	{
		pergunta: "Qual a diferença entre o ESP32 clássico e o ESP32-S3?",
		resposta: "O ESP32 clássico usa núcleos Xtensa LX6 e Bluetooth clássico/LE. O ESP32-S3 traz núcleos Xtensa LX7 com instruções vetoriais para inteligência artificial (TinyML), USB nativo OTG, mais GPIOs (45 contra 36) e Bluetooth 5.0 LE.",
	},
	{
		pergunta: "Qual a diferença entre ESP32-C3 e ESP32-C6?",
		resposta: "O ESP32-C3 é um microcontrolador RISC-V com Wi-Fi 4 e Bluetooth 5 LE. O ESP32-C6 evolui para Wi-Fi 6 (802.11ax), Bluetooth 5.4 LE, rádio IEEE 802.15.4 para Zigbee 3.0 e Thread 1.3, além de coprocessador de ultrabaixo consumo.",
	},
];

export default function Layout({ children }) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						jsonLd.aplicacaoWeb({
							nome: "Comparador de Séries ESP32",
							descricao: "Tabela comparativa técnica para analisar especificações, pinagens e recursos de múltiplas séries de ESP32.",
							caminho: "/comparacao",
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
							{ nome: "Comparar Séries", caminho: "/comparacao" },
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
