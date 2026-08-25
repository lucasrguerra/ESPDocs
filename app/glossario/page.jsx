"use client";

import { useState, useMemo, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { categoriasGlossario } from "@/lib/glossarioData";
import {
	BookOpen,
	Search,
	Cpu,
	Database,
	Wifi,
	Sliders,
	Sparkles,
	BatteryCharging,
	Code2,
	Link2,
	Check,
	ArrowRight,
	Lightbulb,
	HelpCircle,
	X,
	SlidersHorizontal,
	Filter,
	RotateCcw,
	Tag,
	ShieldCheck,
} from "lucide-react";

export default function GlossarioPage() {
	const [busca, setBusca] = useState("");
	const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");
	const [letraFiltro, setLetraFiltro] = useState(null);
	const [copiadoSlug, setCopiadoSlug] = useState(null);
	const searchInputRef = useRef(null);

	// Sugestões populares para busca rápida
	const buscasPopulares = [
		{ rotulo: "GPIO", emoji: "🔌" },
		{ rotulo: "ULP", emoji: "⚡" },
		{ rotulo: "PSRAM", emoji: "💾" },
		{ rotulo: "Strapping Pins", emoji: "🚀" },
		{ rotulo: "Deep Sleep", emoji: "🔋" },
		{ rotulo: "OTA", emoji: "📡" },
		{ rotulo: "Matter", emoji: "🌐" },
		{ rotulo: "Secure Boot", emoji: "🔒" },
		{ rotulo: "Wi-Fi 6", emoji: "📶" },
		{ rotulo: "MIPI", emoji: "✨" },
	];

	// Mapeamento de ícones por nome
	const iconMap = {
		Cpu: <Cpu className="w-4 h-4" />,
		Database: <Database className="w-4 h-4" />,
		Wifi: <Wifi className="w-4 h-4" />,
		Sliders: <Sliders className="w-4 h-4" />,
		Sparkles: <Sparkles className="w-4 h-4" />,
		BatteryCharging: <BatteryCharging className="w-4 h-4" />,
		Code2: <Code2 className="w-4 h-4" />,
		ShieldCheck: <ShieldCheck className="w-4 h-4" />,
	};

	// Lista de todos os termos com metadados de categoria
	const todosOsTermos = useMemo(() => {
		return categoriasGlossario.flatMap((cat) =>
			cat.termos.map((t) => ({
				...t,
				categoriaId: cat.id,
				categoriaNome: cat.nome,
				categoriaCor: cat.cor,
				categoriaIcone: cat.icone,
				categoriaEmoji: cat.emoji,
				slug: t.termo.toLowerCase().replace(/[\s()/²]+/g, "-"),
				primeiraLetra: t.termo.charAt(0).toUpperCase(),
			}))
		);
	}, []);

	// Todas as letras do alfabeto de A a Z com indicador de existência de termos
	const alfabeto = useMemo(() => {
		const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		const setDisponivel = new Set(
			todosOsTermos.map((t) => t.termo.charAt(0).toUpperCase())
		);
		return letras.map((letra) => ({
			letra,
			temTermos: setDisponivel.has(letra),
		}));
	}, [todosOsTermos]);

	// Filtragem dinâmica
	const termosFiltrados = useMemo(() => {
		const termoBusca = busca.toLowerCase().trim();
		return todosOsTermos.filter((item) => {
			const matchCategoria =
				categoriaSelecionada === "todas" ||
				item.categoriaId === categoriaSelecionada;
			const matchLetra = !letraFiltro || item.primeiraLetra === letraFiltro;
			const matchBusca =
				!termoBusca ||
				item.termo.toLowerCase().includes(termoBusca) ||
				item.definicao.toLowerCase().includes(termoBusca) ||
				item.exemplo.toLowerCase().includes(termoBusca) ||
				item.categoriaNome.toLowerCase().includes(termoBusca);

			return matchCategoria && matchLetra && matchBusca;
		});
	}, [todosOsTermos, categoriaSelecionada, letraFiltro, busca]);

	const temFiltroAtivo =
		busca.trim() !== "" ||
		categoriaSelecionada !== "todas" ||
		letraFiltro !== null;

	const limparTodosFiltros = () => {
		setBusca("");
		setCategoriaSelecionada("todas");
		setLetraFiltro(null);
		searchInputRef.current?.focus();
	};

	const copiarLinkTermo = (slug) => {
		const url = `${window.location.origin}/glossario#${slug}`;
		navigator.clipboard.writeText(url);
		setCopiadoSlug(slug);
		setTimeout(() => setCopiadoSlug(null), 2000);
	};

	const catAtivaInfo = categoriasGlossario.find(
		(c) => c.id === categoriaSelecionada
	);

	return (
		<div className="bg-gradient-to-br from-slate-100 via-slate-50 to-purple-100/30 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<Header />

			<main id="conteudo" className="px-4 sm:px-6 pt-12 pb-24 max-w-7xl mx-auto">
				{/* Hero Section */}
				<section className="text-center mb-10 select-none">
					<div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full mb-5 border border-slate-250 dark:border-slate-800/80 shadow-xs">
						<BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
						<span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
							Enciclopédia & Conceitos do ESP32
						</span>
					</div>

					<h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
						Glossário Técnico
					</h1>

					<p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
						Consulte definições diretas, parâmetros de hardware e exemplos práticos dos termos fundamentais do ecossistema ESP32.
					</p>
				</section>

				{/* 1. PAINEL INTEGRADO DE BUSCA & FILTRAGEM (REDESIGN COMPLETO) */}
				<section className="mb-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm transition-all">
					{/* Barra de Pesquisa Principal */}
					<div className="relative mb-5">
						<div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 pointer-events-none">
							<Search className="w-4 h-4 sm:w-5 sm:h-5" />
						</div>

						<input
							ref={searchInputRef}
							type="text"
							value={busca}
							onChange={(e) => setBusca(e.target.value)}
							placeholder="Pesquisar por termo, sigla ou conceito (ex: GPIO, ULP, PSRAM, OTA, Deep Sleep)..."
							className="w-full bg-slate-50 dark:bg-slate-950/70 pl-13 sm:pl-14 pr-24 sm:pr-28 py-3.5 sm:py-4 rounded-2xl border border-slate-250 dark:border-slate-800 text-sm sm:text-base font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-inner"
						/>

						{/* Lado Direito da Barra de Pesquisa: Botão Limpar ou Tag de Contagem */}
						<div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
							{busca ? (
								<button
									type="button"
									onClick={() => {
										setBusca("");
										searchInputRef.current?.focus();
									}}
									className="text-xs px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
								>
									<X className="w-3.5 h-3.5" />
									<span>Limpar</span>
								</button>
							) : (
								<span className="hidden sm:inline-flex text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-250 dark:border-slate-700">
									{termosFiltrados.length} {termosFiltrados.length === 1 ? "termo" : "termos"}
								</span>
							)}
						</div>
					</div>

					{/* Atalhos de Pesquisa Rápida (Tags Populares) */}
					<div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1.5 scrollbar-none text-xs">
						<span className="text-slate-500 dark:text-slate-400 font-bold shrink-0 flex items-center gap-1 text-[11px] uppercase tracking-wider">
							<Tag className="w-3 h-3" />
							Populares:
						</span>
						{buscasPopulares.map((item) => (
							<button
								key={item.rotulo}
								type="button"
								onClick={() => setBusca(item.rotulo)}
								className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer border ${
									busca.toLowerCase() === item.rotulo.toLowerCase()
										? "bg-purple-600 text-white border-purple-600 shadow-xs"
										: "bg-slate-100/80 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-750 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:border-purple-300 dark:hover:border-purple-800"
								}`}
							>
								<span className="mr-1">{item.emoji}</span>
								<span>{item.rotulo}</span>
							</button>
						))}
					</div>

					{/* Seletor de Categorias em Grid/Flex Moderno */}
					<div className="space-y-2 mb-5">
						<div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
							<span className="flex items-center gap-1.5">
								<Filter className="w-3.5 h-3.5 text-purple-500" />
								Filtrar por Categoria
							</span>
							{categoriaSelecionada !== "todas" && (
								<button
									type="button"
									onClick={() => setCategoriaSelecionada("todas")}
									className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer lowercase first-letter:uppercase text-[11px]"
								>
									Ver todas ({todosOsTermos.length})
								</button>
							)}
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
							{/* Botão Todas */}
							<button
								type="button"
								onClick={() => setCategoriaSelecionada("todas")}
								className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left flex flex-col justify-between gap-1 cursor-pointer border ${
									categoriaSelecionada === "todas"
										? "bg-purple-600 text-white border-purple-600 shadow-sm ring-2 ring-purple-500/20"
										: "bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700"
								}`}
							>
								<span className="text-base">✨</span>
								<div className="flex items-center justify-between w-full">
									<span className="truncate">Todas</span>
									<span
										className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
											categoriaSelecionada === "todas"
												? "bg-white/20 text-white"
												: "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
										}`}
									>
										{todosOsTermos.length}
									</span>
								</div>
							</button>

							{/* Categorias Individuais */}
							{categoriasGlossario.map((cat) => {
								const ativa = categoriaSelecionada === cat.id;
								return (
									<button
										key={cat.id}
										type="button"
										onClick={() => setCategoriaSelecionada(cat.id)}
										className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left flex flex-col justify-between gap-1 cursor-pointer border ${
											ativa
												? "bg-purple-600 text-white border-purple-600 shadow-sm ring-2 ring-purple-500/20"
												: "bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700"
										}`}
									>
										<span className="text-base">{cat.emoji}</span>
										<div className="flex items-center justify-between w-full">
											<span className="truncate">{cat.nome.split(" ")[0]}</span>
											<span
												className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
													ativa
														? "bg-white/20 text-white"
														: "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
												}`}
											>
												{cat.termos.length}
											</span>
										</div>
									</button>
								);
							})}
						</div>
					</div>

					{/* Scrubber de Índice Alfabético (A-Z) */}
					<div className="pt-3 border-t border-slate-150 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
						<div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider shrink-0">
							<span className="text-[11px]">Índice A-Z:</span>
						</div>

						<div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none flex-1 justify-start sm:justify-end">
							<button
								type="button"
								onClick={() => setLetraFiltro(null)}
								className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all shrink-0 ${
									letraFiltro === null
										? "bg-purple-600 text-white shadow-xs"
										: "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
								}`}
							>
								Todos
							</button>

							{alfabeto.map(({ letra, temTermos }) => {
								const ativo = letraFiltro === letra;
								if (!temTermos) {
									return (
										<span
											key={letra}
											className="w-6 h-6 flex items-center justify-center text-[11px] font-semibold text-slate-500 dark:text-slate-450 select-none shrink-0"
										>
											{letra}
										</span>
									);
								}
								return (
									<button
										key={letra}
										type="button"
										onClick={() => setLetraFiltro(ativo ? null : letra)}
										className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold cursor-pointer transition-all shrink-0 ${
											ativo
												? "bg-purple-600 text-white scale-110 shadow-xs"
												: "text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-950/60"
										}`}
									>
										{letra}
									</button>
								);
							})}
						</div>
					</div>

					{/* Fita de Filtros Ativos (Aparece quando algum filtro está ativo) */}
					{temFiltroAtivo && (
						<div className="mt-4 pt-3 border-t border-slate-150 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
							<div className="flex flex-wrap items-center gap-1.5 text-xs">
								<span className="text-slate-500 dark:text-slate-400 font-semibold mr-1">
									Filtros ativos:
								</span>

								{busca && (
									<span className="inline-flex items-center gap-1 bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800 font-medium">
										Busca: <strong>"{busca}"</strong>
										<button
											type="button"
											onClick={() => setBusca("")}
											className="hover:text-purple-900 dark:hover:text-purple-100"
										>
											<X className="w-3 h-3" />
										</button>
									</span>
								)}

								{categoriaSelecionada !== "todas" && (
									<span className="inline-flex items-center gap-1 bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800 font-medium">
										Categoria: <strong>{catAtivaInfo?.nome}</strong>
										<button
											type="button"
											onClick={() => setCategoriaSelecionada("todas")}
											className="hover:text-purple-900 dark:hover:text-purple-100"
										>
											<X className="w-3 h-3" />
										</button>
									</span>
								)}

								{letraFiltro && (
									<span className="inline-flex items-center gap-1 bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800 font-medium">
										Letra: <strong>{letraFiltro}</strong>
										<button
											type="button"
											onClick={() => setLetraFiltro(null)}
											className="hover:text-purple-900 dark:hover:text-purple-100"
										>
											<X className="w-3 h-3" />
										</button>
									</span>
								)}
							</div>

							<button
								type="button"
								onClick={limparTodosFiltros}
								className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
							>
								<RotateCcw className="w-3 h-3" />
								<span>Redefinir filtros</span>
							</button>
						</div>
					)}
				</section>

				{/* 2. GRID DE CARDS DO GLOSSÁRIO */}
				<section>
					{termosFiltrados.length === 0 ? (
						<div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-250 dark:border-slate-800 shadow-sm p-8">
							<HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
							<h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
								Nenhum termo encontrado
							</h3>
							<p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
								Não encontramos resultados para sua pesquisa com os filtros selecionados.
							</p>
							<button
								type="button"
								onClick={limparTodosFiltros}
								className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 cursor-pointer shadow-xs inline-flex items-center gap-1.5"
							>
								<RotateCcw className="w-3.5 h-3.5" />
								<span>Limpar todos os filtros</span>
							</button>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							{termosFiltrados.map((item) => {
								return (
									<article
										key={item.slug}
										id={item.slug}
										className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-250 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-500/40 p-5 sm:p-6 transition-all duration-200 shadow-xs flex flex-col justify-between scroll-mt-24 group"
									>
										<div className="space-y-3">
											{/* Header do Card */}
											<div className="flex items-center justify-between gap-2">
												<span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
													<span>{item.categoriaEmoji}</span>
													<span>{item.categoriaNome}</span>
												</span>

												<button
													type="button"
													onClick={() => copiarLinkTermo(item.slug)}
													title="Copiar link direto para este termo"
													className="text-xs text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 inline-flex items-center gap-1 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
												>
													{copiadoSlug === item.slug ? (
														<>
															<Check className="w-3.5 h-3.5 text-emerald-500" />
															<span className="text-emerald-500 font-semibold text-[11px]">
																Copiado!
															</span>
														</>
													) : (
														<Link2 className="w-3.5 h-3.5" />
													)}
												</button>
											</div>

											{/* Título do Termo */}
											<h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
												{item.termo}
											</h2>

											{/* Definição */}
											<p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
												<TextoComLinks texto={item.definicao} />
											</p>
										</div>

										{/* Caixa de Exemplo Prático */}
										<div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
											<div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 text-xs leading-relaxed space-y-1">
												<span className="font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
													<Lightbulb className="w-3.5 h-3.5" />
													Exemplo Prático
												</span>
												<p className="text-slate-700 dark:text-slate-300">
													<TextoComLinks texto={item.exemplo} />
												</p>
											</div>
										</div>
									</article>
								);
							})}
						</div>
					)}
				</section>

				{/* 3. CTA & PRÓXIMOS PASSOS */}
				<section className="mt-16 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
					<div className="text-center max-w-2xl mx-auto space-y-4">
						<div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold">
							<Sparkles className="w-4 h-4" />
							<span>Continue Explorando</span>
						</div>

						<h2 className="text-2xl sm:text-3xl font-display font-extrabold">
							Pronto para aplicar na prática?
						</h2>

						<p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
							Agora que você domina os conceitos técnicos, compare as especificações das séries ou use o seletor inteligente para encontrar o microcontrolador ideal para seu projeto.
						</p>

						<div className="flex flex-wrap items-center justify-center gap-3 pt-2">
							<Link
								href="/series"
								className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
							>
								<span>Explorar Séries ESP32</span>
								<ArrowRight className="w-4 h-4" />
							</Link>
							<Link
								href="/seletor"
								className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all inline-flex items-center gap-2"
							>
								<span>Seletor Inteligente</span>
							</Link>
							<Link
								href="/diagnostico"
								className="px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 transition-all inline-flex items-center gap-2"
							>
								<span>Guia de Diagnóstico & Erros</span>
							</Link>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}

/**
 * Função utilitária que detecta nomes de séries do ESP32 dentro do texto e os converte em links clicáveis.
 */
function TextoComLinks({ texto }) {
	if (!texto) return null;
	const seriesKeys = [
		"ESP32-S31",
		"ESP32-C61",
		"ESP32-S2",
		"ESP32-S3",
		"ESP32-C2",
		"ESP32-C3",
		"ESP32-C5",
		"ESP32-C6",
		"ESP32-P4",
		"ESP32-H2",
		"ESP32-H4",
		"ESP32",
	];
	const regex = new RegExp(`\\b(${seriesKeys.join("|")})\\b`, "g");
	const partes = texto.split(regex);

	return (
		<>
			{partes.map((parte, i) => {
				if (seriesKeys.includes(parte)) {
					return (
						<Link
							key={i}
							href={`/series/${parte}`}
							className="font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center mx-0.5"
						>
							{parte}
						</Link>
					);
				}
				return parte;
			})}
		</>
	);
}