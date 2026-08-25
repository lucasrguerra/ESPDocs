import { paginaMeta, jsonLd } from "@/lib/seo";

export const metadata = paginaMeta({
	titulo: "Qual ESP32 escolher",
	descricao: "Responda a perguntas simples sobre conectividade (Wi-Fi 6, 5GHz, Matter), energia, periféricos e segurança ou use o filtro paramétrico para encontrar o ESP32 perfeito.",
	caminho: "/seletor",
	keywords: ["qual ESP32 escolher", "qual ESP32 usar", "escolher microcontrolador", "ESP32 para meu projeto", "comparar ESP32"],
});

const faqs = [
	{
		pergunta: "Qual ESP32 escolher para iniciantes?",
		resposta: "Para quem está começando no mundo Maker e IoT, o ESP32 clássico (NodeMCU/DevKitC) ou o ESP32-C3 são as melhores opções devido à vasta quantidade de bibliotecas, exemplos prontos no Arduino IDE e farta documentação em português.",
	},
	{
		pergunta: "Qual ESP32 tem suporte a Wi-Fi 6, Bluetooth 6 e Thread/Zigbee/Matter?",
		resposta: "O ESP32-C6 e o ESP32-C5 são as melhores séries para redes modernas. O ESP32-C6 oferece Wi-Fi 6 (2.4 GHz) e rádio 802.15.4 (Zigbee 3.0 / Thread / Matter). Já o ESP32-C5 é o primeiro a oferecer suporte a Wi-Fi 6 Dual-Band operando em 2.4 GHz e 5 GHz simultaneamente.",
	},
	{
		pergunta: "Qual o ESP32 mais potente para Inteligência Artificial (TinyML) e Displays?",
		resposta: "O ESP32-P4 (dual-core RISC-V a 400 MHz com extensões vetoriais de IA, interfaces MIPI-CSI/DSI para câmeras/telas e até 64 MB de PSRAM) e o ESP32-S3 (dual-core Xtensa a 240 MHz com aceleradores vetoriais para redes neurais e telas LCD RGB) são os mais velozes para IA na borda e interfaces gráficas ricas.",
	},
	{
		pergunta: "Qual ESP32 consome menos energia para projetos a bateria?",
		resposta: "Microcontroladores com arquitetura RISC-V compacta e coprocessador ULP, como o ESP32-C2, ESP32-C3 e ESP32-H2 (focado em 802.15.4 sem rádio Wi-Fi), oferecem correntes de deep sleep extremamente baixas (na faixa de 5 µA a 10 µA).",
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
							nome: "Seletor Inteligente de ESP32",
							descricao: "Ferramenta interativa que analisa conectividade, consumo, periféricos e segurança para indicar a série ideal de ESP32.",
							caminho: "/seletor",
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
							{ nome: "Seletor de ESP32", caminho: "/seletor" },
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
