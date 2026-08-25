import { paginaMeta, jsonLd } from "@/lib/seo";

export const metadata = paginaMeta({
	titulo: "Diagnóstico de Erros Comuns no ESP32: Guia Profissional",
	descricao: "Guia técnico definitivo para identificar e resolver Brownout, Guru Meditation, Task Watchdog, Stack Overflow, vazamento de memória e falhas de boot no ESP32 (Arduino e ESP-IDF).",
	caminho: "/diagnostico",
	keywords: [
		"erros comuns ESP32",
		"brownout detector was triggered",
		"guru meditation error",
		"task watchdog got triggered",
		"stack canary watchpoint triggered",
		"como debugar ESP32",
		"ESP32 reiniciando em loop",
		"failed to connect to esp32",
	],
});

const faqs = [
	{
		pergunta: "O que causa o erro 'Brownout detector was triggered' no ESP32?",
		resposta: "Ocorre quando a tensão no pino 3V3 cai abaixo de 2.8V ~ 2.43V devido a picos rápidos de corrente do rádio Wi-Fi/BLE (superando 500mA), cabos USB finos ou regulador LDO inadequado. A solução de engenharia envolve adicionar capacitores Low-ESR de 10µF a 100µF próximos ao VCC e usar LDOs robustos de 600mA+.",
	},
	{
		pergunta: "Como resolver o 'Guru Meditation Error (LoadProhibited)'?",
		resposta: "LoadProhibited indica tentativa de acessar um ponteiro nulo (NULL) ou inválido na memória. A solução consiste em usar o Espressif Exception Decoder ou addr2line para localizar a linha exata no código e implementar validações defensivas como if (ponteiro != NULL).",
	},
	{
		pergunta: "Por que o Task Watchdog Timer (TWDT) dispara no FreeRTOS?",
		resposta: "O TWDT dispara quando uma tarefa de prioridade maior monopoliza a CPU em um loop bloqueante (ex: while(1) sem vTaskDelay), impedindo a tarefa IDLE de alimentar o watchdog do sistema operacional.",
	},
	{
		pergunta: "Por que conexões HTTPS e TLS falham com código -0x2700 no ESP32?",
		resposta: "Porque ao ligar, o ESP32 inicia o relógio interno no ano de 1970. O validador de certificados TLS considera o certificado do servidor inválido por estar no 'futuro'. Sincronizar o relógio via SNTP (configTime) antes da conexão resolve o problema.",
	},
];

export default function DiagnosticoLayout({ children }) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						jsonLd.trilha([
							{ nome: "Início", caminho: "/" },
							{ nome: "Diagnóstico & Erros Comuns", caminho: "/diagnostico" },
						])
					),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						jsonLd.perguntas(faqs)
					),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						jsonLd.aplicacaoWeb({
							nome: "Guia de Diagnóstico e Erros no ESP32",
							descricao: "Ferramenta e guia técnico de análise de falhas, pânicos de CPU e decodificação de logs no ESP32.",
							caminho: "/diagnostico",
						})
					),
				}}
			/>
			{children}
		</>
	);
}
