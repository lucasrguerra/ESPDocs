import { paginaMeta, jsonLd } from "@/lib/seo";

export const metadata = paginaMeta({
	titulo: "ESP Component Registry & IDF Component Manager · ESPDocs",
	descricao: "Catálogo oficial e interativo do ESP Component Registry: drivers de displays, LVGL, reconhecimento de voz ESP-SR, RainMaker, BSPs e gerador de idf_component.yml.",
	caminho: "/componentes",
	keywords: [
		"ESP Component Registry",
		"IDF Component Manager",
		"idf_component.yml",
		"idf.py add-dependency",
		"componentes ESP32",
		"espressif esp_lvgl_port",
		"espressif esp_rainmaker",
		"espressif esp-sr",
		"bibliotecas ESP-IDF",
	],
});

const faqs = [
	{
		pergunta: "O que é o ESP Component Registry e o IDF Component Manager?",
		resposta: "O ESP Component Registry (components.espressif.com) é o repositório oficial de pacotes modulares da Espressif. O IDF Component Manager é a ferramenta integrada ao ESP-IDF (a partir do v4.4 e padrão no v5.x+) que baixa, compila e resolve versões de dependências automaticamente a partir do manifesto idf_component.yml.",
	},
	{
		pergunta: "Como adicionar um componente ao meu projeto ESP-IDF?",
		resposta: "Você pode executar o comando 'idf.py add-dependency \"namespace/componente^versao\"' no terminal do projeto (por exemplo: idf.py add-dependency \"espressif/esp_lvgl_port^2.4.0\") ou editar diretamente o arquivo main/idf_component.yml.",
	},
	{
		pergunta: "Qual a diferença entre usar o Component Registry e git submodules?",
		resposta: "O Component Registry elimina a complexidade de gerenciar submódulos Git pesados e versões manuais. Ele oferece versionamento semântico (^ e ~), resolução automática de dependências transitivas e compilação modular sob demanda.",
	},
	{
		pergunta: "Posso criar e publicar meus próprios componentes?",
		resposta: "Sim, qualquer desenvolvedor ou empresa pode publicar componentes públicos ou privados no ESP Component Registry utilizando a ferramenta oficial Compote CLI (pip install idf-component-manager).",
	},
];

export default function ComponentesLayout({ children }) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						jsonLd.trilha([
							{ nome: "Início", caminho: "/" },
							{ nome: "ESP Component Registry", caminho: "/componentes" },
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
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						jsonLd.aplicacaoWeb({
							nome: "Hub do ESP Component Registry & Construtor de Manifesto",
							descricao: "Catálogo curado e gerador de manifesto idf_component.yml para componentes modulares do ESP-IDF.",
							caminho: "/componentes",
						})
					),
				}}
			/>
			{children}
		</>
	);
}
