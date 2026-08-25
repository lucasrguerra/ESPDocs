import { paginaMeta } from "@/lib/seo";
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
	Home,
	Box,
	Cloud,
	Radio,
	ShieldCheck,
	Mic
} from "lucide-react";

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
		"programar ESP32"
	],
});

export default function Frameworks() {
	const frameworks = Object.entries(frameworksData);

	return (
		<div className="bg-gradient-to-br from-slate-100 via-slate-50 to-purple-100/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<Header />

			<main id="conteudo" className="px-4 md:px-6 pt-12 md:pt-16 pb-24 max-w-7xl mx-auto space-y-12">
				{/* Top Hero Section */}
				<section className="text-center select-none">
					<div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-slate-300 dark:border-slate-800/80 shadow-xs">
						<Layers className="w-4 h-4 text-purple-500" />
						<span className="text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider">
							Ecossistema de Desenvolvimento
						</span>
						<span className="bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
							14 SDKs
						</span>
					</div>
					
					<h1 className="text-4xl md:text-6xl font-display font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 pb-2 pt-1 leading-tight md:leading-[1.18] tracking-tight">
						Frameworks & SDKs ESP32
					</h1>
					
					<p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-semibold">
						Descubra o ecossistema completo de software do ESP32. Do desenvolvimento nativo C/C++ 
						com FreeRTOS ao ecossistema moderno em Rust, passando por nuvem IoT, reconhecimento de voz local,
						áudio de alta fidelidade e o padrão universal Matter.
					</p>
				</section>

				{/* Highlight Callout: ESP Component Registry */}
				<section className="bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-slate-900/90 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-purple-500/30 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
					<div className="absolute -right-12 -top-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
					
					<div className="space-y-2 max-w-3xl relative z-10">
						<div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-400/30">
							<Box className="w-3.5 h-3.5 text-purple-300" />
							<span>Arquitetura Modular</span>
						</div>
						<h2 className="text-2xl md:text-3xl font-display font-extrabold text-white">
							ESP Component Registry & IDF Component Manager
						</h2>
						<p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
							Desenvolva de forma modular: instale drivers de displays (LVGL), pilhas industriais (Modbus),
							recursos de nuvem (RainMaker) e pacotes de suporte a placas (BSPs) com uma única linha no seu manifesto <code>idf_component.yml</code>.
						</p>
					</div>

					<div className="relative z-10 shrink-0 w-full lg:w-auto">
						<Link
							href="/componentes"
							className="inline-flex items-center justify-center gap-2 w-full lg:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl shadow-lg transition-all active:scale-95"
						>
							<Sparkles className="w-4 h-4" />
							<span>Explorar Component Registry</span>
							<ArrowRight className="w-4 h-4" />
						</Link>
					</div>
				</section>

				{/* Cards Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{frameworks.map(([key, framework]) => (
						<Link
							key={key}
							href={`/frameworks/${encodeURIComponent(key)}`}
							className="group flex"
						>
							<div 
								className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-300 dark:border-slate-800/80 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden w-full"
								style={{ borderTop: `4px solid ${framework.cor}` }}
							>
								
								<div className="p-6 pb-4 border-b border-slate-200 dark:border-slate-850/40 flex-1">
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
											<span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">
												{framework.tipo}
											</span>
										</div>
									</div>
									
									<h2 className="text-xl font-display font-extrabold text-slate-850 dark:text-slate-100 mb-1 group-hover:text-purple-650 dark:group-hover:text-purple-400 transition-colors">
										{framework.nome}
									</h2>
									
									<p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-4 leading-none select-none">
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
											<h4 className="text-[9px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-widest flex items-center gap-1.5">
												<Target className="w-3.5 h-3.5 text-blue-500" />
												<span>Objetivo Principal</span>
											</h4>
											<p className="text-xs text-slate-650 dark:text-slate-200 font-medium leading-relaxed line-clamp-2">
												{framework.funcao_principal}
											</p>
										</div>

										{/* Key Specs */}
										<div>
											<h4 className="text-[9px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-1.5">
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
											<h4 className="text-[9px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-1.5">
												<Compass className="w-3.5 h-3.5 text-emerald-500" />
												<span>Aplicações Ideais</span>
											</h4>
											<div className="flex flex-wrap gap-1.5">
												{framework.casos_uso.slice(0, 3).map((caso, idx) => (
													<span key={idx} className="text-[9px] font-bold bg-slate-100 dark:bg-slate-900/60 text-slate-650 dark:text-slate-200 px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-800/80">
														{caso}
													</span>
												))}
											</div>
										</div>
									</div>

									{/* CTA Link */}
									<div className="pt-4 border-t border-slate-200 dark:border-slate-850/40 mt-auto flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-purple-650 dark:group-hover:text-purple-400 transition-colors">
										<span>Acessar Detalhes e Exemplos</span>
										<ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>

				{/* Bottom Informative Cards Section */}
				<div className="grid md:grid-cols-3 gap-6 select-none">
					{/* Card 1: Beginner Guide */}
					<div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-slate-300 dark:border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
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
								Se você está iniciando a sua jornada, o&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">Arduino Core</strong> ou&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">MicroPython</strong>&nbsp;
								são ideais para testar sensores e APIs. Para produtos comerciais, adote o&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">ESP-IDF</strong> ou&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">Rust on ESP32</strong>.
							</p>
						</div>

						<div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-850/40 mt-auto">
							<Link href="/frameworks/Arduino" className="inline-flex items-center gap-1 px-3 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-xl text-xs font-bold hover:bg-blue-500/20 transition-all">
								<span>Arduino</span>
							</Link>
							<Link href="/frameworks/MicroPython" className="inline-flex items-center gap-1 px-3 py-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-xl text-xs font-bold hover:bg-purple-500/20 transition-all">
								<span>MicroPython</span>
							</Link>
							<Link href="/frameworks/Rust-ESP" className="inline-flex items-center gap-1 px-3 py-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-xl text-xs font-bold hover:bg-amber-500/20 transition-all">
								<span>Rust</span>
							</Link>
						</div>
					</div>

					{/* Card 2: Cloud & Smart Home */}
					<div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-slate-300 dark:border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
						<div>
							<div className="flex items-center gap-3.5 mb-5">
								<div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-500">
									<Cloud className="w-6 h-6" />
								</div>
								<div>
									<h3 className="text-xl font-display font-extrabold text-slate-850 dark:text-slate-100">
										Cloud & Smart Home
									</h3>
									<p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider leading-none">Conectividade Avançada</p>
								</div>
							</div>
							
							<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-semibold">
								Crie dispositivos interoperáveis com&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">ESP-Matter</strong>, implemente produtos de nuvem rápida com&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">ESP-RainMaker</strong> ou redes locais com&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">ESP-NOW</strong> e&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">Zigbee 3.0</strong>.
							</p>
						</div>

						<div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-850/40 mt-auto">
							<Link href="/frameworks/ESP-RainMaker" className="inline-flex items-center gap-1 px-3 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-xl text-xs font-bold hover:bg-blue-500/20 transition-all">
								<span>RainMaker</span>
							</Link>
							<Link href="/frameworks/ESP-Matter" className="inline-flex items-center gap-1 px-3 py-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-xl text-xs font-bold hover:bg-amber-500/20 transition-all">
								<span>Matter</span>
							</Link>
							<Link href="/frameworks/ESP-Zigbee-SDK" className="inline-flex items-center gap-1 px-3 py-2 bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 rounded-xl text-xs font-bold hover:bg-pink-500/20 transition-all">
								<span>Zigbee</span>
							</Link>
						</div>
					</div>

					{/* Card 3: Specialized Edge AI */}
					<div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-slate-300 dark:border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
						<div>
							<div className="flex items-center gap-3.5 mb-5">
								<div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-500">
									<Sparkles className="w-6 h-6" />
								</div>
								<div>
									<h3 className="text-xl font-display font-extrabold text-slate-850 dark:text-slate-100">
										Áudio, Voz & IA
									</h3>
									<p className="text-[10px] font-bold text-purple-500 uppercase tracking-wider leading-none">Domínios Especializados</p>
								</div>
							</div>
							
							<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-semibold">
								Processe áudio com o&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">ESP-ADF</strong>, reconheça fala offline com o&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">ESP-SR</strong>, processe vídeo com o&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">ESP-WHO</strong> e acelere TinyML com o&nbsp;
								<strong className="text-slate-750 dark:text-slate-300">ESP-NN</strong>.
							</p>
						</div>

						<div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-850/40 mt-auto">
							<Link href="/frameworks/ESP-ADF" className="inline-flex items-center gap-1 px-3 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-xl text-xs font-bold hover:bg-blue-500/20 transition-all">
								<Music className="w-3.5 h-3.5" />
								<span>Áudio</span>
							</Link>
							<Link href="/frameworks/ESP-SR" className="inline-flex items-center gap-1 px-3 py-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-xl text-xs font-bold hover:bg-indigo-500/20 transition-all">
								<Mic className="w-3.5 h-3.5" />
								<span>Voz</span>
							</Link>
							<Link href="/frameworks/ESP-NN" className="inline-flex items-center gap-1 px-3 py-2 bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 rounded-xl text-xs font-bold hover:bg-teal-500/20 transition-all">
								<Brain className="w-3.5 h-3.5" />
								<span>IA</span>
							</Link>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}