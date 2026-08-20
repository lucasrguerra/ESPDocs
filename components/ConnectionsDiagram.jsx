"use client";

import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { 
	Search, 
	X, 
	Grid, 
	List, 
	Filter, 
	AlertTriangle, 
	Info, 
	Tag, 
	Zap, 
	Sliders,
	CheckCircle,
	ExternalLink
} from "lucide-react";

const FILTER_CATEGORIES = [
	{ id: "All", name: "Todos", color: "#8b5cf6" }, // purple
	{ id: "GND", name: "Terra (GND)", color: "#64748b" }, // slate
	{ id: "Power", name: "Alimentação", color: "#ef4444" }, // red
	{ id: "GPIO", name: "GPIO", color: "#22c55e" }, // green
	{ id: "Low Power", name: "GPIO LP", color: "#f59e0b" }, // amber
	{ id: "ADC", name: "ADC", color: "#ec4899" }, // pink
	{ id: "DAC", name: "DAC", color: "#a855f7" }, // purple
	{ id: "Touch", name: "Touch", color: "#06b6d4" }, // cyan
	{ id: "UART", name: "UART", color: "#3b82f6" }, // blue
	{ id: "SPI", name: "SPI", color: "#f43f5e" }, // rose
	{ id: "USB", name: "USB", color: "#a855f7" }, // purple
	{ id: "Clock", name: "Clock", color: "#eab308" }, // yellow
	{ id: "JTAG", name: "JTAG", color: "#6366f1" }, // indigo
	{ id: "Strapping", name: "Inicialização", color: "#dc2626" }, // red
	{ id: "DSI", name: "Display (DSI)", color: "#f97316" }, // orange
	{ id: "CSI", name: "Câmera (CSI)", color: "#14b8a6" }, // teal
	{ id: "Ethernet", name: "Ethernet", color: "#0284c7" }, // sky
	{ id: "SD", name: "Cartão SD", color: "#10b981" }, // emerald
	{ id: "I2C", name: "I2C", color: "#f59e0b" }, // amber
	{ id: "Antena", name: "Antena", color: "#06b6d4" }, // cyan
];

const type_colors = {
	power: "#ef4444", // high-voltage red
	ground: "#64748b", // slate gray
	io: "#22c55e", // laser green
	analog: "#ec4899", // dynamic pink
	dedicated: "#3b82f6", // electric blue
	nc: "#94a3b8", // muted gray
};

export default function ConnectionsDiagram({ connections, serie }) {
	const [activeFilter, setActiveFilter] = useState("All");
	const [selectedConnection, setSelectedConnection] = useState(null);
	const [hoveredConnection, setHoveredConnection] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [viewMode, setViewMode] = useState("grid");
	const [showTooltip, setShowTooltip] = useState(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isConnectionVisible = (connection) => {
		const matchesFilter = activeFilter === "All" || connection.categorias.includes(activeFilter);
		const matchesSearch = searchQuery === "" || 
			connection.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
			connection.numero.toString().toLowerCase().includes(searchQuery.toLowerCase());
		return matchesFilter && matchesSearch;
	};

	const getCategoryColor = (category) => {
		const filter = FILTER_CATEGORIES.find((f) => f.id === category);
		return filter?.color || "#64748b";
	};

	const visibleConnections = useMemo(() => {
		return connections.filter(isConnectionVisible);
	}, [connections, activeFilter, searchQuery]);

	const activeCategories = useMemo(() => {
		if (activeFilter === "All") return [];
		return FILTER_CATEGORIES.filter(cat => 
			visibleConnections.some(conn => conn.categorias.includes(cat.id))
		);
	}, [visibleConnections, activeFilter]);

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") {
				setSelectedConnection(null);
				setShowTooltip(null);
			}
		};
		
		if (selectedConnection) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}
		
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [selectedConnection]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (selectedConnection) return;
			
			if (e.key === "Tab") {
				const buttons = document.querySelectorAll('[data-connection-button]');
				const currentIndex = Array.from(buttons).findIndex(btn => btn === document.activeElement);
				
				if (e.shiftKey && currentIndex > 0) {
					e.preventDefault();
					buttons[currentIndex - 1].focus();
				} else if (!e.shiftKey && currentIndex < buttons.length - 1) {
					e.preventDefault();
					buttons[currentIndex + 1].focus();
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [selectedConnection]);

	if (!connections || connections.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 px-4">
				<div className="w-20 h-20 mb-6 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center shadow-lg">
					<Sliders className="w-10 h-10 text-slate-500 dark:text-slate-400" />
				</div>

				<p className="text-lg font-bold text-slate-800 dark:text-slate-200">
					Diagrama de conexões indisponível
				</p>

				<p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
					Este modelo ainda não possui um mapa detalhado de conexões e barramentos.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-8 pb-8">
			
			{/* Header info */}
			<div className="space-y-3">
				<h2 className="text-xl font-bold text-slate-850 dark:text-slate-100 mb-4 pb-3 border-b border-slate-300 dark:border-slate-800/65 flex items-center gap-3 select-none">
					<Sliders className="w-5 h-5" style={{ color: serie.color }} />
					<span>Diagrama de Conexões Interativo</span>
				</h2>
				<p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
					Explore todas as conexões e multiplexação do SoC do {serie.nome_completo}. Utilize o painel de busca rápida ou filtre por categoria para acender conexões específicas e ver mapas de barramentos.
				</p>
			</div>

			{/* Search Panel */}
			<div className="bg-white/60 dark:bg-slate-900/30 backdrop-blur-xl rounded-2xl border border-slate-300 dark:border-slate-800/80 p-5 space-y-4 shadow-xl">
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="flex-1 relative">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 dark:text-slate-400" />
						<input
							type="text"
							placeholder="Buscar por nome ou número da conexão (Ex: GPIO1, TXD, XTAL)..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950/40 focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/10 text-slate-800 dark:text-slate-200 transition-all outline-none text-sm font-semibold"
							aria-label="Search connections"
						/>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery("")}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
								aria-label="Clear search"
							>
								<X className="w-4 h-4" />
							</button>
						)}
					</div>

					{/* View Mode Toggle */}
					<div className="flex gap-1.5 bg-slate-100 dark:bg-slate-950/80 rounded-xl p-1 shrink-0 border border-slate-250/30 dark:border-slate-850/30">
						<button
							onClick={() => setViewMode("grid")}
							className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-95 ${
								viewMode === "grid"
									? "bg-white dark:bg-slate-900 shadow-md text-slate-900 dark:text-slate-100"
									: "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
							}`}
							aria-label="Grid view"
							aria-pressed={viewMode === "grid"}
						>
							<Grid className="w-3.5 h-3.5" />
							<span>Grade</span>
						</button>
						
						<button
							onClick={() => setViewMode("list")}
							className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-95 ${
								viewMode === "list"
									? "bg-white dark:bg-slate-900 shadow-md text-slate-900 dark:text-slate-100"
									: "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
							}`}
							aria-label="List view"
							aria-pressed={viewMode === "list"}
						>
							<List className="w-3.5 h-3.5" />
							<span>Lista</span>
						</button>
					</div>
				</div>
			</div>

			{/* Filters Panel */}
			<div className="bg-white/60 dark:bg-slate-900/30 backdrop-blur-xl rounded-2xl border border-slate-300 dark:border-slate-800/80 p-5 shadow-xl">
				<div className="flex items-center gap-3 mb-5 border-b border-slate-150/40 dark:border-slate-850/45 pb-3">
					<Filter className="w-4 h-4 text-purple-500" />
					<h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 select-none">
						Filtre por Função do Pino
					</h4>

					<span className="ml-auto text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-3 py-1 rounded-full border border-slate-300 dark:border-slate-850/30 shadow-xs select-none">
						{visibleConnections.length} de {connections.length} ativos
					</span>
				</div>

				<div className="flex flex-wrap gap-2">
					{FILTER_CATEGORIES.map((filter) => {
						const isActive = activeFilter === filter.id;
						const count = connections.filter(c => 
							filter.id === "All" ? true : c.categorias.includes(filter.id)
						).length;
						
						if (count === 0 && !isActive) return null; // Hide filters that don't apply to this chip
						
						return (
							<button
								key={filter.id}
								onClick={() => setActiveFilter(filter.id)}
								aria-pressed={isActive}
								aria-label={`Filter by ${filter.name}`}
								className={`group relative px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 focus:outline-none cursor-pointer active:scale-95 ${
									isActive
										? "shadow-lg text-white"
										: "bg-slate-50/70 dark:bg-slate-950/20 text-slate-650 dark:text-slate-350 hover:bg-slate-100/50 dark:hover:bg-slate-850/30 border border-slate-300 dark:border-slate-850/40"
								}`}
								style={{
									backgroundColor: isActive ? filter.color : undefined,
									boxShadow: isActive ? `0 8px 15px -8px ${filter.color}` : undefined
								}}
							>
								<span className="flex items-center gap-2">
									<span>{filter.name}</span>
									<span className={`text-[9px] px-1.5 py-0.5 rounded-full shrink-0 font-bold ${
										isActive ? "bg-white/20 text-white" : "bg-slate-200/50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
									}`}>
										{count}
									</span>
								</span>
							</button>
						);
					})}
				</div>

				{/* Active Categories badges */}
				{activeFilter !== "All" && activeCategories.length > 0 && (
					<div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-850/40 select-none">
						<p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">Subcategorias ativadas por esse filtro:</p>
						<div className="flex flex-wrap gap-2">
							{activeCategories.map(cat => (
								<span
									key={cat.id}
									className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold text-white shadow-xs"
									style={{ backgroundColor: cat.color }}
								>
									<span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>
									<span>{cat.name}</span>
								</span>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Diagram Workspace */}
			{visibleConnections.length === 0 ? (
				<div className="bg-slate-50/50 dark:bg-slate-900/10 backdrop-blur-xl rounded-2xl p-12 border-2 border-dashed border-slate-300 dark:border-slate-850/80 text-center shadow-inner">
					<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center shadow-md">
						<Search className="w-6 h-6 text-slate-400" />
					</div>
					<p className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1 select-none">Nenhuma conexão encontrada</p>
					<p className="text-xs text-slate-500 dark:text-slate-400">Tente ajustar seus termos de pesquisa ou limpe os filtros rápidos.</p>
					
					<button
						onClick={() => {
							setActiveFilter("All");
							setSearchQuery("");
						}}
						className="mt-5 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-all font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-95 shadow-lg"
					>
						Limpar Filtros e Busca
					</button>
				</div>
			) : viewMode === "grid" ? (
				/* Grid View Mode: Futuristic Electronic Chip Sockets */
				<div className="bg-slate-100/50 dark:bg-slate-950/20 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-300 dark:border-slate-850/60 shadow-inner">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
						{visibleConnections.map((connection, index) => {
							const isHovered = hoveredConnection === index;
							const connectionId = `connection-${index}`;
							const baseColor = type_colors[connection.tipo] || "#94a3b8";
							
							return (
								<div key={index} className="relative">
									<button
										id={connectionId}
										data-connection-button
										onClick={() => setSelectedConnection(connection)}
										onMouseEnter={() => {
											setHoveredConnection(index);
											setShowTooltip(index);
										}}
										onMouseLeave={() => {
											setHoveredConnection(null);
											setShowTooltip(null);
										}}
										onFocus={() => setHoveredConnection(index)}
										onBlur={() => setHoveredConnection(null)}
										aria-label={`Pino ${connection.nome}, número ${connection.numero}`}
										aria-describedby={showTooltip === index ? `tooltip-${index}` : undefined}
										className="w-full flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none"
										style={{
											backgroundColor: isHovered ? `${baseColor}24` : `${baseColor}0c`,
											borderColor: isHovered ? baseColor : `${baseColor}40`,
											boxShadow: isHovered ? `0 0 20px -5px ${baseColor}60` : 'none',
											transform: isHovered ? "translateY(-4px)" : undefined,
										}}
									>
										{/* Pad Contact Core Circle */}
										<div
											className="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-xs mb-3 shadow-lg select-none"
											style={{ backgroundColor: baseColor, boxShadow: `0 4px 10px -3px ${baseColor}` }}
										>
											{typeof connection.numero === "number" 
												? connection.numero 
												: connection.numero.substring(0, 4)}
										</div>

										{/* Pad Name label */}
										<div className="text-xs font-bold text-center text-slate-850 dark:text-slate-200 leading-tight mb-2 select-none group-hover:text-purple-600 transition-colors">
											{connection.nome}
										</div>

										{/* Small Category dots indicator */}
										<div className="flex flex-wrap gap-1 justify-center select-none">
											{connection.categorias.slice(0, 5).map((cat) => (
												<span
													key={cat}
													className="w-1.5 h-1.5 rounded-full shrink-0"
													style={{ backgroundColor: getCategoryColor(cat) }}
													title={cat === "Strapping" ? "Inicialização" : cat}
												/>
											))}
											{connection.categorias.length > 5 && (
												<span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold ml-0.5 leading-none">
													+{connection.categorias.length - 5}
												</span>
											)}
										</div>

										{/* High-Voltage warnings tags */}
										{connection.avisos && (
											<div 
												className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg ring-2 ring-white dark:ring-slate-950 animate-pulse"
												aria-label="Possui restrições de uso"
											>
												<AlertTriangle className="w-3 h-3" />
											</div>
										)}
									</button>

									{/* Sleek Tooltip Popover */}
									{showTooltip === index && (
										<div
											id={`tooltip-${index}`}
											role="tooltip"
											className="absolute z-40 bottom-full left-1/2 -translate-x-1/2 mb-3 p-3 bg-slate-950/90 dark:bg-slate-900/90 backdrop-blur-md text-white text-[10px] rounded-xl shadow-2xl max-w-xs pointer-events-none animate-fadeIn border border-slate-850/50"
											style={{ minWidth: "180px" }}
										>
											<div className="font-extrabold text-sm mb-1">{connection.nome}</div>
											<div className="text-slate-400 mb-2 font-semibold">Pino Físico {connection.numero}</div>
											<div className="flex flex-wrap gap-1 mb-2">
												{connection.categorias.map((cat) => (
													<span
														key={cat}
														className="px-1.5 py-0.5 rounded text-[8px] font-bold"
														style={{ 
															backgroundColor: `${getCategoryColor(cat)}24`,
															color: getCategoryColor(cat)
														}}
													>
														{cat === "Strapping" ? "Inicialização" : cat}
													</span>
												))}
											</div>
											<div className="text-purple-400 font-bold text-[9px] uppercase tracking-wider">Clique para detalhes</div>
											<div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-950/95 dark:border-t-slate-900/95"></div>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			) : (
				/* List View Mode: Interactive Zebra Table */
				<div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-300 dark:border-slate-800/80 overflow-hidden shadow-xl">
					<div className="overflow-x-auto scrollbar-thin">
						<table className="w-full text-left">
							<thead>
								<tr className="bg-slate-100/50 dark:bg-slate-950/50 border-b border-slate-300 dark:border-slate-850/60 select-none">
									<th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Pino</th>
									<th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Nome do Pad</th>
									<th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Categorias</th>
									<th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Multiplexação de Funções</th>
									<th className="px-6 py-4 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Restrições</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100 dark:divide-slate-850/30">
								{visibleConnections.map((connection, index) => {
									const baseColor = type_colors[connection.tipo] || "#94a3b8";
									return (
										<tr
											key={index}
											onClick={() => setSelectedConnection(connection)}
											className="hover:bg-purple-500/5 dark:hover:bg-purple-400/5 cursor-pointer transition-colors group"
										>
											<td className="px-6 py-4 whitespace-nowrap">
												<div
													className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-xs shadow-md select-none"
													style={{ backgroundColor: baseColor }}
												>
													{typeof connection.numero === "number" 
														? connection.numero 
														: connection.numero.substring(0, 4)}
												</div>
											</td>
											
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
													{connection.nome}
												</div>
											</td>
											
											<td className="px-6 py-4">
												<div className="flex flex-wrap gap-1.5 select-none">
													{connection.categorias.map((cat) => (
														<span
															key={cat}
															className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold text-white shadow-xs"
															style={{ backgroundColor: getCategoryColor(cat) }}
														>
															{cat === "Strapping" ? "Inicialização" : cat}
														</span>
													))}
												</div>
											</td>
											
											<td className="px-6 py-4">
												<div className="text-xs text-slate-500 dark:text-slate-400 font-semibold max-w-md line-clamp-2 leading-relaxed">
													{connection.funcoes.join(", ")}
												</div>
											</td>
											
											<td className="px-6 py-4 text-center whitespace-nowrap">
												{connection.avisos ? (
													<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase border border-red-500/20 select-none">
														<AlertTriangle className="w-3.5 h-3.5 shrink-0" />
														<span>Restrito</span>
													</span>
												) : (
													<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/20 select-none">
														<CheckCircle className="w-3.5 h-3.5 shrink-0" />
														<span>Livre</span>
													</span>
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* Global Warning notice */}
			{connections.some(c => c.avisos) && (
				<div className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-2xl p-6 shadow-sm select-none">
					<div className="flex gap-4">
						<div className="shrink-0">
							<div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
								<AlertTriangle className="w-6 h-6" />
							</div>
						</div>

						<div className="flex-1">
							<p className="text-base font-bold text-amber-850 dark:text-amber-300 mb-1">
								Notas Importantes sobre a Pinagem
							</p>
							<ul className="space-y-1.5 text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
								<li>• Pinos contendo tags de <strong>Avisos/Restrições</strong> (cor vermelha) possuem papéis especiais de Strapping na inicialização, ou limitações analógicas. Clique neles para ver detalhes.</li>
								<li>• Sempre garanta isolamento de circuitos capacitivos de toque em pinos com ruído de RF acoplado.</li>
							</ul>
						</div>
					</div>
				</div>
			)}

			{/* Interactive Overlay Dialog Details Sheet */}
			{selectedConnection && mounted && createPortal(
				<div
					className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
					onClick={() => setSelectedConnection(null)}
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-title"
				>
					<div
						className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-300 dark:border-slate-800/80 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-slideUp"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Dialog Header */}
						<div className="sticky top-0 bg-white/50 dark:bg-slate-950/50 border-b border-slate-300 dark:border-slate-850/60 p-6 md:p-8 z-10">
							<div className="flex items-start justify-between gap-6">
								<div className="flex items-center gap-4 flex-1">
									<div
										className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-xl shrink-0"
										style={{ backgroundColor: type_colors[selectedConnection.tipo] || "#64748b" }}
									>
										{typeof selectedConnection.numero === "number"
											? selectedConnection.numero
											: selectedConnection.numero.substring(0, 4)}
									</div>
									<div className="min-w-0">
										<h3 id="modal-title" className="text-2xl font-display font-extrabold text-slate-850 dark:text-slate-100 mb-1 leading-none tracking-tight">
											{selectedConnection.nome}
										</h3>
										<p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
											Pino Físico {selectedConnection.numero}
										</p>
									</div>
								</div>

								<button
									onClick={() => setSelectedConnection(null)}
									aria-label="Fechar"
									className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-2 bg-slate-100 dark:bg-slate-900 rounded-xl shrink-0 cursor-pointer active:scale-95"
								>
									<X className="w-5 h-5" />
								</button>
							</div>
						</div>

						{/* Dialog Body Contents */}
						<div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin">
							
							{/* Categories */}
							{selectedConnection.categorias.length > 0 && (
								<div>
									<h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2 select-none">
										<Tag className="w-4 h-4 text-purple-500" />
										<span>Categorias de Multiplexação</span>
									</h4>

									<div className="flex flex-wrap gap-2">
										{selectedConnection.categorias.map((cat) => (
											<span
												key={cat}
												className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-md select-none"
												style={{ backgroundColor: getCategoryColor(cat) }}
											>
												{cat === "Strapping" ? "Inicialização" : cat}
											</span>
										))}
									</div>
								</div>
							)}

							{/* Power Source */}
							{selectedConnection.alimentacao && (
								<div>
									<h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2 select-none">
										<Zap className="w-4 h-4 text-red-500" />
										<span>Domínio de Alimentação Interna</span>
									</h4>
									<div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl p-5 border border-slate-300 dark:border-slate-850/50">
										<ul className="space-y-2.5">
											{selectedConnection.alimentacao.map((source, index) => (
												<li key={index} className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
													<span
														className="shrink-0 w-2 h-2 rounded-full"
														style={{ backgroundColor: type_colors["power"] }}
													/>
													<span>{source}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							)}

							{/* Function Multiplexation */}
							<div>
								<h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2 select-none">
									<Sliders className="w-4 h-4 text-emerald-500" />
									<span>Barramentos de Funções Disponíveis</span>
								</h4>

								<div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl p-5 border border-slate-300 dark:border-slate-850/50">
									<ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{selectedConnection.funcoes.map((func, index) => (
											<li key={index} className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
												<span
													className="shrink-0 w-2 h-2 rounded-full"
													style={{ backgroundColor: type_colors[selectedConnection.tipo] || "#64748b" }}
												/>
												<span>{func}</span>
											</li>
										))}
									</ul>
								</div>
							</div>

							{/* Alerts/Warnings */}
							{selectedConnection.avisos && (
								<div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 shadow-xs">
									<div className="flex gap-4">
										<div className="shrink-0">
											<div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center text-red-500">
												<AlertTriangle className="w-5 h-5" />
											</div>
										</div>
										<div className="flex-1">
											<p className="text-sm font-bold text-red-900 dark:text-red-300 mb-2">
												Avisos Importantes de Engenharia
											</p>
											{selectedConnection.avisos.map((aviso, index) => (
												<div key={index} className="flex items-start gap-2.5 mb-1.5 text-xs text-red-800 dark:text-red-400 font-semibold leading-relaxed">
													<span>•</span>
													<span>{aviso}</span>
												</div>
											))}
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Dialog Footer */}
						<div className="sticky bottom-0 bg-white/50 dark:bg-slate-950/50 border-t border-slate-300 dark:border-slate-850/60 p-5">
							<button
								onClick={() => setSelectedConnection(null)}
								className="w-full py-3.5 rounded-xl font-bold text-white text-xs uppercase tracking-wider shadow-lg hover:opacity-90 active:scale-98 transition-all cursor-pointer"
								style={{ 
									backgroundColor: serie.color, 
									boxShadow: `0 8px 25px -8px ${serie.color}` 
								}}
								aria-label="Close modal"
							>
								Confirmar e Fechar
							</button>
						</div>
					</div>
				</div>,
				document.body
			)}

			<style jsx>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
				
				@keyframes slideUp {
					from {
						transform: translateY(20px);
						opacity: 0;
					}
					to {
						transform: translateY(0);
						opacity: 1;
					}
				}
				
				.animate-fadeIn {
					animation: fadeIn 0.2s ease-out;
				}
				
				.animate-slideUp {
					animation: slideUp 0.3s ease-out;
				}
			`}</style>
		</div>
	);
}