import { paginaMeta } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
	Languages, 
	GitCompare, 
	Globe, 
	Code, 
	Target, 
	HelpCircle, 
	Users, 
	Accessibility,
	ArrowLeft,
	Award,
	BookOpen,
	Compass,
	Terminal,
	Layers
} from "lucide-react";


export const metadata = paginaMeta({
	titulo: "Sobre o projeto",
	descricao: "O ESPDocs é uma plataforma independente que reúne a documentação do ecossistema ESP32 em português brasileiro. Saiba como o projeto nasceu e como contribuir.",
	caminho: "/sobre",
	keywords: ["ESPDocs", "documentação ESP32 português", "projeto open source ESP32"],
});

export default function Sobre() {
	const features = [
		{ icon: <Languages className="w-6 h-6 text-purple-500" />, title: "Interface em Português", desc: "Organização e apresentação de dados técnicos totalmente em português." },
		{ icon: <GitCompare className="w-6 h-6 text-blue-500" />, title: "Comparações Visuais", desc: "Tabelas comparativas e diagramas para facilitar a escolha da série ideal." },
		{ icon: <Globe className="w-6 h-6 text-emerald-500" />, title: "Acesso Centralizado", desc: "Links diretos para documentação oficial, repositórios e exemplos." },
		{ icon: <Code className="w-6 h-6 text-amber-500" />, title: "Código Aberto", desc: "Projeto open-source com contribuições bem-vindas no GitHub." },
	];

	return (
		<div className="bg-gradient-to-br from-slate-100 via-slate-50 to-purple-100/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow focus:ring-2 focus:ring-purple-500">
				Ir para o conteúdo
			</a>

			<Header />

			<main id="conteudo" className="px-6 pt-16 pb-24 max-w-7xl mx-auto">
				{/* Top Hero Heading Block */}
				<header className="relative overflow-hidden rounded-3xl p-10 md:p-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl mb-12 select-none">
					<div className="absolute inset-0 bg-black/10"></div>
					<div className="relative z-10 max-w-4xl mx-auto">
						<h1 className="text-4xl md:text-6xl font-display font-extrabold leading-tight mb-6">
							Sobre o ESPDocs
						</h1>

						<p className="text-sm md:text-base opacity-95 max-w-3xl mb-8 leading-relaxed font-semibold">
							Uma plataforma não oficial com interface em português que organiza
							informações técnicas do ESP32 e facilita o acesso à documentação oficial
							da Espressif. Desenvolvida para a comunidade de hardware livre.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
							<Link href="/" className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl active:scale-98 transition-all" aria-label="Voltar para a página inicial">
								<ArrowLeft className="w-5 h-5" />
								<span>Início</span>
							</Link>

							<a
								href="https://github.com/lucasrguerra/ESPDocs"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xs border border-white/30 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 active:scale-98 transition-all"
								aria-label="Abrir repositório do projeto no GitHub (abre em nova aba)"
							>
								<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.7 1.9-1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.4.9 1.1.9 2.2v3.2c0 .3.2.7.8.6A12 12 0 0012 .5z" />
								</svg>
								<span>GitHub</span>
							</a>
						</div>
					</div>
				</header>

				{/* Two columns details grid */}
				<div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
					<section className="lg:col-span-2 space-y-8">
						{/* Missao article */}
						<article className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-300 dark:border-slate-800/80 hover:border-purple-500/20 dark:hover:border-purple-400/20 transition-all">
							<div className="flex items-center gap-3.5 mb-5 select-none">
								<div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-500">
									<Target className="w-6 h-6" />
								</div>
								<h2 className="text-2xl font-display font-extrabold text-slate-850 dark:text-slate-100">Missão</h2>
							</div>
							<p className="text-slate-650 dark:text-slate-350 leading-relaxed font-semibold text-sm">
								Facilitar o acesso e a compreensão do ecossistema ESP32 através de uma
								interface em português que organiza especificações técnicas, compara séries,
								apresenta frameworks e centraliza links para a documentação oficial da
								Espressif. O objetivo principal é otimizar o tempo no desenvolvimento de firmware e IoT.
							</p>
						</article>

						{/* Por que o ESPDocs article */}
						<article className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-300 dark:border-slate-800/80">
							<div className="flex items-center gap-3.5 mb-5 select-none">
								<div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500">
									<HelpCircle className="w-6 h-6" />
								</div>
								<h2 className="text-2xl font-display font-extrabold text-slate-850 dark:text-slate-100">Por que o ESPDocs?</h2>
							</div>
							<p className="text-slate-650 dark:text-slate-350 leading-relaxed mb-6 font-semibold text-sm">
								As informações sobre os microcontroladores ESP32 muitas vezes estão dispersas em datasheets densos, 
								manuais de referência (TRM), repositórios secundários e documentação técnica, tudo inteiramente em inglês. 
								O ESPDocs condensa e estrutura esses dados, auxiliando na triagem rápida antes de aprofundar na engenharia oficial.
							</p>

							<div className="grid sm:grid-cols-2 gap-4">
								{features.map((f) => (
									<div key={f.title} className="flex gap-4 items-start bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-150/40 dark:border-slate-850/40 hover:border-purple-500/10 dark:hover:border-purple-400/10 transition-colors">
										<div className="shrink-0 p-1 bg-white dark:bg-slate-900 rounded-xl shadow-xs" aria-hidden="true">
											{f.icon}
										</div>
										<div className="flex-1">
											<h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1 text-sm">{f.title}</h3>
											<p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-semibold">{f.desc}</p>
										</div>
									</div>
								))}
							</div>
						</article>

						{/* Contribuir article */}
						<article className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-300 dark:border-slate-800/80">
							<div className="flex items-center gap-3.5 mb-5 select-none">
								<div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500">
									<Users className="w-6 h-6" />
								</div>
								<h2 className="text-2xl font-display font-extrabold text-slate-850 dark:text-slate-100">Como Contribuir</h2>
							</div>
							
							<p className="text-slate-650 dark:text-slate-350 leading-relaxed mb-6 font-semibold text-sm">
								Correções de tradução, refinamento de tabelas e novos trechos funcionais de exemplos são muito bem-vindos! 
								A plataforma cresce por meio da comunidade.
							</p>

							<div className="bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl p-5 border border-slate-150/40 dark:border-slate-850/40">
								<ol className="list-decimal list-inside text-slate-700 dark:text-slate-300 space-y-2 text-xs font-semibold">
									<li>Faça o fork do repositório no GitHub.</li>
									<li>Implemente melhorias e revise referências técnicas oficiais.</li>
									<li>Abra o seu Pull Request (PR) detalhando os ajustes efetuados.</li>
								</ol>
							</div>
						</article>

						{/* Accessibility note */}
						<article className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 rounded-3xl p-8 shadow-lg border border-purple-500/20 dark:border-pink-500/20">
							<div className="flex items-center gap-3.5 mb-5 select-none">
								<div className="w-12 h-12 bg-pink-500/10 border border-pink-500/20 rounded-2xl flex items-center justify-center text-pink-500">
									<Accessibility className="w-6 h-6" />
								</div>
								<h2 className="text-2xl font-display font-extrabold text-slate-850 dark:text-slate-100">Acessibilidade</h2>
							</div>
							<p className="text-slate-650 dark:text-slate-350 leading-relaxed font-semibold text-sm">
								O ESPDocs preza pela legibilidade, alto contraste cromático e compatibilidade de navegação por teclado. 
								Caso encontre alguma barreira técnica de leitura ou navegação, sinta-se encorajado a relatar via Issue.
							</p>
						</article>
					</section>

					{/* Sidebar area */}
					<aside className="space-y-6">
						{/* Author Card */}
						<div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-300 dark:border-slate-800/80 rounded-3xl p-8 shadow-xl">
							<div className="flex flex-col items-center mb-6 select-none">
								<div className="w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center mb-4 border border-purple-500/20 shadow-inner">
									<img 
										src="/logo.png" 
										alt="Ciência Embarcada Logo" 
										className="h-16 w-16 object-contain"
									/>
								</div>
								<h3 className="text-lg font-display font-extrabold text-slate-850 dark:text-slate-100 text-center">Sobre o Autor</h3>
							</div>

							<div className="space-y-4 text-xs font-semibold text-slate-650 dark:text-slate-350 text-justify leading-relaxed">
								<p>
									<strong>Lucas Rayan Guerra</strong>, criador da iniciativa <a 
										href="https://cienciaembarcada.com.br" 
										target="_blank" 
										rel="noopener noreferrer"
										className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-bold"
									>
										Ciência Embarcada
									</a>, é Técnico em Desenvolvimento de Sistemas, estudante de Ciência da Computação na UFRPE e estuda Blockchain e Criptografia.
								</p>

								<p>
									Diretor de Software na Semine AgriTech e palestrante em feiras e conferências (como o REC'n'Play), compartilha ativamente material sobre hardware, internet das coisas e cibersegurança.
								</p>
							</div>

							<div className="bg-purple-500/5 dark:bg-purple-400/5 border border-purple-500/10 dark:border-purple-400/10 rounded-2xl p-4 my-5 text-justify">
								<p className="text-[10px] text-slate-650 dark:text-slate-400 italic font-semibold leading-relaxed">
									"O Ciência Embarcada nasceu para criar um espaço de curadoria técnica livre, promovendo a popularização científica e do hardware embarcado."
								</p>
							</div>

							<a
								href="https://cienciaembarcada.com.br"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-98 transition-all"
							>
								<span>Visitar Ciência Embarcada</span>
							</a>
						</div>

						{/* Repository / Contributions card */}
						<div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-300 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl">
							<div className="flex items-center justify-between mb-4 select-none">
								<h3 className="text-sm font-display font-extrabold text-slate-800 dark:text-slate-200">Contribua</h3>
								<span className="text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-emerald-500/20">Open Source</span>
							</div>

							<p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed mb-4 font-semibold">
								Ajude a expandir a cobertura do ESPDocs submetendo exemplos de códigos ou aprimoramentos técnicos.
							</p>

							<a
								href="https://github.com/lucasrguerra/ESPDocs"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-90 active:scale-98 transition-all"
								aria-label="Abrir repositório no GitHub"
							>
								<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.7 1.9-1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.4.9 1.1.9 2.2v3.2c0 .3.2.7.8.6A12 12 0 0012 .5z" />
								</svg>
								<span>Ver Repositório</span>
							</a>

							<div className="mt-4 text-[10px] text-slate-500 dark:text-slate-450 leading-relaxed font-semibold border-t border-slate-200 dark:border-slate-850/45 pt-4">
								<strong>Aviso Legal:</strong> O ESPDocs é um agregador e organizador. Manuais técnicos detalhados e repositórios oficiais referenciados são de propriedade exclusiva da Espressif Systems. Para projetos críticos comerciais, consulte sempre a documentação nativa oficial.
							</div>
						</div>

						{/* Summary sidebar card */}
						<div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-300 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl select-none">
							<h4 className="text-xs font-display font-extrabold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider">Conteúdo Técnico</h4>
							<ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2.5 font-bold">
								<li className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
									<span>Focado em clareza técnica</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
									<span>Exemplos práticos de códigos</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
									<span>Links oficiais mapeados</span>
								</li>
							</ul>
						</div>
					</aside>
				</div>
			</main>

			<Footer />
		</div>
	);
}