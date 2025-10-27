"use client";

import { useState, useEffect, useMemo } from "react";

const FILTER_CATEGORIES = [
    { id: "All", name: "Todos", color: "#374151" },
    { id: "GND", name: "Terra (GND)", color: "#64748b" },
    { id: "Power", name: "Alimentação", color: "#ef4444" },
    { id: "GPIO", name: "GPIO", color: "#22c55e" },
    { id: "Low Power", name: "GPIO LP", color: "#f59e0b" },
    { id: "ADC", name: "ADC", color: "#ec4899" },
    { id: "DAC", name: "DAC", color: "#a855f7" },
    { id: "Touch", name: "Touch", color: "#06b6d4" },
    { id: "UART", name: "UART", color: "#3b82f6" },
    { id: "SPI", name: "SPI", color: "#ef4444" },
    { id: "USB", name: "USB", color: "#8b5cf6" },
    { id: "Clock", name: "Clock", color: "#eab308" },
    { id: "JTAG", name: "JTAG", color: "#8b5cf6" },
    { id: "Strapping", name: "Inicialização", color: "#dc2626" },
    { id: "DSI", name: "Display (DSI)", color: "#f97316" },
    { id: "CSI", name: "Câmera (CSI)", color: "#14b8a6" },
    { id: "Ethernet", name: "Ethernet", color: "#3b82f6" },
    { id: "SD", name: "Cartão SD", color: "#10b981" },
    { id: "I2C", name: "I2C", color: "#f59e0b" },
    { id: "Antena", name: "Antena", color: "#22d3ee" },
];

const type_colors = {
    power: "#ef4444",
    ground: "#64748b",
    io: "#22c55e",
    analog: "#ec4899",
    dedicated: "#3b82f6",
    nc: "#9ca3af",
};

export default function ConnectionsDiagram({ connections, color }) {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedConnection, setSelectedConnection] = useState(null);
    const [hoveredConnection, setHoveredConnection] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const [showTooltip, setShowTooltip] = useState(null);

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
                    Explore as conexões do ESP32. Use a busca, filtros por função ou passe o mouse para ver detalhes rápidos.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar por nome ou número da conexão..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-700"
                            aria-label="Search connections"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Clear search"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                viewMode === "grid"
                                    ? "bg-white shadow-sm text-gray-900"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                            aria-label="Grid view"
                            aria-pressed={viewMode === "grid"}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            <span className="hidden sm:inline font-medium">Grade</span>
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                viewMode === "list"
                                    ? "bg-white shadow-sm text-gray-900"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                            aria-label="List view"
                            aria-pressed={viewMode === "list"}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="hidden sm:inline font-medium">Lista</span>
                        </button>
                    </div>
                </div>
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

                    <span className="ml-auto text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {visibleConnections.length} de {connections.length}
                    </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                    {FILTER_CATEGORIES.map((filter) => {
                        const isActive = activeFilter === filter.id;
                        const count = connections.filter(c => 
                            filter.id === "All" ? true : c.categorias.includes(filter.id)
                        ).length;
                        
                        return (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                aria-pressed={isActive}
                                aria-label={`Filter by ${filter.name}`}
                                className={`group relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    isActive
                                        ? "shadow-lg transform scale-105 text-white"
                                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md"
                                }`}
                                style={{
                                    backgroundColor: isActive ? filter.color : undefined,
                                    borderColor: isActive ? filter.color : undefined,
                                }}
                            >
                                <span className="flex items-center gap-2">
                                    {filter.name}
                                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                        isActive ? "bg-white/20" : "bg-gray-200"
                                    }`}>
                                        {count}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                {activeFilter !== "All" && activeCategories.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-600 mb-3">Categorias visíveis:</p>
                        <div className="flex flex-wrap gap-2">
                            {activeCategories.map(cat => (
                                <span
                                    key={cat.id}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-white shadow-sm"
                                    style={{ backgroundColor: cat.color }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                                    {cat.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {visibleConnections.length === 0 ? (
                <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-12 border-2 border-dashed border-gray-300 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <p className="text-lg font-semibold text-gray-700 mb-2">Nenhuma conexão encontrada</p>
                    <p className="text-sm text-gray-500">Tente ajustar os filtros ou termo de busca</p>
                    <button
                        onClick={() => {
                            setActiveFilter("All");
                            setSearchQuery("");
                        }}
                        className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
                    >
                        Limpar filtros
                    </button>
                </div>
            ) : viewMode === "grid" ? (
                <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 shadow-inner">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                        {visibleConnections.map((connection, index) => {
                            const isHovered = hoveredConnection === index;
                            const connectionId = `connection-${index}`;
                            
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
                                        aria-label={`Connection ${connection.nome}, number ${connection.numero}`}
                                        aria-describedby={showTooltip === index ? `tooltip-${index}` : undefined}
                                        className="relative w-full flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 opacity-100 hover:scale-110 hover:shadow-2xl hover:z-10 cursor-pointer active:scale-95 focus:outline-none focus:border-4"
                                        style={{
                                            backgroundColor: type_colors[connection.tipo] + (isHovered ? "20" : "10"),
                                            borderColor: isHovered ? type_colors[connection.tipo] : type_colors[connection.tipo] + "60",
                                            transform: isHovered ? "translateY(-2px)" : undefined,
                                            focusRingColor: type_colors[connection.tipo],
                                        }}
                                    >
                                        <div
                                            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3 shadow-lg"
                                            style={{ backgroundColor: type_colors[connection.tipo] }}
                                        >
                                            {typeof connection.numero === "number" 
                                                ? connection.numero 
                                                : connection.numero.substring(0, 4)}
                                        </div>

                                        <div className="text-xs font-bold text-center text-gray-900 leading-tight mb-2">
                                            {connection.nome}
                                        </div>

                                        <div className="flex flex-wrap gap-1 justify-center leading-2">
                                            {connection.categorias.slice(0, 5).map((cat) => (
                                                <span
                                                    key={cat}
                                                    className="w-1.5 h-1.5 my-auto rounded-full"
                                                    style={{ backgroundColor: getCategoryColor(cat) }}
                                                    title={cat}
                                                />
                                            ))}
                                            {connection.categorias.length > 5 && (
                                                <span className="text-[10px] text-gray-500 font-medium leading-2">
                                                    +{connection.categorias.length - 5}
                                                </span>
                                            )}
                                        </div>

                                        {connection.avisos && (
                                            <div 
                                                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1.5 shadow-lg ring-2 ring-white"
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

                                    {showTooltip === index && (
                                        <div
                                            id={`tooltip-${index}`}
                                            role="tooltip"
                                            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl max-w-xs pointer-events-none animate-fadeIn"
                                            style={{ minWidth: "200px" }}
                                        >
                                            <div className="font-bold mb-1">{connection.nome}</div>
                                            <div className="text-gray-300 mb-2">Pino {connection.numero}</div>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {connection.categorias.map((cat) => (
                                                    <span
                                                        key={cat}
                                                        className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                                                        style={{ 
                                                            backgroundColor: getCategoryColor(cat) + "40",
                                                            color: "#fff"
                                                        }}
                                                    >
                                                        {cat === "Strapping" ? "Inicialização" : cat}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="text-gray-400 text-[10px]">Clique para detalhes</div>
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-linear-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Pin</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nome</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Categorias</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Funções</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Avisos</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {visibleConnections.map((connection, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => setSelectedConnection(connection)}
                                        className="hover:bg-gray-50 cursor-pointer transition-colors group"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                                                style={{ backgroundColor: type_colors[connection.tipo] }}
                                            >
                                                {typeof connection.numero === "number" 
                                                    ? connection.numero 
                                                    : connection.numero.substring(0, 4)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {connection.nome}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {connection.categorias.map((cat) => (
                                                    <span
                                                        key={cat}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                                                        style={{ backgroundColor: getCategoryColor(cat) }}
                                                    >
                                                        {cat === "Strapping" ? "Inicialização" : cat}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 max-w-md">
                                                {connection.funcoes.join(", ")}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {connection.avisos ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    Sim
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Não
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {connections.some(c => c.avisos) && (
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
                    className="fixed inset-0 bg-opacity-80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn"
                    onClick={() => setSelectedConnection(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-linear-to-r from-white to-gray-50 border-b-2 border-gray-200 p-8 z-10">
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex items-center gap-5 flex-1">
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl ring-4 ring-white shrink-0"
                                        style={{ backgroundColor: type_colors[selectedConnection.tipo] }}
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
                                            Pino {selectedConnection.numero}
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
                            {selectedConnection.categorias.length > 0 && (<div>
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
                                            className="px-4 py-2 rounded-xl text-sm font-bold text-white shadow-md"
                                            style={{ backgroundColor: getCategoryColor(cat) }}
                                        >
                                            {cat === "Strapping" ? "Inicialização" : cat}
                                        </span>
                                    ))}
                                </div>
                            </div>)}

                            {selectedConnection.alimentacao && (
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                        </svg>
                                        Alimentado por:
                                    </h4>
                                    <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                                        <ul className="space-y-3">
                                            {selectedConnection.alimentacao.map((source, index) => (
                                                <li key={index} className="flex items-start gap-4 text-sm group">
                                                    <span
                                                        className="mt-1.5 shrink-0 w-2 h-2 rounded-full"
                                                        style={{ backgroundColor: type_colors["power"] }}
                                                    />
                                                    <span className="text-gray-800 font-medium leading-relaxed">{source}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 7H7v6h6V7zM5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
                                    </svg>
                                    Funções da Conexão
                                </h4>

                                <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                                    <ul className="space-y-3">
                                        {selectedConnection.funcoes.map((func, index) => (
                                            <li key={index} className="flex items-start gap-4 text-sm group">
                                                <span
                                                    className="mt-1.5 shrink-0 w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: type_colors[selectedConnection.tipo] }}
                                                />
                                                <span className="text-gray-800 font-medium leading-relaxed">{func}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {selectedConnection.avisos && (
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
                                                Avisos Importantes
                                            </p>
                                            {selectedConnection.avisos.map((aviso, index) => (
                                                <div key={index} className="flex items-start gap-3 mb-2">
                                                    <span className="text-red-600 font-bold">•</span>
                                                    <span className="text-sm text-red-800 leading-relaxed">
                                                        {aviso}
                                                    </span>
                                                </div>
                                            ))}
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
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
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

                /* Smooth scroll for modal */
                .overflow-y-auto {
                    scrollbar-width: thin;
                    scrollbar-color: #cbd5e0 #f7fafc;
                }

                .overflow-y-auto::-webkit-scrollbar {
                    width: 8px;
                }

                .overflow-y-auto::-webkit-scrollbar-track {
                    background: #f7fafc;
                    border-radius: 10px;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: #cbd5e0;
                    border-radius: 10px;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                    background: #a0aec0;
                }
            `}</style>
        </div>
    );
}