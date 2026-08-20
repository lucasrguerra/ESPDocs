"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import seriesData from "@/public/series.json";
import { 
	Cpu, 
	Activity, 
	Database, 
	Wifi, 
	Bluetooth, 
	Battery, 
	Sparkles, 
	Home, 
	ArrowRight,
	Scale,
	Compass,
	ShieldCheck,
	AlertTriangle
} from "lucide-react";

export default function Series() {
	const series = Object.entries(seriesData);

	return (
		<div className="bg-gradient-to-br from-slate-50 via-white to-purple-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<Header />

			<main id="conteudo" className="px-6 pt-16 pb-24 max-w-7xl mx-auto">
				
				{/* Top Section */}
				<section className="text-center mb-20">
					<div className="inline-flex items-center gap-2 bg-purple-500/10 dark:bg-purple-400/5 px-4 py-2 rounded-full mb-6 border border-purple-500/20 shadow-xs select-none">
						<Compass className="w-4 h-4 text-purple-600 dark:text-purple-400" />
						<span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Explore o Ecossistema ESP32</span>
					</div>
					
					<h1 className="text-5xl md:text-7xl font-display font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
						Séries ESP32
					</h1>
					
					<p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
						Conheça toda a família de microcontroladores da Espressif. Cada série foi projetada com foco em engenharia especializada, desde nós de sensores autônomos de baixo consumo até poderosos aceleradores de inteligência artificial.
					</p>
				</section>

				{/* Series Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{series.map(([key, serie]) => {
						const isRiscV = serie.arquitetura.includes("RISC-V");
						return (
							<Link
								key={key}
								href={`/series/${key}`}
								className="group block"
							>
								{/* Glassmorphic card container with dynamic color borders and shadows */}
								<div 
									className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/80 hover:shadow-2xl transition-all duration-500 h-full flex flex-col justify-between"
									style={{
										borderColor: 'rgba(148, 163, 184, 0.1)',
										transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.borderColor = serie.cor;
										e.currentTarget.style.boxShadow = `0 15px 35px -12px ${serie.cor}35`;
										e.currentTarget.style.transform = 'translateY(-6px)';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.borderColor = '';
										e.currentTarget.style.boxShadow = '';
										e.currentTarget.style.transform = '';
									}}
								>
									<div>
										{/* Header block with Icon & Architecture */}
										<div className="flex items-center justify-between mb-6">
											<span className="text-4xl select-none filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">{serie.icone}</span>
											<span 
												className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase select-none`}
												style={{ backgroundColor: `${serie.cor}18`, color: serie.cor, border: `1px solid ${serie.cor}30` }}
											>
												{isRiscV ? "RISC-V" : "Xtensa"}
											</span>
										</div>
										
										{/* Title and description */}
										<h2 className="text-2xl font-display font-extrabold text-slate-850 dark:text-slate-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
											{key}
										</h2>
										
										<p className="text-xs text-slate-450 dark:text-slate-500 line-clamp-2 leading-relaxed mb-6">
											{serie.descricao}
										</p>

										{/* Detailed specs micro-grid */}
										<div className="space-y-3.5 border-t border-slate-100 dark:border-slate-800/60 pt-6">
											<div className="flex items-center justify-between text-xs">
												<div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-semibold select-none">
													<Cpu className="w-3.5 h-3.5 text-blue-500/80" />
													<span>Núcleos:</span>
												</div>
												<span className="font-bold text-slate-800 dark:text-slate-200">{serie.nucleos}</span>
											</div>
											
											<div className="flex items-center justify-between text-xs">
												<div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-semibold select-none">
													<Activity className="w-3.5 h-3.5 text-amber-500/80" />
													<span>Frequência:</span>
												</div>
												<span className="font-bold text-slate-800 dark:text-slate-200">{serie.frequencia}</span>
											</div>
											
											<div className="flex items-center justify-between text-xs">
												<div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-semibold select-none">
													<Database className="w-3.5 h-3.5 text-pink-500/80" />
													<span>SRAM:</span>
												</div>
												<span className="font-bold text-slate-800 dark:text-slate-200">{serie.memoria_sram}</span>
											</div>
											
											<div className="flex items-center justify-between text-xs">
												<div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-semibold select-none">
													<Wifi className="w-3.5 h-3.5 text-emerald-500/80" />
													<span>Wi-Fi:</span>
												</div>
												<span className="font-bold text-slate-800 dark:text-slate-200">
													{String(serie.wifi).includes("Não") ? (
														<span className="text-slate-350 dark:text-slate-650">—</span>
													) : (
														<span className="text-emerald-500 dark:text-emerald-400 font-extrabold">Sim</span>
													)}
												</span>
											</div>
											
											<div className="flex items-center justify-between text-xs">
												<div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-semibold select-none">
													<Bluetooth className="w-3.5 h-3.5 text-indigo-500/80" />
													<span>Bluetooth:</span>
												</div>
												<span className="font-bold text-slate-800 dark:text-slate-200">
													{serie.bluetooth === "Não" ? (
														<span className="text-slate-350 dark:text-slate-650">—</span>
													) : (
														<span className="text-indigo-500 dark:text-indigo-400 font-extrabold">Sim</span>
													)}
												</span>
											</div>

											{serie.consumo_energia?.deep_sleep && (
												<div className="flex items-center justify-between text-xs">
													<div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-semibold select-none">
														<Battery className="w-3.5 h-3.5 text-green-500/80" />
														<span>Deep Sleep:</span>
													</div>
													<span className="font-bold text-slate-800 dark:text-slate-200">{serie.consumo_energia.deep_sleep}</span>
												</div>
											)}
										</div>
									</div>

									{/* IA / Cripto / Matter Badges & Action Footer */}
									<div className="mt-8">
										<div className="flex flex-wrap gap-2 mb-6">
											{serie.aceleradores_ia && (
												<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase rounded-lg border border-purple-500/20 shadow-xs select-none">
													<Sparkles className="w-3 h-3" />
													<span>Aceleradores IA</span>
												</span>
											)}

											{serie.status_documentacao && (
												<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase rounded-lg border border-amber-500/20 shadow-xs select-none">
													<AlertTriangle className="w-3 h-3" />
													<span>Doc. Preliminar</span>
												</span>
											)}

											{serie.aceleradores_cripto && (
												<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[10px] font-bold uppercase rounded-lg border border-teal-500/20 shadow-xs select-none">
													<ShieldCheck className="w-3 h-3" />
													<span>Cripto por Hardware</span>
												</span>
											)}

											{serie.matter === "Sim" && (
												<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase rounded-lg border border-emerald-500/20 shadow-xs select-none">
													<Home className="w-3 h-3" />
													<span>Suporte Matter</span>
												</span>
											)}
										</div>

										<div className="flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors uppercase tracking-wider select-none border-t border-slate-100 dark:border-slate-800/60 pt-4">
											<span>Ver Detalhes</span>
											<ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>

				{/* Quick comparison CTA Box */}
				<div className="mt-20 bg-gradient-to-br from-slate-900 to-indigo-950 dark:from-slate-950 dark:to-purple-950/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-800/80">
					<div className="absolute right-0 bottom-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

					<div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
						<div className="flex-1 max-w-2xl text-center md:text-left">
							<div className="inline-flex items-center gap-2 bg-white/10 text-slate-350 px-3 py-1 rounded-full mb-4 text-xs font-semibold select-none animate-pulse">
								<Scale className="w-3.5 h-3.5" />
								<span>Decisão Técnica</span>
							</div>
							<h3 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-4">
								Ficou em dúvida de qual escolher?
							</h3>
							<p className="text-sm text-slate-400 leading-relaxed">
								Use nosso comparador técnico dinâmico para posicionar as especificações de conectividade RF, potência de rádio e suporte a barramentos de periféricos lado a lado.
							</p>
						</div>
						
						<Link
							href="/comparacao"
							className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all duration-300 shrink-0 shadow-md active:scale-95"
						>
							<span>Comparar Séries</span>
							<ArrowRight className="w-4 h-4" />
						</Link>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}