"use client";

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BoardCard from "@/components/BoardCard";

export default function PlacasPage() {
    const [boards, setBoards] = useState([]);
    const [filteredBoards, setFilteredBoards] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState({});
    const [filterOptions, setFilterOptions] = useState({});

    const excludedColumns = ['Nome', 'Link', 'Imagem'];

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
                    // Remove o valor (criar novo array sem o valor)
                    newFilters[column] = newFilters[column].filter(v => v !== value);
                    if (newFilters[column].length === 0) {
                        delete newFilters[column];
                    }
                } else {
                    // Adiciona o valor (criar novo array com o valor)
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
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <p className="text-xl text-gray-600">Carregando placas...</p>
                </div>
            </main>

            <Footer />
        </div>
        );
    }

    if (error) {
        return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <p className="text-xl text-red-600 mb-4">Erro ao carregar dados</p>
                    <p className="text-gray-600 mb-6">{error}</p>

                    <button
                        onClick={fetchBoards}
                        className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </main>

            <Footer />
        </div>
        );
    }

    const filterableColumns = headers.filter(h => !excludedColumns.includes(h));

    return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-relaxed mb-4">
                    🛒 Catálogo de Placas ESP32
                </h1>

                <p className="text-2xl text-gray-600 mb-2">
                    Encontre a placa perfeita para o seu projeto
                </p>
                <p className="text-md text-green-600 font-semibold flex items-center justify-center gap-2">
                    ✓ Todos os links são verificados e de fontes confiáveis
                </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-4">
                        {/* Header dos Filtros */}
                        <div className="bg-linear-to-r from-blue-600 to-purple-600 p-6 text-white">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        🔍 Filtros
                                    </h2>
                                    {activeFilterCount > 0 && (
                                        <p className="text-sm text-blue-100 mt-1">
                                            {activeFilterCount} filtro(s) ativo(s)
                                        </p>
                                    )}
                                </div>
                                {activeFilterCount > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-all hover:scale-105"
                                    >
                                        Limpar
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Conteúdo dos Filtros */}
                        <div className="p-6">
                            {/* Barra de Busca */}
                            <div className="mb-6">
                                <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                    Buscar por nome
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Digite para buscar..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-sm bg-gray-50 focus:bg-white"
                                    />
                                    <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Separador */}
                            <div className="border-t border-gray-200 my-2"></div>

                            {/* Filtros por Categoria */}
                            <div className="space-y-2 max-h-[calc(100vh-450px)] overflow-y-auto pr-2 custom-scrollbar">
                                {filterableColumns.map((column) => {
                                    const filterData = filterOptions[column];
                                    if (!filterData) return null;
                                    
                                    const isActive = activeFilters[column]?.length > 0;
                                    
                                    return (
                                        <div key={column} className={`pb-2 border-b border-gray-100 last:border-b-0 ${isActive ? 'bg-purple-50/50 rounded-lg' : ''}`}>
                                            {filterData.isBinary ? (
                                                // Filtro binário: checkbox integrado ao título
                                                <label className="flex justify-between cursor-pointer hover:bg-purple-50 p-3 rounded-lg transition-all group">
                                                    <span className="font-semibold text-gray-700 group-hover:text-purple-700 transition-colors">
                                                        {column}
                                                    </span>

                                                    <div className="mt-0.5">
                                                        <input
                                                            type="checkbox"
                                                            checked={activeFilters[column]?.includes('binary-enabled') || false}
                                                            onChange={() => handleFilterToggle(column, 'binary-enabled')}
                                                            className="w-5 h-5 rounded-md border-2 border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all cursor-pointer"
                                                        />
                                                    </div>
                                                </label>
                                            ) : (
                                                // Filtro normal: título separado + múltiplas opções
                                                <>
                                                    <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                                                        {column}
                                                        {isActive && (
                                                            <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                                                                {activeFilters[column].length}
                                                            </span>
                                                        )}
                                                    </h3>
                                                    <div className="space-y-2 max-h-44 overflow-y-auto pr-2">
                                                        {filterData.values.map((option) => (
                                                            <label
                                                                key={option}
                                                                className="flex items-center gap-3 cursor-pointer hover:bg-purple-50 p-2 rounded-lg transition-all group"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={activeFilters[column]?.includes(option) || false}
                                                                    onChange={() => handleFilterToggle(column, option)}
                                                                    className="w-4 h-4 rounded border-2 border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all cursor-pointer"
                                                                />
                                                                <span className="text-sm text-gray-700 group-hover:text-purple-700 transition-colors">
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

                {/* Grid de Placas */}
                <div className="lg:col-span-3">
                    <div className="mb-6 flex justify-between items-center">
                        <p className="text-gray-600">
                            <span className="font-bold text-purple-600">{filteredBoards.length}</span> placa(s) encontrada(s)
                        </p>
                    </div>

                    {filteredBoards.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <p className="text-xl text-gray-600 mb-2">Nenhuma placa encontrada</p>
                            <p className="text-gray-500">Tente ajustar os filtros</p>
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
        </div>
    );
}

// Estilos customizados para scrollbar
const styles = `
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #3b82f6, #9333ea);
        border-radius: 10px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #2563eb, #7c3aed);
    }
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}
