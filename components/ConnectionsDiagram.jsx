"use client";

import { useState, useEffect } from "react";

const FILTER_CATEGORIES = [
	{ id: "All", name: "Todos", color: "#64748b" },
	{ id: "Ground", name: "Terra (GND)", color: "#64748b" },
	{ id: "Power", name: "Alimentação", color: "#ef4444" },
	{ id: "RTC", name: "RTC", color: "#f59e0b" },
	{ id: "GPIO", name: "GPIO", color: "#22c55e" },
	{ id: "ADC", name: "ADC", color: "#ec4899" },
	{ id: "DAC", name: "DAC", color: "#a855f7" },
	{ id: "Touch", name: "Touch", color: "#06b6d4" },
	{ id: "UART", name: "UART", color: "#3b82f6" },
	{ id: "SPI", name: "SPI", color: "#ef4444" },
	{ id: "I2C", name: "I2C", color: "#10b981" },
	{ id: "PWM", name: "PWM", color: "#f97316" },
	{ id: "USB", name: "USB", color: "#8b5cf6" },
	{ id: "Clock", name: "Clock", color: "#eab308" },
	{ id: "JTAG", name: "JTAG", color: "#8b5cf6" },
	{ id: "Strapping", name: "Inicialização", color: "#dc2626" },
];

export default function ConnectionsDiagram({ connections, color }) {
	const [activeFilter, setActiveFilter] = useState("All");
	const [selectedConnection, setSelectedConnection] = useState(null);
	const [hoveredConnection, setHoveredConnection] = useState(null);

	const isConnectionVisible = (connection) => {
		if (activeFilter === "All") return true;
		return connection.categorias.includes(activeFilter);
	};

	const getCategoryColor = (category) => {
		const filter = FILTER_CATEGORIES.find((f) => f.id === category);
		return filter?.color || "#64748b";
	};

	useEffect(() => {
		const handleEscape = (e) => {
		if (e.key === "Escape") setSelectedConnection(null);
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

	if (!connections || connections.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 px-4">
				<div className="w-20 h-20 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
					<svg
						className="w-10 h-10 text-gray-400"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
					</svg>
				</div>

				<p className="text-lg font-medium text-gray-600">
					Diagrama de conexões indisponível
				</p>

				<p className="text-sm text-gray-500 mt-2">
					Este modelo ainda não possui dados de conexão
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-8 pb-8">
			<div className="space-y-3">
				<h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 flex items-center gap-3" style={{ borderColor: color }}>
					<span>📍</span>
					Diagrama de Conexões Interativo
				</h2>
				<p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
					Clique em qualquer conexão para ver informações detalhadas ou use filtros para destacar funções específicas.
				</p>
			</div>

			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center gap-3 mb-4">
					<svg
						className="w-5 h-5 text-gray-700"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
					</svg>

					<h4 className="text-lg font-semibold text-gray-900">
						Filtre por Função
					</h4>

					{activeFilter !== "All" && (
						<span className="ml-auto text-sm text-gray-600">
							{connections.filter(isConnectionVisible).length} de {connections.length} conexões
						</span>
					)}
				</div>

				<div className="flex flex-wrap gap-2.5">
					{FILTER_CATEGORIES.map((filter) => {
						const isActive = activeFilter === filter.id;
						return (
							<button
								key={filter.id}
								onClick={() => setActiveFilter(filter.id)}
								aria-pressed={isActive}
								aria-label={`Filter by ${filter.name}`}
								className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
								isActive
									? "shadow-lg transform scale-105 text-white"
									: "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md"
								}`}
								style={{
								backgroundColor: isActive ? filter.color : undefined,
								focusRingColor: filter.color,
								}}
							>
								{filter.name}
							</button>
						);
					})}
				</div>
			</div>

			<div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 shadow-inner">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
					{connections.map((connection, index) => {
						const visible = isConnectionVisible(connection);
						const isHovered = hoveredConnection === index;
						return (
							<button
								key={index}
								onClick={() => visible && setSelectedConnection(connection)}
								onMouseEnter={() => visible && setHoveredConnection(index)}
								onMouseLeave={() => setHoveredConnection(null)}
								disabled={!visible}
								aria-label={`Connection ${connection.nome}, number ${connection.numero}`}
								className={`relative flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all duration-300 ${
								visible
									? "opacity-100 hover:scale-110 hover:shadow-2xl hover:z-10 cursor-pointer active:scale-95"
									: "opacity-15 cursor-not-allowed grayscale"
								}`}
								style={{
									backgroundColor: visible ? connection.cor + "15" : "#f3f4f615",
									borderColor: visible ? (isHovered ? connection.cor : connection.cor + "60") : "#d1d5db",
									transform: isHovered ? "translateY(-2px)" : undefined,
								}}
							>
								<div
									className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3 shadow-lg ring-2 ring-white"
									style={{ backgroundColor: connection.cor }}
								>
									{typeof connection.numero === "number" 
										? connection.numero 
										: connection.numero.substring(0, 4)}
								</div>

								<div className="text-xs font-bold text-center text-gray-900 leading-tight">
									{connection.nome}
								</div>

								{connection.restricoes && (
									<div 
										className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1.5 shadow-lg"
										aria-label="Has restrictions"
									>
										<svg
											className="w-3.5 h-3.5 text-white"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
										</svg>
									</div>
								)}
							</button>
						);
					})}
				</div>
			</div>

			{connections.some(c => c.restricoes) && (
				<div className="bg-linear-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
					<div className="flex gap-4">
						<div className="shrink-0">
							<div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
								<svg
									className="w-6 h-6 text-amber-600"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
								</svg>
							</div>
						</div>

						<div className="flex-1">
							<p className="text-lg font-bold text-amber-900 mb-3">
								Informações Importantes
							</p>
							<ul className="space-y-2.5 text-sm text-amber-800">
								<li className="flex items-start gap-3">
									<span className="text-amber-600 mt-0.5 font-bold">•</span>
									<span className="leading-relaxed">
										Conexões com ícones de aviso possuem restrições de uso. Clique para mais detalhes.
									</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-amber-600 mt-0.5 font-bold">•</span>
									<span className="leading-relaxed">
										Sempre consulte o datasheet oficial antes de usar conexões com funções especiais.
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}

			{selectedConnection && (
				<div
					className="fixed inset-0 bg-opacity-80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn h-full"
					onClick={() => setSelectedConnection(null)}
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-title"
				>
					<div
						className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slideUp"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="sticky top-0 bg-linear-to-r from-white to-gray-50 border-b-2 border-gray-200 p-8">
							<div className="flex items-start justify-between gap-6">
								<div className="flex items-center gap-5 flex-1">
									<div
										className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl ring-4 ring-white shrink-0"
										style={{ backgroundColor: selectedConnection.cor }}
									>
										{typeof selectedConnection.numero === "number"
										? selectedConnection.numero
										: selectedConnection.numero.substring(0, 4)}
									</div>
									<div className="min-w-0">
										<h3 id="modal-title" className="text-3xl font-bold text-gray-900 mb-1">
											{selectedConnection.nome}
										</h3>
										<p className="text-base text-gray-600">
											Conexão {selectedConnection.numero}
										</p>
									</div>
								</div>

								<button
									onClick={() => setSelectedConnection(null)}
									aria-label="Close modal"
									className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl shrink-0"
								>
									<svg
										className="w-7 h-7"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
						</div>

						<div className="flex-1 overflow-y-auto p-8 space-y-8">
							<div>
								<h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
										<path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
									</svg>
									Categorias
								</h4>

								<div className="flex flex-wrap gap-2.5">
								{selectedConnection.categorias.map((cat) => (
									<span
										key={cat}
										className="px-4 py-2 rounded-xl text-sm font-bold text-white shadow-md ring-2 ring-white"
										style={{ backgroundColor: getCategoryColor(cat) }}
									>{cat}</span>
								))}
							</div>
						</div>

						<div>
							<h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
								</svg>
								Funções da Conexão
							</h4>

							<div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
								<ul className="space-y-3">
									{selectedConnection.funcoes.map((func, index) => (
									<li key={index} className="flex items-start gap-4 text-sm group">
										<span
										className="mt-1 shrink-0 w-2 h-2 rounded-full group-hover:scale-125 transition-transform"
										style={{ backgroundColor: color }}
										/>
										<span className="text-gray-800 font-medium leading-relaxed">{func}</span>
									</li>
									))}
								</ul>
							</div>
						</div>

						{selectedConnection.restricoes && (
							<div className="bg-linear-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl p-6 shadow-sm">
								<div className="flex gap-4">
									<div className="shrink-0">
										<div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
											<svg
												className="w-6 h-6 text-red-600"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
											</svg>
										</div>
									</div>
									<div className="flex-1">
										<p className="text-lg font-bold text-red-900 mb-3">
											Alertas Importantes
										</p>
										<p className="text-sm text-red-800 leading-relaxed">
											{selectedConnection.restricoes}
										</p>
									</div>
								</div>
							</div>
						)}
						</div>

						<div className="sticky bottom-0 bg-linear-to-t from-gray-50 to-white border-t-2 border-gray-200 p-6">
							<button
								onClick={() => setSelectedConnection(null)}
								className="w-full py-4 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2"
								style={{ backgroundColor: color }}
								aria-label="Close modal"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
				<h3 className="text-lg font-bold text-gray-800 mb-3">Sobre a Matriz de Conexões Flexível</h3>
				<p className="text-gray-700 leading-relaxed">
					O ESP32 possui uma matriz de conexões flexível que permite mapear diversas funções para múltiplos pinos.
					Isso significa que muitas conexões podem ser configuradas para desempenhar diferentes papéis, dependendo das necessidades do seu projeto.
					Consulte a documentação oficial para entender como aproveitar ao máximo essa flexibilidade.
				</p>
			</div>

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