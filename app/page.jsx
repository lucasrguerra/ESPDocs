import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { 
	SlidersHorizontal, 
	ShoppingBag, 
	Table2, 
	Cpu, 
	Layers, 
	Scale, 
	FileText, 
	Code, 
	RefreshCw, 
	Globe,
	ArrowRight,
	Terminal,
	Compass,
	Info
} from "lucide-react";

export default function Home() {
	const resources = [
		{
			name: "Seletor Inteligente", 
			description: "Responda perguntas rápidas sobre seu projeto e descubra a série ESP32 ideal em segundos.", 
			icon: <SlidersHorizontal className="w-6 h-6" />,
			colorClass: "text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400"
		},
		{
			name: "Catálogo de Placas", 
			description: "Encontre placas de desenvolvimento ESP32 verificadas com filtros avançados e links seguros.", 
			icon: <ShoppingBag className="w-6 h-6" />,
			colorClass: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400"
		},
		{
			name: "Especificações Organizadas", 
			description: "Especificações técnicas completas de cada microcontrolador organizadas para fácil leitura.", 
			icon: <Table2 className="w-6 h-6" />,
			colorClass: "text-pink-600 bg-pink-50 dark:bg-pink-950/40 dark:text-pink-400"
		},
		{
			name: "Diagramas de Conexões", 
			description: "Visualize diagramas de pinos interativos e mapeamentos de periféricos de forma dinâmica.", 
			icon: <Cpu className="w-6 h-6" />,
			colorClass: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400"
		},
		{
			name: "Suporte a Frameworks", 
			description: "Encontre casos de uso, documentações e snippets para ESP-IDF, Arduino e MicroPython.", 
			icon: <Layers className="w-6 h-6" />,
			colorClass: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400"
		},
		{
			name: "Comparação de Modelos", 
			description: "Compare lado a lado as especificações de múltiplos chips em uma visualização única.", 
			icon: <Scale className="w-6 h-6" />,
			colorClass: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 dark:text-cyan-400"
		},
		{
			name: "Links para Documentação", 
			description: "Acesso direto aos datasheets oficiais, manuais de referência e guias da Espressif.", 
			icon: <FileText className="w-6 h-6" />,
			colorClass: "text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400"
		},
		{
			name: "Exemplos de Código", 
			description: "Gabaritos e snippets funcionais de código para iniciar seus projetos rapidamente.", 
			icon: <Code className="w-6 h-6" />,
			colorClass: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400"
		},
		{
			name: "Informações Atualizadas", 
			description: "Dados sempre revisados e sincronizados com os lançamentos mais recentes de silício.", 
			icon: <RefreshCw className="w-6 h-6" />,
			colorClass: "text-teal-600 bg-teal-50 dark:bg-teal-950/40 dark:text-teal-400"
		},
		{
			name: "Interface em Português", 
			description: "Navegação, termos técnicos e explicações adaptadas ao nosso idioma nativo.", 
			icon: <Globe className="w-6 h-6" />,
			colorClass: "text-sky-600 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-400"
		},
	];

	return (
		<div className="bg-gradient-to-br from-slate-100 via-slate-50 to-purple-100/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<Header />

			<main className="px-6 pt-16 pb-24 max-w-7xl mx-auto">
				{/* Hero Section */}
				<section className="text-center mb-24 max-w-5xl mx-auto">
					<h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 tracking-tight leading-tight select-none">
						ESPDocs
					</h1>
					
					<h2 className="text-xl md:text-3xl text-slate-800 dark:text-slate-200 font-bold mb-6 max-w-3xl mx-auto leading-snug">
						Organização e acesso facilitado ao ecossistema ESP32
					</h2>
					
					<p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
						Plataforma independente criada para desenvolvedores que buscam comparar especificações, consultar pinouts, selecionar chips ideais e acessar referências em português de forma rápida e intuitiva.
					</p>

					{/* Botões de Ação */}
					<div className="flex flex-wrap gap-4 justify-center items-center">
						<Link
							className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer active:scale-95"
							href="/seletor"
						>
							<Compass className="w-4 h-4" />
							<span>Encontrar ESP32 Ideal</span>
							<ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
						</Link>

						<Link
							className="group inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer active:scale-95"
							href="/series"
						>
							<Cpu className="w-4 h-4" />
							<span>Explorar Séries</span>
						</Link>

						<Link
							className="group inline-flex items-center gap-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-7 py-3.5 rounded-xl font-bold text-sm shadow-xs border border-slate-300 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer active:scale-95"
							href="/frameworks"
						>
							<Terminal className="w-4 h-4" />
							<span>Frameworks</span>
						</Link>

						<Link
							className="group inline-flex items-center gap-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-7 py-3.5 rounded-xl font-bold text-sm shadow-xs border border-slate-300 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer active:scale-95"
							href="/catalogo"
						>
							<ShoppingBag className="w-4 h-4" />
							<span>Placas</span>
						</Link>
					</div>
				</section>

				{/* Recursos Section */}
				<section className="mb-24">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-800 dark:text-slate-100 mb-4">
							Recursos da Plataforma
						</h2>
						<p className="text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
							Conjunto completo de utilitários projetados para maximizar a produtividade e eliminar atritos no desenvolvimento de firmware.
						</p>
					</div>
					
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{resources.map((resource) => (
							<div 
								key={resource.name} 
								className="group bg-white dark:bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl border border-slate-300 dark:border-slate-800/80 hover:border-purple-500/40 dark:hover:border-purple-400/40 shadow-xs hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 transition-all duration-300"
							>
								<div className="flex items-start gap-4">
									<div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transform group-hover:scale-105 transition-transform duration-300 shadow-xs ${resource.colorClass}`}>
										{resource.icon}
									</div>
									<div className="flex-1">
										<h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
											{resource.name}
										</h3>
										<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
											{resource.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Ciência Embarcada Section */}
				<section className="mb-8">
					<div className="bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-900/40 dark:to-purple-950/10 rounded-3xl shadow-xs border border-slate-300 dark:border-slate-800/80 p-8 md:p-12 relative overflow-hidden">
						{/* Background soft glow decoration */}
						<div className="absolute right-0 bottom-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

						<div className="flex flex-col items-center text-center relative z-10 max-w-3xl mx-auto">
							<a 
								href="https://cienciaembarcada.com.br" 
								target="_blank" 
								rel="noopener noreferrer"
								className="group mb-6"
							>
								<Image 
									src="/logo.png" 
									alt="Ciência Embarcada Logo" 
									width={80}
									height={80}
									className="h-16 w-16 md:h-20 md:w-20 mb-2 transition-transform duration-300 group-hover:scale-105 object-contain"
								/>
							</a>
							
							<p className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
								Conteúdo e Curadoria por{' '}
								<a 
									href="https://cienciaembarcada.com.br" 
									target="_blank" 
									rel="noopener noreferrer"
									className="text-purple-600 dark:text-purple-400 hover:underline transition-colors font-extrabold"
								>
									Ciência Embarcada
								</a>
							</p>
							
							<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-xl">
								Acesse artigos profundos sobre programação de microcontroladores, design de hardware, Internet das Coisas (IoT), laboratórios práticos e projetos reais em nosso blog parceiro oficial.
							</p>

							<a
								href="https://cienciaembarcada.com.br"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-purple-500/10 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer active:scale-95"
							>
								<span>Visitar Blog Ciência Embarcada</span>
								<ExternalLinkIcon />
							</a>
						</div>

						{/* Disclaimer */}
						<div className="border-t border-slate-300 dark:border-slate-800/80 pt-8 mt-10">
							<div className="bg-slate-100/60 dark:bg-slate-900/60 border-l-4 border-purple-500 p-5 rounded-r-2xl">
								<div className="flex gap-4">
									<Info className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
									<p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
										<strong className="font-bold text-slate-700 dark:text-slate-200">Plataforma independente e não oficial:</strong> O ESPDocs é um projeto educativo que compila, filtra e expõe dados públicos e links de documentações oficiais fornecidas pela fabricante Espressif Systems. Para projetos industriais ou decisões de engenharia críticas, sempre consulte a documentação técnica nativa do fabricante.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section> 
			</main>

			<Footer />
		</div>
	);
}

/* Local mini-icon component for external link */
function ExternalLinkIcon() {
	return (
		<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
		</svg>
	);
}