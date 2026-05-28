import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import frameworksData from "@/public/frameworks.json";
import { 
	Cpu, 
	Target, 
	Zap, 
	Compass, 
	ExternalLink, 
	GraduationCap, 
	ArrowRight,
	Code,
	Layers,
	Sparkles,
	Music,
	Camera,
	Brain,
	Home
} from "lucide-react";

export default function Frameworks() {
	const frameworks = Object.entries(frameworksData);

	return (
		<div className="bg-gradient-to-br from-slate-50 via-white to-purple-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<Header />

			<main id="conteudo" className="px-6 pt-16 pb-24 max-w-7xl mx-auto">
				{/* Top Hero Section */}
				<section className="text-center mb-16 select-none">
					<div className="inline-flex items-center gap-2 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-slate-200/60 dark:border-slate-800/60 shadow-xs">
						<Layers className="w-4 h-4 text-purple-500" />
						<span className="text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider">Ferramentas de Desenvolvimento</span>
					</div>
					
					<h1 className="text-4xl md:text-6xl font-display font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 leading-none tracking-tight">
						Frameworks ESP32
					</h1>
					
					<p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-semibold">
						Descubra o ecossistema de software do ESP32. De desenvolvimento geral C/C++ a 
						soluções dedicadas a áudio de alto desempenho, visão computacional na borda e IoT inteligente.
					</p>
				</section>

				{/* Cards Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{frameworks.map(([key, framework]) => (
						<Link
							key={key}
							href={`/frameworks/${key}`}
							className="group flex"
						>
							<div 
								className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden w-full"
								style={{ borderTop: `4px solid ${framework.cor}` }}
							>
								
								<div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-850/40 flex-1">
									<div className="flex items-center justify-between mb-4">
										<span className="text-5xl select-none filter drop-shadow-md">{framework.icone}</span>
										<div className="flex flex-col gap-1 items-end select-none">
											<span 
												className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
												style={{ 
													backgroundColor: `${framework.cor}18`, 
													color: framework.cor,
													border: `1px solid ${framework.cor}25`
												}}
											>
												{framework.linguagem}
											</span>
										</div>
									</div>
									
									<h2 className="text-xl font-display font-extrabold text-slate-850 dark:text-slate-100 mb-1 group-hover:text-purple-650 dark:group-hover:text-purple-400 transition-colors">
										{framework.nome}
									</h2>
									
									<p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-4 leading-none select-none">
										{framework.nome_completo}
									</p>
									
									<p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed line-clamp-3">
										{framework.descricao}
									</p>
								</div>

								<div className="p-6 py-5 space-y-4 flex-1 flex flex-col justify-between select-none">
									<div className="space-y-4">
										{/* Main Feature */}
										<div>
											<h4 className="text-[9px] font-bold text-slate-400 dark:text-slate-450 mb-1.5 uppercase tracking-widest flex items-center gap-1.5">
												<Target className="w-3.5 h-3.5 text-blue-500" />
												<span>Objetivo Principal</span>
											</h4>
											<p className="text-xs text-slate-650 dark:text-slate-200 font-medium leading-relaxed">
												{framework.funcao_principal}
											</p>
										</div>

										{/* Key Specs */}
										<div>
											<h4 className="text-[9px] font-bold text-slate-400 dark:text-slate-450 mb-2 uppercase tracking-widest flex items-center gap-1.5">
												<Zap className="w-3.5 h-3.5 text-amber-500" />
												<span>Recursos Chave</span>
											</h4>
											<ul className="space-y-1">
												{framework.caracteristicas.slice(0, 3).map((carac, idx) => (
													<li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
														<span className="text-[8px] mt-1 shrink-0" style={{ color: framework.cor }}>■</span>
														<span className="line-clamp-1">{carac}</span>
													</li>
												))}
											</ul>
										</div>

										{/* Use Cases tags */}
										<div>
											<h4 className="text-[9px] font-bold text-slate-400 dark:text-slate-450 mb-2 uppercase tracking-widest flex items-center gap-1.5">
												<Compass className="w-3.5 h-3.5 text-emerald-500" />
												<span>Aplicações Ideais</span>
											</h4>
											<div className="flex flex-wrap gap-1.5">
												{framework.casos_uso.slice(0, 3).map((caso, idx) => (
													<span key={idx} className="text-[9px] font-bold bg-slate-100 dark:bg-slate-900/60 text-slate-650 dark:text-slate-200 px-2.5 py-1 rounded-md border border-slate-200/40 dark:border-slate-800/80">
														{caso}
													</span>
												))}
											</div>
										</div>
									</div>

									{/* CTA Link */}
									<div className="pt-4 border-t border-slate-100 dark:border-slate-850/40 mt-auto flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-purple-650 dark:group-hover:text-purple-400 transition-colors">
										<span>Acessar Detalhes e Exemplos</span>
										<ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>

				{/* Bottom Informative Cards Section */}
				<div className="mt-16 grid md:grid-cols-2 gap-8 select-none">
					{/* Card 1: Beginner Guide */}
					<div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
						<div>
							<div className="flex items-center gap-3.5 mb-5">
								<div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500">
									<GraduationCap className="w-6 h-6" />
								</div>
								<div>
									<h3 className="text-xl font-display font-extrabold text-slate-850 dark:text-slate-100">
										Iniciante no ESP32?
									</h3>
									<p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider leading-none">Guia de Aprendizado</p>
								</div>
							</div>
							
							<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-semibold">
								Se você está iniciando a sua jornada de hardware, recomendamos adotar o ecossistema&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">Arduino</strong> ou&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">MicroPython</strong>&nbsp;
								para testar sensores e APIs. Para projetos profissionais industriais de alta performance e eficiência energética, o framework nativo&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">ESP-IDF</strong> é o padrão exigido no mercado.
							</p>
						</div>

						<div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-850/40 mt-auto">
							<Link href="/frameworks/Arduino" className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-xl text-xs font-bold hover:bg-blue-500/20 transition-all">
								<span>Arduino</span>
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
							<Link href="/frameworks/MicroPython" className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-xl text-xs font-bold hover:bg-purple-500/20 transition-all">
								<span>MicroPython</span>
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
							<Link href="/frameworks/ESP-IDF" className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-red-500/10 text-red-600 dark:text-red-450 border border-red-500/20 rounded-xl text-xs font-bold hover:bg-red-500/20 transition-all">
								<span>ESP-IDF</span>
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</div>
					</div>

					{/* Card 2: Specialized Solutions */}
					<div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
						<div>
							<div className="flex items-center gap-3.5 mb-5">
								<div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-500">
									<Sparkles className="w-6 h-6" />
								</div>
								<div>
									<h3 className="text-xl font-display font-extrabold text-slate-850 dark:text-slate-100">
										Soluções Especializadas
									</h3>
									<p className="text-[10px] font-bold text-purple-500 uppercase tracking-wider leading-none">Domínios Avançados</p>
								</div>
							</div>
							
							<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-semibold">
								Projetos complexos de IoT demandam bibliotecas altamente otimizadas na arquitetura. 
								A Espressif fornece extensões prontas como o&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">ESP-ADF</strong> para processamento de áudio digital,&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">ESP-WHO</strong> para processamento de imagem por câmera,&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">ESP-NN</strong> para redes neurais locais e&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">ESP-Matter</strong> para automação residencial.
							</p>
						</div>

						<div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-850/40 mt-auto">
							<Link href="/frameworks/ESP-ADF" className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-150/45 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-850/60 rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
								<Music className="w-3.5 h-3.5 text-blue-500" />
								<span>Áudio</span>
							</Link>
							<Link href="/frameworks/ESP-WHO" className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-150/45 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-850/60 rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
								<Camera className="w-3.5 h-3.5 text-orange-500" />
								<span>Visão</span>
							</Link>
							<Link href="/frameworks/ESP-NN" className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-150/45 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-850/60 rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
								<Brain className="w-3.5 h-3.5 text-teal-500" />
								<span>Inteligência Artificial</span>
							</Link>
							<Link href="/frameworks/ESP-Matter" className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-150/45 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-850/60 rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
								<Home className="w-3.5 h-3.5 text-yellow-500" />
								<span>Matter</span>
							</Link>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}