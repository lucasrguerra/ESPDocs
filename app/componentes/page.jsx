"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
	CATEGORIAS_COMPONENTES,
	COMPONENTES_REGISTRY,
	GUIA_COMPONENT_MANAGER
} from "@/lib/componentRegistryData";
import {
	Layers,
	Search,
	Copy,
	Check,
	ExternalLink,
	Sparkles,
	Terminal,
	Code2,
	Plus,
	Trash2,
	Download,
	Cpu,
	Box,
	CheckCircle2,
	ChevronRight,
	HelpCircle,
	ArrowRight,
	BookOpen,
	ShieldCheck,
	Zap,
	Monitor,
	Cloud,
	Brain,
	Home,
	CircuitBoard,
	Wrench
} from "lucide-react";

export default function ComponentRegistryPage() {
	const [busca, setBusca] = useState("");
	const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
	const [chipFiltro, setChipFiltro] = useState("todos");
	const [copiadoId, setCopiadoId] = useState(null);
	const [manifestoCopiado, setManifestoCopiado] = useState(false);

	// Componentes selecionados no construtor de idf_component.yml
	const [componentesSelecionados, setComponentesSelecionados] = useState([
		"espressif-esp_lvgl_port",
		"espressif-led_indicator"
	]);

	// Lista de chips únicos para filtro
	const chipsDisponiveis = ["todos", "ESP32", "ESP32-S3", "ESP32-C6", "ESP32-P4", "ESP32-H2", "ESP32-C3"];

	// Filtragem dos componentes
	const componentesFiltrados = useMemo(() => {
		return COMPONENTES_REGISTRY.filter((comp) => {
			const matchCategoria = categoriaAtiva === "todos" || comp.categoria === categoriaAtiva;
			const matchChip = chipFiltro === "todos" || (comp.chips && comp.chips.includes(chipFiltro));
			const matchBusca =
				busca.trim() === "" ||
				comp.name.toLowerCase().includes(busca.toLowerCase()) ||
				comp.namespace.toLowerCase().includes(busca.toLowerCase()) ||
				comp.titulo.toLowerCase().includes(busca.toLowerCase()) ||
				comp.descricao.toLowerCase().includes(busca.toLowerCase()) ||
				comp.tags.some((t) => t.toLowerCase().includes(busca.toLowerCase()));

			return matchCategoria && matchChip && matchBusca;
		});
	}, [busca, categoriaAtiva, chipFiltro]);

	// Manipuladores de cópia
	const copiarComando = (id, comando) => {
		navigator.clipboard.writeText(comando);
		setCopiadoId(id);
		setTimeout(() => setCopiadoId(null), 2000);
	};

	const toggleSelecaoManifesto = (id) => {
		setComponentesSelecionados((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};

	// Geração dinâmica do manifesto YAML
	const manifestoYaml = useMemo(() => {
		const selecionados = COMPONENTES_REGISTRY.filter((c) =>
			componentesSelecionados.includes(c.id)
		);

		if (selecionados.length === 0) {
			return `# Nenhum componente selecionado.\n# Clique em "+ Adicionar ao Manifesto" nos cards abaixo.`;
		}

		let yaml = `# main/idf_component.yml\n# Gerado via ESPDocs Component Hub (https://espdocs.cienciaembarcada.com.br/componentes)\n\ndependencies:\n`;
		selecionados.forEach((c) => {
			yaml += `  ${c.namespace}/${c.name}: "${c.versao}"\n`;
		});
		return yaml;
	}, [componentesSelecionados]);

	const copiarManifesto = () => {
		navigator.clipboard.writeText(manifestoYaml);
		setManifestoCopiado(true);
		setTimeout(() => setManifestoCopiado(false), 2000);
	};

	const baixarManifesto = () => {
		const blob = new Blob([manifestoYaml], { type: "text/yaml;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "idf_component.yml";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	// Mapeamento de ícones de categoria
	const renderIconeCategoria = (id) => {
		switch (id) {
			case "ui_display":
				return <Monitor className="w-4 h-4" />;
			case "cloud_conectividade":
				return <Cloud className="w-4 h-4" />;
			case "audio_voz_ia":
				return <Brain className="w-4 h-4" />;
			case "smart_home_mesh":
				return <Home className="w-4 h-4" />;
			case "drivers_perifericos":
				return <Cpu className="w-4 h-4" />;
			case "bsp_placas":
				return <CircuitBoard className="w-4 h-4" />;
			case "sistema_utilitarios":
				return <Wrench className="w-4 h-4" />;
			default:
				return <Layers className="w-4 h-4" />;
		}
	};

	return (
		<div className="bg-gradient-to-br from-slate-100 via-slate-50 to-purple-100/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<Header />

			<main id="conteudo" className="px-4 md:px-6 pt-12 md:pt-16 pb-24 max-w-7xl mx-auto space-y-12">
				{/* Top Hero Section */}
				<section className="text-center select-none relative">
					<div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-slate-300 dark:border-slate-800/80 shadow-xs">
						<Box className="w-4 h-4 text-purple-500" />
						<span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
							ESP-IDF Component Manager
						</span>
						<span className="bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
							Oficial
						</span>
					</div>

					<h1 className="text-4xl md:text-6xl font-display font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 pb-2 pt-1 leading-tight md:leading-[1.18] tracking-tight">
						ESP Component Registry
					</h1>

					<p className="text-sm md:text-base text-slate-600 dark:text-slate-350 max-w-3xl mx-auto leading-relaxed font-semibold">
						O catálogo oficial de pacotes reutilizáveis da Espressif para o ESP-IDF.
						Adicione drivers de displays, reconhecimento de voz, pilhas industriais e bibliotecas
						com comandos de um clique e geração de manifesto declarativo.
					</p>

					<div className="flex flex-wrap items-center justify-center gap-3 mt-6">
						<a
							href="https://components.espressif.com"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
						>
							<span>Acessar Registry Oficial</span>
							<ExternalLink className="w-3.5 h-3.5" />
						</a>
						<a
							href="#manifesto-builder"
							className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
						>
							<Code2 className="w-3.5 h-3.5 text-purple-500" />
							<span>Gerador de idf_component.yml</span>
						</a>
					</div>
				</section>

				{/* Interactive Search & Filter Bar */}
				<section className="bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 border border-slate-300 dark:border-slate-800/80 shadow-xl space-y-5">
					<div className="flex flex-col md:flex-row gap-4 items-center justify-between">
						{/* Search Input */}
						<div className="relative w-full md:flex-1">
							<Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
							<input
								type="text"
								value={busca}
								onChange={(e) => setBusca(e.target.value)}
								placeholder="Buscar componentes por nome, namespace, funcionalidade ou tags (ex: lvgl, rainmaker, ws2812)..."
								className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/70 border border-slate-250 dark:border-slate-800 rounded-2xl text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500 transition-all"
							/>
							{busca && (
								<button
									onClick={() => setBusca("")}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
								>
									Limpar
								</button>
							)}
						</div>

						{/* Chip Filter */}
						<div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
							<span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
								SoC:
							</span>
							{chipsDisponiveis.map((chip) => (
								<button
									key={chip}
									onClick={() => setChipFiltro(chip)}
									className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
										chipFiltro === chip
											? "bg-purple-600 text-white shadow-xs"
											: "bg-slate-100 dark:bg-slate-800/80 text-slate-650 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-700"
									}`}
								>
									{chip === "todos" ? "Todos SoCs" : chip}
								</button>
							))}
						</div>
					</div>

					{/* Category Tabs */}
					<div className="flex items-center gap-2 overflow-x-auto pb-2 border-t border-slate-200 dark:border-slate-800/60 pt-4">
						{CATEGORIAS_COMPONENTES.map((cat) => {
							const ativa = categoriaAtiva === cat.id;
							const contagem =
								cat.id === "todos"
									? COMPONENTES_REGISTRY.length
									: COMPONENTES_REGISTRY.filter((c) => c.categoria === cat.id).length;

							return (
								<button
									key={cat.id}
									onClick={() => setCategoriaAtiva(cat.id)}
									className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
										ativa
											? "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 shadow-xs"
											: "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
									}`}
								>
									{renderIconeCategoria(cat.id)}
									<span>{cat.nome}</span>
									<span
										className={`text-[10px] px-1.5 py-0.2 rounded-full ${
											ativa
												? "bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
												: "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
										}`}
									>
										{contagem}
									</span>
								</button>
							);
						})}
					</div>
				</section>

				{/* Components Grid */}
				<section className="space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-display font-extrabold text-slate-850 dark:text-slate-100 flex items-center gap-2">
							<Sparkles className="w-5 h-5 text-purple-500" />
							<span>Componentes Disponíveis ({componentesFiltrados.length})</span>
						</h2>
						<span className="text-xs text-slate-500 font-semibold">
							Clique em um comando para copiar para o terminal
						</span>
					</div>

					{componentesFiltrados.length === 0 ? (
						<div className="text-center py-16 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-300 dark:border-slate-800 p-8">
							<Box className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
							<p className="text-base font-bold text-slate-750 dark:text-slate-200">
								Nenhum componente encontrado para esses filtros.
							</p>
							<p className="text-xs text-slate-500 mt-1">
								Tente buscar por termos mais genéricos ou resetar a categoria.
							</p>
							<button
								onClick={() => {
									setBusca("");
									setCategoriaAtiva("todos");
									setChipFiltro("todos");
								}}
								className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
							>
								Limpar Todos os Filtros
							</button>
						</div>
					) : (
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{componentesFiltrados.map((comp) => {
								const selecionado = componentesSelecionados.includes(comp.id);
								const cliCmd = `idf.py add-dependency "${comp.namespace}/${comp.name}${comp.versao}"`;
								const foiCopiado = copiadoId === comp.id;

								return (
									<div
										key={comp.id}
										className={`bg-white dark:bg-slate-900/45 backdrop-blur-xl border rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group ${
											selecionado
												? "border-purple-500/80 ring-2 ring-purple-500/20"
												: "border-slate-300 dark:border-slate-800/80 hover:-translate-y-1"
										}`}
									>
										{/* Top Header Card */}
										<div className="p-6 pb-4 border-b border-slate-150 dark:border-slate-850/40">
											<div className="flex items-start justify-between gap-3 mb-2">
												<div>
													<div className="flex items-center gap-1.5 mb-1">
														<span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
															{comp.namespace}/
														</span>
														{comp.oficial && (
															<span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[9px] font-extrabold px-2 py-0.2 rounded-full border border-emerald-300 dark:border-emerald-800/60">
																<ShieldCheck className="w-3 h-3" />
																Oficial
															</span>
														)}
													</div>
													<h3 className="text-xl font-display font-extrabold text-slate-850 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
														{comp.name}
													</h3>
													<p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
														{comp.titulo}
													</p>
												</div>

												<span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
													{comp.versao}
												</span>
											</div>

											<p className="text-xs text-slate-500 dark:text-slate-350 leading-relaxed mt-2.5 line-clamp-3">
												{comp.descricao}
											</p>

											{/* Tags */}
											<div className="flex flex-wrap gap-1.5 mt-3.5">
												{comp.tags.map((tag) => (
													<span
														key={tag}
														className="text-[9px] font-bold bg-slate-100 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md border border-slate-250 dark:border-slate-800"
													>
														{tag}
													</span>
												))}
											</div>
										</div>

										{/* Interactive CLI Action Box */}
										<div className="p-6 py-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
											<div>
												<div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
													<span className="flex items-center gap-1">
														<Terminal className="w-3 h-3 text-purple-500" />
														Comando CLI
													</span>
													{foiCopiado && (
														<span className="text-emerald-500 font-bold flex items-center gap-0.5">
															<Check className="w-3 h-3" /> Copiado!
														</span>
													)}
												</div>
												<button
													onClick={() => copiarComando(comp.id, cliCmd)}
													className="w-full text-left bg-slate-900 text-slate-100 p-2.5 rounded-xl font-mono text-[11px] hover:bg-slate-800 border border-slate-800 flex items-center justify-between group/cmd transition-colors cursor-pointer"
													title="Clique para copiar comando"
												>
													<span className="truncate pr-2">{cliCmd}</span>
													<Copy className="w-3.5 h-3.5 text-slate-400 group-hover/cmd:text-white shrink-0" />
												</button>
											</div>

											{/* Compatible Chips */}
											<div>
												<span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
													SoCs Compatíveis:
												</span>
												<div className="flex flex-wrap gap-1">
													{comp.chips.map((chip) => (
														<span
															key={chip}
															className="text-[9px] font-semibold text-slate-650 dark:text-slate-350 bg-slate-200/60 dark:bg-slate-800 px-1.5 py-0.2 rounded"
														>
															{chip}
														</span>
													))}
												</div>
											</div>
										</div>

										{/* Bottom Actions */}
										<div className="p-4 px-6 border-t border-slate-150 dark:border-slate-850/40 flex items-center justify-between text-xs font-bold">
											<button
												onClick={() => toggleSelecaoManifesto(comp.id)}
												className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
													selecionado
														? "bg-purple-600 text-white shadow-xs"
														: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40 hover:bg-purple-100"
												}`}
											>
												{selecionado ? (
													<>
														<CheckCircle2 className="w-3.5 h-3.5" />
														<span>No Manifesto</span>
													</>
												) : (
													<>
														<Plus className="w-3.5 h-3.5" />
														<span>Adicionar ao Manifesto</span>
													</>
												)}
											</button>

											<div className="flex items-center gap-2">
												<a
													href={comp.urlRegistry}
													target="_blank"
													rel="noopener noreferrer"
													className="text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1"
													title="Ver página oficial no ESP Component Registry"
												>
													<ExternalLink className="w-4 h-4" />
												</a>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</section>

				{/* Interactive Manifest Builder Section */}
				<section
					id="manifesto-builder"
					className="bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-purple-300 dark:border-purple-800/60 shadow-2xl space-y-6"
				>
					<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-250 dark:border-slate-800">
						<div>
							<div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full mb-2">
								<Code2 className="w-3.5 h-3.5" />
								<span>Gerador de Manifesto Declarativo</span>
							</div>
							<h2 className="text-2xl font-display font-extrabold text-slate-850 dark:text-slate-100">
								Construtor de `idf_component.yml`
							</h2>
							<p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
								Adicione este arquivo na pasta <code>main/</code> do seu projeto ESP-IDF para
								instalar todas as bibliotecas automaticamente na compilação.
							</p>
						</div>

						<div className="flex items-center gap-2.5 w-full md:w-auto">
							<button
								onClick={copiarManifesto}
								className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:opacity-90 shadow-md transition-all active:scale-95 cursor-pointer"
							>
								{manifestoCopiado ? (
									<>
										<Check className="w-4 h-4" />
										<span>Manifesto Copiado!</span>
									</>
								) : (
									<>
										<Copy className="w-4 h-4" />
										<span>Copiar YAML</span>
									</>
								)}
							</button>

							<button
								onClick={baixarManifesto}
								className="inline-flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
								title="Baixar arquivo idf_component.yml pronto"
							>
								<Download className="w-4 h-4" />
								<span className="hidden sm:inline">Baixar .yml</span>
							</button>

							{componentesSelecionados.length > 0 && (
								<button
									onClick={() => setComponentesSelecionados([])}
									className="p-2.5 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
									title="Limpar seleção"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							)}
						</div>
					</div>

					{/* YAML Output Terminal */}
					<div className="relative">
						<div className="bg-slate-950 text-slate-200 rounded-2xl p-4 md:p-6 font-mono text-xs md:text-sm overflow-x-auto border border-slate-800 shadow-inner">
							<pre>{manifestoYaml}</pre>
						</div>
					</div>

					{/* Selected components badges */}
					<div className="flex flex-wrap items-center gap-2 pt-2">
						<span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
							Componentes Inclusos ({componentesSelecionados.length}):
						</span>
						{componentesSelecionados.map((id) => {
							const c = COMPONENTES_REGISTRY.find((item) => item.id === id);
							if (!c) return null;
							return (
								<span
									key={id}
									className="inline-flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800 px-3 py-1 rounded-xl text-xs font-bold"
								>
									<span>{c.name}</span>
									<button
										onClick={() => toggleSelecaoManifesto(id)}
										className="hover:text-rose-500 ml-1 cursor-pointer"
										title="Remover"
									>
										×
									</button>
								</span>
							);
						})}
					</div>
				</section>

				{/* Educational Guide: O que é o Component Manager */}
				<section className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-300 dark:border-slate-800 shadow-xl space-y-8 select-none">
					<div>
						<div className="flex items-center gap-3 mb-2">
							<div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
								<BookOpen className="w-5 h-5" />
							</div>
							<h2 className="text-2xl font-display font-extrabold text-slate-850 dark:text-slate-100">
								{GUIA_COMPONENT_MANAGER.titulo}
							</h2>
						</div>
						<p className="text-xs md:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-semibold max-w-4xl">
							{GUIA_COMPONENT_MANAGER.resumo}
						</p>
					</div>

					{/* Vantagens Grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
						{GUIA_COMPONENT_MANAGER.vantagens.map((v, i) => (
							<div
								key={i}
								className="bg-slate-50/70 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 space-y-2"
							>
								<div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-extrabold">
									0{i + 1}
								</div>
								<h3 className="text-sm font-bold text-slate-850 dark:text-slate-100">{v.titulo}</h3>
								<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
									{v.descricao}
								</p>
							</div>
						))}
					</div>

					{/* Comandos Essenciais da CLI */}
					<div className="space-y-3">
						<h3 className="text-base font-display font-extrabold text-slate-850 dark:text-slate-100 flex items-center gap-2">
							<Terminal className="w-4 h-4 text-purple-500" />
							<span>Comandos Essenciais no Terminal</span>
						</h3>

						<div className="space-y-3">
							{GUIA_COMPONENT_MANAGER.comandosCli.map((cmd, i) => (
								<div
									key={i}
									className="bg-slate-900 text-slate-100 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono text-xs"
								>
									<div>
										<span className="text-purple-400 font-bold">$ {cmd.exemplo}</span>
										<p className="text-[11px] text-slate-400 font-sans mt-1">
											{cmd.explicacao}
										</p>
									</div>
									<button
										onClick={() => copiarComando(`cmd-${i}`, cmd.exemplo)}
										className="self-start md:self-auto inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-200 transition-colors shrink-0"
									>
										{copiadoId === `cmd-${i}` ? (
											<>
												<Check className="w-3.5 h-3.5 text-emerald-400" />
												<span>Copiado</span>
											</>
										) : (
											<>
												<Copy className="w-3.5 h-3.5" />
												<span>Copiar</span>
											</>
										)}
									</button>
								</div>
							))}
						</div>
					</div>

					{/* Versioning Semantics Callout */}
					<div className="bg-purple-50 dark:bg-purple-950/30 rounded-2xl p-5 border border-purple-200 dark:border-purple-800/40 text-xs space-y-2">
						<h4 className="font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
							<HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
							<span>Regras de Versionamento Semântico no ESP-IDF</span>
						</h4>
						<ul className="list-disc list-inside space-y-1 text-slate-750 dark:text-slate-350">
							<li>
								<code>^1.2.0</code>: Permite atualizações menores e correções (ex: 1.2.1, 1.3.0),
								mas bloqueia grandes mudanças de API (2.0.0). <strong>(Recomendado)</strong>
							</li>
							<li>
								<code>~1.2.0</code>: Permite apenas correções de bugs (ex: 1.2.1, 1.2.5), travando
								na mesma versão menor.
							</li>
							<li>
								<code>1.2.0</code>: Trava na versão exata indicada, sem receber atualizações.
							</li>
							<li>
								<code>*</code>: Aceita qualquer versão disponível (não recomendado para produção).
							</li>
						</ul>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
