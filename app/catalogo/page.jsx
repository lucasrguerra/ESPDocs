"use client";

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BoardCard from "@/components/BoardCard";
import { 
	Search, 
	Filter, 
	ShoppingCart, 
	CheckCircle, 
	AlertTriangle, 
	RefreshCw,
	Layers,
	ChevronDown
} from 'lucide-react';

export default function PlacasPage() {
	const [boards, setBoards] = useState([]);
	const [filteredBoards, setFilteredBoards] = useState([]);
	const [headers, setHeaders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [activeFilters, setActiveFilters] = useState({});
	const [filterOptions, setFilterOptions] = useState({});

	const excludedColumns = ['Nome', 'Link', 'Imagem', 'Loja Oficial'];

	useEffect(() => {
		fetchBoards();
	}, []);

	useEffect(() => {
		applyFilters();
	}, [boards, searchTerm, activeFilters]);

	const fetchBoards = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/placas');
			
			if (!response.ok) {
				throw new Error('Erro ao carregar dados das placas');
			}

			const result = await response.json();
			setBoards(result.data);
			setHeaders(result.headers);
			setFilteredBoards(result.data);
			
			generateFilterOptions(result.data, result.headers);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const generateFilterOptions = (data, headers) => {
		const options = {};
		const filterableColumns = headers.filter(h => !excludedColumns.includes(h));

		filterableColumns.forEach(column => {
			const uniqueValues = new Set();
			data.forEach(item => {
				const value = item[column];
				if (value && value.toString().trim()) {
					uniqueValues.add(value.toString().trim());
				}
			});
			
			const values = Array.from(uniqueValues).sort();
			
			// Verificar se é um filtro binário (apenas Sim/Não/Opcional)
			const binaryValues = ['Sim', 'Não', 'Opcional'];
			const isBinaryFilter = values.every(v => binaryValues.includes(v));
			
			options[column] = {
				values: values,
				isBinary: isBinaryFilter
			};
		});

		setFilterOptions(options);
	};

	const applyFilters = () => {
		let filtered = [...boards];

		if (searchTerm) {
			filtered = filtered.filter(board => {
				const searchLower = searchTerm.toLowerCase();
				return (
					board.Nome?.toLowerCase().includes(searchLower) ||
					board.Descrição?.toLowerCase().includes(searchLower)
				);
			});
		}

		Object.keys(activeFilters).forEach(column => {
			if (activeFilters[column] && activeFilters[column].length > 0) {
				filtered = filtered.filter(board => {
					const boardValue = board[column]?.toString().trim();
					
					// Para filtros binários, o valor armazenado é 'binary-enabled'
					if (activeFilters[column].includes('binary-enabled')) {
						return boardValue === 'Sim' || boardValue === 'Opcional';
					}
					
					return activeFilters[column].includes(boardValue);
				});
			}
		});

		setFilteredBoards(filtered);
	};

	const handleFilterToggle = (column, value) => {
		setActiveFilters(prev => {
			const newFilters = { ...prev };
			
			if (!newFilters[column]) {
				newFilters[column] = [value];
			} else {
				const index = newFilters[column].indexOf(value);
				if (index > -1) {
					// Remove o valor
					newFilters[column] = newFilters[column].filter(v => v !== value);
					if (newFilters[column].length === 0) {
						delete newFilters[column];
					}
				} else {
					// Adiciona o valor
					newFilters[column] = [...newFilters[column], value];
				}
			}

			return newFilters;
		});
	};

	const clearFilters = () => {
		setActiveFilters({});
		setSearchTerm('');
	};

	const activeFilterCount = Object.keys(activeFilters).length + (searchTerm ? 1 : 0);

	if (loading) {
		return (
			<div className="bg-gradient-to-br from-slate-50 via-white to-purple-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 flex flex-col justify-between">
				<Header />

				<main className="max-w-7xl mx-auto px-6 py-24 flex-1 flex items-center justify-center">
					<div className="text-center select-none animate-pulse">
						<RefreshCw className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
						<p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Consultando banco de placas...</p>
					</div>
				</main>

				<Footer />
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-gradient-to-br from-slate-50 via-white to-purple-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 flex flex-col justify-between">
				<Header />

				<main className="max-w-7xl mx-auto px-6 py-24 flex-1 flex items-center justify-center">
					<div className="text-center bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 max-w-md shadow-2xl select-none">
						<div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-4">
							<AlertTriangle className="w-6 h-6" />
						</div>
						<p className="text-sm font-bold text-red-600 dark:text-red-400 mb-2 uppercase tracking-widest">Falha ao sincronizar dados</p>
						<p className="text-xs text-slate-450 dark:text-slate-550 mb-6 leading-relaxed">{error}</p>

						<button
							onClick={fetchBoards}
							className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
						>
							<RefreshCw className="w-4 h-4" />
							<span>Tentar Novamente</span>
						</button>
					</div>
				</main>

				<Footer />
			</div>
		);
	}

	const filterableColumns = headers.filter(h => !excludedColumns.includes(h));

	return (
		<div className="bg-gradient-to-br from-slate-50 via-white to-purple-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<Header />

			<main id="conteudo" className="max-w-7xl mx-auto px-6 pt-16 pb-24">
				{/* Top Hero Heading Block */}
				<section className="text-center mb-16 select-none">
					<div className="inline-flex items-center gap-2 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-slate-200/60 dark:border-slate-800/60 shadow-xs">
						<ShoppingCart className="w-4 h-4 text-purple-500" />
						<span className="text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider">Encontre sua placa ideal</span>
					</div>
					
					<h1 className="text-4xl md:text-6xl font-display leading-tight font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 tracking-tight">
						Catálogo de Placas ESP32
					</h1>

					<p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-6 font-semibold">
						Compare e selecione placas oficiais e alternativas de desenvolvimento do microcontrolador ESP32 para seus projetos.
					</p>

					<div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20">
						<CheckCircle className="w-4 h-4 shrink-0" />
						<p className="text-[10px] font-bold uppercase tracking-wider">
							Links de lojas integradas de fontes verificadas e confiáveis
						</p>
					</div>
				</section>

				<div className="grid lg:grid-cols-4 gap-8">
					{/* Left Filters Sidebar */}
					<div className="lg:col-span-1">
						<div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 rounded-3xl shadow-xl overflow-hidden sticky top-4">
							
							{/* Sidebar Banner Header */}
							<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white select-none">
								<div className="flex justify-between items-center">
									<div>
										<h2 className="text-base font-display font-extrabold flex items-center gap-2">
											<Filter className="w-4.5 h-4.5" />
											<span>Filtros de Busca</span>
										</h2>
										{activeFilterCount > 0 && (
											<p className="text-[10px] text-blue-150 font-bold uppercase tracking-wider mt-1.5 animate-pulse">
												{activeFilterCount} selecionado(s)
											</p>
										)}
									</div>
									
									{activeFilterCount > 0 && (
										<button
											onClick={clearFilters}
											className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer"
										>
											Limpar
										</button>
									)}
								</div>
							</div>

							{/* Sidebar Filters Area */}
							<div className="p-6 space-y-6">
								{/* Text search by name */}
								<div>
									<label className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-2.5 uppercase tracking-widest select-none">
										Buscar Placa
									</label>
									<div className="relative">
										<input
											type="text"
											placeholder="Digite o nome da placa..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="w-full px-4 py-3 pl-10 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-500 focus:outline-none transition-colors text-xs bg-slate-50/50 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100"
										/>
										<Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
									</div>
								</div>

								<div className="border-t border-slate-100 dark:border-slate-850/45 my-2"></div>

								{/* Dinamic filters container with customized scrollbar */}
								<div className="space-y-4 max-h-[calc(100vh-450px)] overflow-y-auto pr-2 custom-scrollbar">
									{filterableColumns.map((column) => {
										const filterData = filterOptions[column];
										if (!filterData) return null;
										
										const isActive = activeFilters[column]?.length > 0;
										
										return (
											<div key={column} className={`pb-3 border-b border-slate-100 dark:border-slate-850/30 last:border-b-0 ${isActive ? 'bg-purple-500/5 dark:bg-purple-400/5 p-3 rounded-2xl border border-purple-500/10 dark:border-purple-400/10' : ''}`}>
												{filterData.isBinary ? (
													// Binary filter (checkbox inside title wrapper)
													<label className="flex justify-between items-center cursor-pointer p-1 rounded-lg transition-all group select-none">
														<span className="text-xs font-bold text-slate-700 dark:text-slate-350 group-hover:text-purple-650 dark:group-hover:text-purple-400 transition-colors">
															{column}
														</span>

														<input
															type="checkbox"
															checked={activeFilters[column]?.includes('binary-enabled') || false}
															onChange={() => handleFilterToggle(column, 'binary-enabled')}
															className="w-4.5 h-4.5 rounded-md border border-slate-300 dark:border-slate-750 text-purple-650 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all cursor-pointer bg-white/50 dark:bg-slate-950/30"
														/>
													</label>
												) : (
													// Standard options filter with dropdown listing
													<>
														<h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3.5 text-xs uppercase tracking-widest flex items-center gap-2 select-none">
															<span>{column}</span>
															{isActive && (
																<span className="bg-purple-650 text-white text-[9px] px-2 py-0.5 rounded-full font-bold select-none">
																	{activeFilters[column].length}
																</span>
															)}
														</h3>
														
														<div className="space-y-2.5 max-h-44 overflow-y-auto pr-2 custom-scrollbar">
															{filterData.values.map((option) => (
																<label
																	key={option}
																	className="flex items-center gap-3 cursor-pointer hover:bg-purple-500/5 dark:hover:bg-purple-400/5 p-1.5 rounded-lg transition-all group select-none"
																>
																	<input
																		type="checkbox"
																		checked={activeFilters[column]?.includes(option) || false}
																		onChange={() => handleFilterToggle(column, option)}
																		className="w-4 h-4 rounded border border-slate-350 dark:border-slate-750 text-purple-650 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all cursor-pointer bg-white/50 dark:bg-slate-950/30"
																	/>
																	<span className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-purple-650 dark:group-hover:text-purple-400 transition-colors">
																		{option}
																	</span>
																</label>
															))}
														</div>
													</>
												)}
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>

					{/* Right Catalog Boards Grid */}
					<div className="lg:col-span-3">
						<div className="mb-6 flex justify-between items-center select-none">
							<p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
								Total Encontrado: <span className="text-purple-650 dark:text-purple-400">{filteredBoards.length}</span> Placa(s)
							</p>
						</div>

						{filteredBoards.length === 0 ? (
							<div className="text-center py-20 bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 shadow-md select-none">
								<Search className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
								<p className="text-base font-display font-extrabold text-slate-800 dark:text-slate-200 mb-1">Nenhuma Placa Correspondente</p>
								<p className="text-xs text-slate-500 dark:text-slate-400">Tente ajustar ou redefinir seus filtros laterais para expandir a busca.</p>
							</div>
						) : (
							<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
								{filteredBoards.map((board, index) => (
									<BoardCard key={index} board={board} />
								))}
							</div>
						)}
					</div>
				</div>
			</main>

			<Footer />

			<style dangerouslySetInnerHTML={{ __html: `
				.custom-scrollbar::-webkit-scrollbar {
					width: 4px;
				}
				
				.custom-scrollbar::-webkit-scrollbar-track {
					background: transparent;
				}
				
				.custom-scrollbar::-webkit-scrollbar-thumb {
					background: #cbd5e1;
					border-radius: 10px;
				}
				
				.dark .custom-scrollbar::-webkit-scrollbar-thumb {
					background: #334155;
				}
				
				.custom-scrollbar::-webkit-scrollbar-thumb:hover {
					background: #94a3b8;
				}
			`}} />
		</div>
	);
}
