"use client";

import { useState, useMemo, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
	categoriasDiagnostico,
	sintomasRapidos,
	errosCatalogo,
	regrasDecodificadorLog,
} from "@/lib/diagnosticoData";
import {
	AlertTriangle,
	Zap,
	Cpu,
	Layers,
	Activity,
	Terminal,
	Wifi,
	Search,
	CheckCircle2,
	XCircle,
	Copy,
	Check,
	Sparkles,
	HelpCircle,
	ArrowRight,
	ExternalLink,
	ShieldAlert,
	Wrench,
	Code2,
	ChevronDown,
	ChevronUp,
	X,
	Filter,
	RotateCcw,
	Tag,
} from "lucide-react";

export default function DiagnosticoPage() {
	const [termoBusca, setTermoBusca] = useState("");
	const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
	const [sintomaAtivo, setSintomaAtivo] = useState(null);
	const [cardAberto, setCardAberto] = useState(null);
	const [linguagemCodigo, setLinguagemCodigo] = useState({}); // { [id]: 'arduino' | 'espidf' }
	const [copiadoId, setCopiadoId] = useState(null);
	const searchInputRef = useRef(null);

	// Estado do Analisador de Logs
	const [logInput, setLogInput] = useState("");
	const [resultadoLog, setResultadoLog] = useState(null);

	// Mapeamento de ícones e emojis por categoria
	const iconMap = {
		Zap: <Zap className="w-4 h-4" />,
		Cpu: <Cpu className="w-4 h-4" />,
		Layers: <Layers className="w-4 h-4" />,
		Activity: <Activity className="w-4 h-4" />,
		Terminal: <Terminal className="w-4 h-4" />,
		Wifi: <Wifi className="w-4 h-4" />,
	};

	const emojiMap = {
		alimentacao: "⚡",
		"cpu-panics": "💥",
		freertos: "🐕",
		memoria: "💾",
		"boot-flash": "🔌",
		conectividade: "📡",
	};

	// Função de Análise do Log
	const analisarLog = (texto) => {
		setLogInput(texto);
		if (!texto || texto.trim() === "") {
			setResultadoLog(null);
			return;
		}

		for (const regra of regrasDecodificadorLog) {
			if (regra.padrao.test(texto)) {
				setResultadoLog(regra);
				return;
			}
		}

		setResultadoLog({
			titulo: "Padrão de erro não categorizado automaticamente",
			tipo: "Desconhecido",
			explicacao:
				"Não identificamos uma assinatura clássica de Guru Meditation ou Brownout neste trecho. Verifique se a taxa de baud rate (ex: 115200) está correta e se o cabeçalho 'rst:' ou 'panic' está presente.",
			acaoRecomendada:
				"Procure por palavras-chave como 'Guru Meditation', 'rst:', 'LoadProhibited', 'watchdog' ou 'panic' no console serial.",
		});
	};

	const copiarParaClipboard = (texto, id) => {
		navigator.clipboard.writeText(texto);
		setCopiadoId(id);
		setTimeout(() => setCopiadoId(null), 2000);
	};

	// Filtragem dos erros
	const errosFiltrados = useMemo(() => {
		const termo = termoBusca.toLowerCase().trim();
		return errosCatalogo.filter((erro) => {
			const matchCategoria =
				categoriaAtiva === "todos" || erro.categoria === categoriaAtiva;
			const matchSintoma =
				!sintomaAtivo || erro.sintomas.includes(sintomaAtivo);
			const matchBusca =
				!termo ||
				erro.titulo.toLowerCase().includes(termo) ||
				erro.resumo.toLowerCase().includes(termo) ||
				erro.causaRaiz.toLowerCase().includes(termo) ||
				erro.logSerial.toLowerCase().includes(termo);

			return matchCategoria && matchSintoma && matchBusca;
		});
	}, [categoriaAtiva, sintomaAtivo, termoBusca]);

	const temFiltroAtivo =
		termoBusca.trim() !== "" ||
		categoriaAtiva !== "todos" ||
		sintomaAtivo !== null;

	const limparTodosFiltros = () => {
		setTermoBusca("");
		setCategoriaAtiva("todos");
		setSintomaAtivo(null);
		searchInputRef.current?.focus();
	};

	const toggleCard = (id) => {
		setCardAberto((prev) => (prev === id ? null : id));
	};

	const setLang = (id, lang) => {
		setLinguagemCodigo((prev) => ({ ...prev, [id]: lang }));
	};

	const catAtivaObj = categoriasDiagnostico.find((c) => c.id === categoriaAtiva);
	const sintomaAtivoObj = sintomasRapidos.find((s) => s.id === sintomaAtivo);

	return (
		<div className="bg-gradient-to-br from-slate-100 via-slate-50 to-amber-100/30 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<Header />

			<main id="conteudo" className="px-4 sm:px-6 pt-12 pb-24 max-w-7xl mx-auto">
				{/* Hero Section */}
				<section className="text-center mb-10 select-none">
					<div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full mb-5 border border-slate-250 dark:border-slate-800/80 shadow-xs">
						<AlertTriangle className="w-4 h-4 text-amber-500" />
						<span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
							Debugging & Engenharia de Firmware
						</span>
					</div>

					<h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold bg-gradient-to-r from-amber-600 via-red-600 to-purple-600 dark:from-amber-400 dark:via-red-400 dark:to-purple-400 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
						Diagnóstico & Erros Comuns
					</h1>

					<p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
						Guia técnico definitivo para diagnosticar <strong>Brownout</strong>,{" "}
						<strong>Guru Meditation</strong>, <strong>Watchdog Timeouts</strong>,{" "}
						<strong>Stack Overflow</strong> e falhas de hardware no ESP32. Entenda a causa raiz no silício e aplique soluções profissionais.
					</p>

					<div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
						Baseado no artigo publicado no{" "}
						<a
							href="https://cienciaembarcada.com.br/publicacoes/esp32-5-erros-comuns-e-como-resolve-los-profissionalmente/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-amber-600 dark:text-amber-400 underline font-semibold hover:opacity-80 inline-flex items-center gap-1"
						>
							Ciência Embarcada
							<ExternalLink className="w-3 h-3" />
						</a>
						, ampliado com novos cenários e decodificador interativo.
					</div>
				</section>

				{/* 1. DECODIFICADOR RÁPIDO DE LOG SERIAL */}
				<section className="mb-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm">
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
						<div className="flex items-center gap-3">
							<div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
								<Sparkles className="w-5 h-5" />
							</div>
							<div>
								<h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
									Decodificador Rápido de Log Serial
								</h2>
								<p className="text-xs text-slate-500 dark:text-slate-400">
									Cole o trecho do monitor serial para diagnosticar a falha instantaneamente.
								</p>
							</div>
						</div>

						{/* Exemplos Rápidos para Teste */}
						<div className="flex flex-wrap items-center gap-1.5 text-xs">
							<span className="text-slate-500 dark:text-slate-400 font-bold mr-1 text-[11px] uppercase tracking-wider">
								Exemplos:
							</span>
							<button
								type="button"
								onClick={() =>
									analisarLog(
										"Brownout detector was triggered\n\nrst:0xc (SW_CPU_RESET),boot:0x13"
									)
								}
								className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-700 font-medium transition-colors cursor-pointer"
							>
								⚡ Brownout
							</button>
							<button
								type="button"
								onClick={() =>
									analisarLog(
										"Guru Meditation Error: Core  0 panic'ed (LoadProhibited).\nEXCVADDR: 0x00000000"
									)
								}
								className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-100 dark:hover:bg-red-950/40 border border-slate-200 dark:border-slate-700 font-medium transition-colors cursor-pointer"
							>
								💥 LoadProhibited
							</button>
							<button
								type="button"
								onClick={() =>
									analisarLog(
										"Task watchdog got triggered. The following tasks/users did not reset the watchdog: - IDLE0"
									)
								}
								className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-700 font-medium transition-colors cursor-pointer"
							>
								🐕 Task Watchdog
							</button>
							<button
								type="button"
								onClick={() =>
									analisarLog(
										"mbedtls_ssl_handshake returned -0x2700\nThe certificate is not yet valid"
									)
								}
								className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-100 dark:hover:bg-cyan-950/40 border border-slate-200 dark:border-slate-700 font-medium transition-colors cursor-pointer"
							>
								🔒 Handshake TLS
							</button>
						</div>
					</div>

					<div className="relative">
						<textarea
							rows={3}
							value={logInput}
							onChange={(e) => analisarLog(e.target.value)}
							placeholder="Cole aqui o log do monitor serial (ex: Guru Meditation Error, Brownout detector was triggered, Task watchdog, rst:0x1...)"
							className="w-full bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm p-4 rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-slate-600 resize-y shadow-inner"
						/>
						{logInput && (
							<button
								type="button"
								onClick={() => analisarLog("")}
								className="absolute top-3.5 right-3.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 font-medium cursor-pointer"
							>
								Limpar
							</button>
						)}
					</div>

					{/* Card de Resultado da Análise */}
					{resultadoLog && (
						<div className="mt-4 p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 transition-all">
							<div className="flex items-start gap-3.5">
								<div className="p-2 rounded-xl bg-amber-700 text-white shrink-0 mt-0.5 shadow-xs">
									<ShieldAlert className="w-5 h-5" />
								</div>
								<div className="space-y-2 flex-1">
									<div className="flex flex-wrap items-center gap-2">
										<h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
											{resultadoLog.titulo}
										</h3>
										<span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
											{resultadoLog.tipo}
										</span>
									</div>
									<p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
										<strong>Causa provável:</strong> {resultadoLog.explicacao}
									</p>
									<p className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 font-medium">
										<strong>Ação recomendada:</strong> {resultadoLog.acaoRecomendada}
									</p>
								</div>
							</div>
						</div>
					)}
				</section>

				{/* 2. PAINEL UNIFICADO DE BUSCA & FILTRAGEM (COMMAND DECK) */}
				<section className="mb-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm transition-all">
					{/* Barra de Pesquisa Principal */}
					<div className="relative mb-5">
						<div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 pointer-events-none">
							<Search className="w-4 h-4 sm:w-5 sm:h-5" />
						</div>

						<input
							ref={searchInputRef}
							type="text"
							value={termoBusca}
							onChange={(e) => setTermoBusca(e.target.value)}
							placeholder="Buscar por erro, sintoma, registrador ou mensagem serial (ex: LoadProhibited, Brownout, IRAM, Stack Canary)..."
							className="w-full bg-slate-50 dark:bg-slate-950/70 pl-13 sm:pl-14 pr-24 sm:pr-28 py-3.5 sm:py-4 rounded-2xl border border-slate-250 dark:border-slate-800 text-sm sm:text-base font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-inner"
						/>

						<div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
							{termoBusca ? (
								<button
									type="button"
									onClick={() => {
										setTermoBusca("");
										searchInputRef.current?.focus();
									}}
									className="text-xs px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
								>
									<X className="w-3.5 h-3.5" />
									<span>Limpar</span>
								</button>
							) : (
								<span className="hidden sm:inline-flex text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-250 dark:border-slate-700">
									{errosFiltrados.length} {errosFiltrados.length === 1 ? "falha" : "falhas"}
								</span>
							)}
						</div>
					</div>

					{/* Atalhos Rápidos por Sintoma */}
					<div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1.5 scrollbar-none text-xs">
						<span className="text-slate-500 dark:text-slate-400 font-bold shrink-0 flex items-center gap-1 text-[11px] uppercase tracking-wider">
							<Tag className="w-3 h-3" />
							Sintomas:
						</span>
						{sintomasRapidos.map((sintoma) => {
							const ativo = sintomaAtivo === sintoma.id;
							return (
								<button
									key={sintoma.id}
									type="button"
									onClick={() => setSintomaAtivo(ativo ? null : sintoma.id)}
									className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer border ${
										ativo
											? "bg-amber-700 text-white border-amber-700 shadow-xs font-bold"
											: "bg-slate-100/80 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-750 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:border-amber-300 dark:hover:border-amber-800"
									}`}
								>
									<span>{sintoma.rotulo}</span>
								</button>
							);
						})}
					</div>

					{/* Seletor de Categorias em Grid Tátil */}
					<div className="space-y-2">
						<div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
							<span className="flex items-center gap-1.5">
								<Filter className="w-3.5 h-3.5 text-amber-500" />
								Filtrar por Domínio Técnico
							</span>
							{categoriaAtiva !== "todos" && (
								<button
									type="button"
									onClick={() => setCategoriaAtiva("todos")}
									className="text-amber-600 dark:text-amber-400 hover:underline cursor-pointer lowercase first-letter:uppercase text-[11px]"
								>
									Ver todas ({errosCatalogo.length})
								</button>
							)}
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
							{/* Botão Todas as Categorias */}
							<button
								type="button"
								onClick={() => setCategoriaAtiva("todos")}
								className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left flex flex-col justify-between gap-1 cursor-pointer border ${
									categoriaAtiva === "todos"
										? "bg-amber-700 text-white border-amber-700 shadow-sm ring-2 ring-amber-600/20"
										: "bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700"
								}`}
							>
								<span className="text-base">✨</span>
								<div className="flex items-center justify-between w-full">
									<span className="truncate">Todas</span>
									<span
										className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
											categoriaAtiva === "todos"
												? "bg-white/20 text-white"
												: "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
										}`}
									>
										{errosCatalogo.length}
									</span>
								</div>
							</button>

							{/* Categorias Individuais */}
							{categoriasDiagnostico.map((cat) => {
								const totalNaCat = errosCatalogo.filter(
									(e) => e.categoria === cat.id
								).length;
								const ativa = categoriaAtiva === cat.id;
								return (
									<button
										key={cat.id}
										type="button"
										onClick={() => setCategoriaAtiva(cat.id)}
										className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left flex flex-col justify-between gap-1 cursor-pointer border ${
											ativa
												? "bg-amber-700 text-white border-amber-700 shadow-sm ring-2 ring-amber-600/20"
												: "bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700"
										}`}
									>
										<span className="text-base">{emojiMap[cat.id] || "⚠️"}</span>
										<div className="flex items-center justify-between w-full">
											<span className="truncate">{cat.nome.split(" ")[0]}</span>
											<span
												className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
													ativa
														? "bg-white/20 text-white"
														: "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
												}`}
											>
												{totalNaCat}
											</span>
										</div>
									</button>
								);
							})}
						</div>
					</div>

					{/* Fita de Filtros Ativos */}
					{temFiltroAtivo && (
						<div className="mt-4 pt-3 border-t border-slate-150 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
							<div className="flex flex-wrap items-center gap-1.5 text-xs">
								<span className="text-slate-500 dark:text-slate-400 font-semibold mr-1">
									Filtros ativos:
								</span>

								{termoBusca && (
									<span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 font-medium">
										Busca: <strong>"{termoBusca}"</strong>
										<button
											type="button"
											onClick={() => setTermoBusca("")}
											className="hover:text-amber-950 dark:hover:text-amber-100"
										>
											<X className="w-3 h-3" />
										</button>
									</span>
								)}

								{categoriaAtiva !== "todos" && (
									<span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 font-medium">
										Categoria: <strong>{catAtivaObj?.nome}</strong>
										<button
											type="button"
											onClick={() => setCategoriaAtiva("todos")}
											className="hover:text-amber-950 dark:hover:text-amber-100"
										>
											<X className="w-3 h-3" />
										</button>
									</span>
								)}

								{sintomaAtivo && (
									<span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 font-medium">
										Sintoma: <strong>{sintomaAtivoObj?.rotulo}</strong>
										<button
											type="button"
											onClick={() => setSintomaAtivo(null)}
											className="hover:text-amber-950 dark:hover:text-amber-100"
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

				{/* 3. LISTA DE ERROS CATALOGADOS */}
				<section className="space-y-6">
					{errosFiltrados.length === 0 ? (
						<div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-250 dark:border-slate-800 shadow-sm p-8">
							<HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
							<h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
								Nenhuma falha encontrada com os filtros atuais
							</h3>
							<p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
								Tente buscar por termos mais genéricos ou limpe os filtros de sintoma e categoria.
							</p>
							<button
								type="button"
								onClick={limparTodosFiltros}
								className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-bold hover:bg-amber-800 cursor-pointer shadow-xs inline-flex items-center gap-1.5"
							>
								<RotateCcw className="w-3.5 h-3.5" />
								<span>Limpar todos os filtros</span>
							</button>
						</div>
					) : (
						errosFiltrados.map((erro) => {
							const estaAberto = cardAberto === erro.id;
							const lang = linguagemCodigo[erro.id] || "arduino";
							const codigoAtual =
								lang === "arduino"
									? erro.codigoArduino
									: lang === "espidf"
									? erro.codigoEspIdf
									: erro.codigoMicroPython || "# Exemplo não aplicável";

							const catInfo = categoriasDiagnostico.find(
								(c) => c.id === erro.categoria
							);

							return (
								<article
									key={erro.id}
									id={erro.id}
									className={`bg-white dark:bg-slate-900/90 rounded-3xl border transition-all duration-200 overflow-hidden shadow-xs ${
										estaAberto
											? "border-amber-400/80 dark:border-amber-500/50 ring-2 ring-amber-400/20"
											: "border-slate-250 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700"
									}`}
								>
									{/* Cabeçalho do Card */}
									<div
										onClick={() => toggleCard(erro.id)}
										className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
									>
										<div className="space-y-2 flex-1">
											<div className="flex flex-wrap items-center gap-2">
												<span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-250 dark:border-slate-700">
													<span>{emojiMap[erro.categoria] || "⚠️"}</span>
													<span>{catInfo?.nome}</span>
												</span>
												<span
													className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
														erro.gravidade === "Crítica"
															? "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900"
															: erro.gravidade === "Alta"
															? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900"
															: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
													}`}
												>
													Gravidade: {erro.gravidade}
												</span>
											</div>

											<h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
												{erro.titulo}
											</h3>

											<p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
												{erro.resumo}
											</p>
										</div>

										<div className="flex items-center gap-3 self-end md:self-center shrink-0">
											<span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
												{estaAberto ? "Ocultar detalhes" : "Ver diagnóstico & solução"}
											</span>
											<div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
												{estaAberto ? (
													<ChevronUp className="w-4 h-4" />
												) : (
													<ChevronDown className="w-4 h-4" />
												)}
											</div>
										</div>
									</div>

									{/* Conteúdo Expandido */}
									{estaAberto && (
										<div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-6">
											{/* Snippet do Log Serial */}
											<div>
												<div className="flex items-center justify-between mb-1.5">
													<span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
														<Terminal className="w-3.5 h-3.5" />
														Assinatura no Monitor Serial (Log Típico)
													</span>
													<button
														type="button"
														onClick={() =>
															copiarParaClipboard(erro.logSerial, `log-${erro.id}`)
														}
														className="text-xs text-slate-400 hover:text-slate-200 inline-flex items-center gap-1 cursor-pointer"
													>
														{copiadoId === `log-${erro.id}` ? (
															<>
																<Check className="w-3 h-3 text-emerald-400" />
																<span className="text-emerald-400 font-semibold">Copiado!</span>
															</>
														) : (
															<>
																<Copy className="w-3 h-3" />
																<span>Copiar log</span>
															</>
														)}
													</button>
												</div>
												<pre className="bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm p-3.5 rounded-2xl overflow-x-auto border border-slate-800 leading-relaxed">
													{erro.logSerial}
												</pre>
											</div>

											{/* Causa Raiz Técnica */}
											<div>
												<h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5 flex items-center gap-1.5">
													<Cpu className="w-4 h-4 text-amber-500" />
													Causa Raiz no Silício / RTOS / Hardware
												</h4>
												<p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
													{erro.causaRaiz}
												</p>
											</div>

											{/* Comparativo Didático: Gambiarra vs Solução de Engenharia */}
											<div className="grid md:grid-cols-2 gap-4">
												{/* Abordagem Incorreta (Gambiarra) */}
												<div className="p-4 sm:p-5 rounded-2xl bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-2">
													<div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold text-sm">
														<XCircle className="w-4 h-4 shrink-0" />
														<span>Abordagem Amadora ("Gambiarra")</span>
													</div>
													<p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
														{erro.gambiarra.titulo}
													</p>
													<p className="text-xs text-slate-600 dark:text-slate-400">
														{erro.gambiarra.descricao}
													</p>
													<div className="text-xs text-red-800 dark:text-red-300 bg-red-100/80 dark:bg-red-900/40 p-2.5 rounded-xl font-medium">
														<strong>Consequência:</strong> {erro.gambiarra.consequencia}
													</div>
												</div>

												{/* Solução de Engenharia (Boas Práticas) */}
												<div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
													<div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
														<CheckCircle2 className="w-4 h-4 shrink-0" />
														<span>Solução Profissional (Engenharia)</span>
													</div>
													<p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
														{erro.solucaoEngenharia.titulo}
													</p>
													<ul className="space-y-1.5 pt-1">
														{erro.solucaoEngenharia.passos.map((passo, idx) => (
															<li
																key={idx}
																className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5"
															>
																<span className="text-emerald-500 font-bold">✓</span>
																<span>{passo}</span>
															</li>
														))}
													</ul>
												</div>
											</div>

											{/* Bloco de Código (Arduino IDE vs ESP-IDF) */}
											<div className="space-y-2">
												<div className="flex flex-wrap items-center justify-between gap-2">
													<div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
														<button
															type="button"
															onClick={() => setLang(erro.id, "arduino")}
															className={`text-xs px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
																lang === "arduino"
																	? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs"
																	: "text-slate-600 dark:text-slate-400 hover:text-slate-900"
															}`}
														>
															Arduino C++
														</button>
														<button
															type="button"
															onClick={() => setLang(erro.id, "espidf")}
															className={`text-xs px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
																lang === "espidf"
																	? "bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-xs"
																	: "text-slate-600 dark:text-slate-400 hover:text-slate-900"
															}`}
														>
															ESP-IDF (C)
														</button>
														<button
															type="button"
															onClick={() => setLang(erro.id, "micropython")}
															className={`text-xs px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
																lang === "micropython"
																	? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs"
																	: "text-slate-600 dark:text-slate-400 hover:text-slate-900"
															}`}
														>
															MicroPython
														</button>
													</div>

													<button
														type="button"
														onClick={() =>
															copiarParaClipboard(codigoAtual, `code-${erro.id}`)
														}
														className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 inline-flex items-center gap-1.5 border border-slate-250 dark:border-slate-700 cursor-pointer font-medium"
													>
														{copiadoId === `code-${erro.id}` ? (
															<>
																<Check className="w-3.5 h-3.5 text-emerald-500" />
																<span className="text-emerald-500 font-semibold">Copiado!</span>
															</>
														) : (
															<>
																<Copy className="w-3.5 h-3.5" />
																<span>Copiar código</span>
															</>
														)}
													</button>
												</div>

												<pre className="bg-slate-950 text-slate-200 font-mono text-xs sm:text-sm p-4 rounded-2xl overflow-x-auto border border-slate-800 leading-relaxed">
													{codigoAtual}
												</pre>
											</div>

											{/* Dica Pro */}
											<div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
												<Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
												<p className="text-xs text-amber-900 dark:text-amber-200">
													<strong>Dica Pro de Engenharia:</strong> {erro.dicaPro}
												</p>
											</div>
										</div>
									)}
								</article>
							);
						})
					)}
				</section>

				{/* 4. CHECKLIST DE PREVENÇÃO EM HARDWARE E FIRMWARE */}
				<section className="mt-16 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
							<ShieldAlert className="w-6 h-6" />
						</div>
						<div>
							<h2 className="text-xl sm:text-2xl font-display font-bold">
								Checklist de Prevenção para Produção
							</h2>
							<p className="text-xs sm:text-sm text-slate-400">
								Itens essenciais para validar antes de enviar seu hardware ou firmware para campo.
							</p>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-6 text-xs sm:text-sm">
						<div className="space-y-3 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
							<h3 className="font-bold text-amber-400 uppercase tracking-wider text-xs flex items-center gap-2">
								<Zap className="w-4 h-4" /> Checklist de Hardware & Alimentação
							</h3>
							<ul className="space-y-2.5 text-slate-300">
								<li className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
									<span>Capacitor de 10µF ~ 100µF Low-ESR no VCC + cerâmico de 100nF próximo ao chip.</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
									<span>LDO dimensionado para suportar picos de corrente de no mínimo 600mA a 1A com folga térmica.</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
									<span>Nenhum periférico forçando níveis lógicos em Strapping Pins no momento do boot.</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
									<span>Capacitor de 10µF ou 1µF no pino EN (RST) para auto-reset estável no upload.</span>
								</li>
							</ul>
						</div>

						<div className="space-y-3 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
							<h3 className="font-bold text-purple-400 uppercase tracking-wider text-xs flex items-center gap-2">
								<Layers className="w-4 h-4" /> Checklist de Firmware & FreeRTOS
							</h3>
							<ul className="space-y-2.5 text-slate-300">
								<li className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
									<span>Todas as tarefas FreeRTOS cedem CPU através de vTaskDelay ou filas/semáforos.</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
									<span>Todas as ISRs decoradas com `IRAM_ATTR` e sem chamadas bloqueantes.</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
									<span>Sem uso contínuo de objetos `String` do Arduino em loops para evitar fragmentação de Heap.</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
									<span>Sincronização de horário SNTP antes de iniciar conexões criptografadas TLS/HTTPS.</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
