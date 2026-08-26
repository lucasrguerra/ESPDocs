"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { createPortal } from "react-dom";
import { 
	Home, 
	Info, 
	BookOpen, 
	Cpu, 
	SlidersHorizontal, 
	Terminal, 
	Scale, 
	ShoppingBag, 
	AlertTriangle,
	Menu, 
	X, 
	Sun, 
	Moon,
	ChevronDown,
	Sparkles,
	ArrowRight,
	ExternalLink,
	Compass,
	Layers,
	Box
} from "lucide-react";

export default function Header() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [hardwareDropdown, setHardwareDropdown] = useState(false);
	const [toolsDropdown, setToolsDropdown] = useState(false);
	const [docsDropdown, setDocsDropdown] = useState(false);
	const [mounted, setMounted] = useState(false);
	const pathname = usePathname();

	const hardwareRef = useRef(null);
	const toolsRef = useRef(null);
	const docsRef = useRef(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Close dropdowns on outside click
	useEffect(() => {
		function handleClickOutside(e) {
			if (hardwareRef.current && !hardwareRef.current.contains(e.target)) {
				setHardwareDropdown(false);
			}
			if (toolsRef.current && !toolsRef.current.contains(e.target)) {
				setToolsDropdown(false);
			}
			if (docsRef.current && !docsRef.current.contains(e.target)) {
				setDocsDropdown(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Lock scroll when mobile menu is open
	useEffect(() => {
		if (drawerOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [drawerOpen]);

	// Close menu on route change
	useEffect(() => {
		setDrawerOpen(false);
		setHardwareDropdown(false);
		setToolsDropdown(false);
		setDocsDropdown(false);
	}, [pathname]);

	function isActive(href) {
		if (href === "/") {
			return pathname === "/";
		}
		return String(pathname).startsWith(href);
	}

	const popularChips = [
		{ name: "ESP32", desc: "Clássico Dual-Core", href: "/series/ESP32" },
		{ name: "ESP32-S3", desc: "IA & USB Nativo", href: "/series/ESP32-S3" },
		{ name: "ESP32-C6", desc: "Wi-Fi 6 + Zigbee/Thread", href: "/series/ESP32-C6" },
		{ name: "ESP32-P4", desc: "Alto Desempenho 400MHz", href: "/series/ESP32-P4" },
	];

	return (
		<header className="bg-white/90 dark:bg-slate-950/80 backdrop-blur-md py-3.5 px-4 md:px-8 shadow-xs border-b border-slate-200 dark:border-slate-800/60 sticky top-0 z-50 transition-colors duration-300">
			<div className="flex justify-between max-w-7xl mx-auto items-center gap-4 lg:gap-8">
				{/* LOGO */}
				<Link href="/" className="group shrink-0 flex items-center gap-2.5">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img 
						src="/marca/espdocs-marca.svg" 
						alt="ESPDocs Logo" 
						width={32} 
						height={32} 
						className="w-7 h-7 md:w-8 md:h-8 shrink-0 transition-transform duration-300 group-hover:scale-105" 
					/>
					<h1 className="text-2xl md:text-3xl font-display font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-[1.02]">
						ESPDocs
					</h1>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center" aria-label="Menu principal">
					{/* Link Início */}
					<Link
						href="/"
						className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
							isActive("/") && pathname === "/"
								? "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400"
								: "text-slate-650 dark:text-slate-350 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-850 dark:hover:text-slate-100"
						}`}
					>
						<Home className="w-4 h-4" />
						<span>Início</span>
					</Link>

					{/* Dropdown: Séries & Hardware */}
					<div className="relative" ref={hardwareRef}>
						<button
							onClick={() => {
								setHardwareDropdown(!hardwareDropdown);
								setToolsDropdown(false);
								setDocsDropdown(false);
							}}
							className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
								isActive("/series") || isActive("/comparacao") || isActive("/catalogo")
									? "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400"
									: "text-slate-650 dark:text-slate-350 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-850 dark:hover:text-slate-100"
							}`}
							aria-expanded={hardwareDropdown}
						>
							<Cpu className="w-4 h-4" />
							<span>Séries & Chips</span>
							<ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${hardwareDropdown ? "rotate-180" : ""}`} />
						</button>

						{hardwareDropdown && (
							<div className="absolute left-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-fadeIn">
								<div className="space-y-1 mb-2">
									<Link
										href="/series"
										className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
									>
										<div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shrink-0">
											<Cpu className="w-4 h-4" />
										</div>
										<div>
											<div className="font-bold text-sm text-slate-850 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 flex items-center gap-1.5">
												Todas as 12 Séries
												<span className="text-[10px] bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold px-1.5 py-0.5 rounded-md">12</span>
											</div>
											<div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Pinouts, especificações e restrições</div>
										</div>
									</Link>

									<Link
										href="/comparacao"
										className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
									>
										<div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shrink-0">
											<Scale className="w-4 h-4" />
										</div>
										<div>
											<div className="font-bold text-sm text-slate-850 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
												Comparador de Séries
											</div>
											<div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Compare até 4 modelos lado a lado</div>
										</div>
									</Link>

									<Link
										href="/catalogo"
										className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
									>
										<div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shrink-0">
											<ShoppingBag className="w-4 h-4" />
										</div>
										<div>
											<div className="font-bold text-sm text-slate-850 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
												Catálogo de Placas
											</div>
											<div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Placas de dev, conectores e compras</div>
										</div>
									</Link>
								</div>

								{/* Atalhos Rápidos Séries Populares */}
								<div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
									<div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2.5 mb-1.5">
										Séries Populares
									</div>
									<div className="grid grid-cols-2 gap-1">
										{popularChips.map((chip) => (
											<Link
												key={chip.name}
												href={chip.href}
												className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors text-left"
											>
												<span className="text-xs font-bold text-slate-850 dark:text-slate-100 block truncate">
													{chip.name}
												</span>
												<span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
													{chip.desc}
												</span>
											</Link>
										))}
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Dropdown: Ferramentas */}
					<div className="relative" ref={toolsRef}>
						<button
							onClick={() => {
								setToolsDropdown(!toolsDropdown);
								setHardwareDropdown(false);
								setDocsDropdown(false);
							}}
							className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
								isActive("/seletor") || isActive("/diagnostico")
									? "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400"
									: "text-slate-650 dark:text-slate-350 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-850 dark:hover:text-slate-100"
							}`}
							aria-expanded={toolsDropdown}
						>
							<Sparkles className="w-4 h-4" />
							<span>Ferramentas</span>
							<ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdown ? "rotate-180" : ""}`} />
						</button>

						{toolsDropdown && (
							<div className="absolute left-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-fadeIn">
								<div className="space-y-1">
									<Link
										href="/seletor"
										className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
									>
										<div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 shrink-0">
											<SlidersHorizontal className="w-4 h-4" />
										</div>
										<div>
											<div className="font-bold text-sm text-slate-850 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 flex items-center gap-1.5">
												Seletor Inteligente
												<span className="text-[10px] bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold px-1.5 py-0.5 rounded-md">Quiz</span>
											</div>
											<div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Descubra o chip ideal para o seu projeto</div>
										</div>
									</Link>

									<Link
										href="/diagnostico"
										className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
									>
										<div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 shrink-0">
											<AlertTriangle className="w-4 h-4" />
										</div>
										<div>
											<div className="font-bold text-sm text-slate-850 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 flex items-center gap-1.5">
												Diagnóstico de Erros
												<span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold px-1.5 py-0.5 rounded-md">30+ Erros</span>
											</div>
											<div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Solucione Brownout, Bootloops, WDT e falhas</div>
										</div>
									</Link>
								</div>
							</div>
						)}
					</div>

					{/* Dropdown: Documentação */}
					<div className="relative" ref={docsRef}>
						<button
							onClick={() => {
								setDocsDropdown(!docsDropdown);
								setHardwareDropdown(false);
								setToolsDropdown(false);
							}}
							className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
								isActive("/frameworks") || isActive("/componentes") || isActive("/glossario") || isActive("/sobre")
									? "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400"
									: "text-slate-650 dark:text-slate-350 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-850 dark:hover:text-slate-100"
							}`}
							aria-expanded={docsDropdown}
						>
							<BookOpen className="w-4 h-4" />
							<span>Documentação</span>
							<ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${docsDropdown ? "rotate-180" : ""}`} />
						</button>

						{docsDropdown && (
							<div className="absolute left-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-fadeIn">
								<div className="space-y-1">
									<Link
										href="/frameworks"
										className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
									>
										<div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 shrink-0">
											<Terminal className="w-4 h-4" />
										</div>
										<div>
											<div className="font-bold text-sm text-slate-850 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
												Frameworks & SDKs
											</div>
											<div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ESP-IDF, Arduino, Rust, RainMaker e mais</div>
										</div>
									</Link>

									<Link
										href="/componentes"
										className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
									>
										<div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 shrink-0">
											<Box className="w-4 h-4" />
										</div>
										<div>
											<div className="font-bold text-sm text-slate-850 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
												Component Registry
											</div>
											<div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Catálogo de drivers e gerador idf_component.yml</div>
										</div>
									</Link>

									<Link
										href="/glossario"
										className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
									>
										<div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 shrink-0">
											<BookOpen className="w-4 h-4" />
										</div>
										<div>
											<div className="font-bold text-sm text-slate-850 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
												Glossário Técnico
											</div>
											<div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Conceitos essenciais de hardware e software</div>
										</div>
									</Link>

									<Link
										href="/sobre"
										className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
									>
										<div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350 shrink-0">
											<Info className="w-4 h-4" />
										</div>
										<div>
											<div className="font-bold text-sm text-slate-850 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
												Sobre o Projeto
											</div>
											<div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">História, autor e Ciência Embarcada</div>
										</div>
									</Link>
								</div>
							</div>
						)}
					</div>
				</nav>

				{/* Right CTA + Theme + Full Drawer Button */}
				<div className="flex items-center gap-2 md:gap-3">
					{/* CTA Button Desktop */}
					<Link
						href="/seletor"
						className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-sm hover:shadow-purple-500/20 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 shrink-0 cursor-pointer"
					>
						<Compass className="w-3.5 h-3.5" />
						<span>Seletor de ESP32</span>
					</Link>

					<div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

					{/* Theme Switcher Button */}
					<ThemeToggle />

					{/* Full Drawer Trigger Button */}
					<button
						onClick={() => setDrawerOpen(true)}
						className="p-2 md:p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all cursor-pointer flex items-center gap-1.5"
						aria-label="Abrir menu de navegação completo"
						aria-expanded={drawerOpen}
					>
						<Menu className="w-5 h-5" />
						<span className="text-xs font-bold hidden xl:inline">Menu</span>
					</button>
				</div>
			</div>

			{/* Full Screen / Side Drawer Portal */}
			{mounted && createPortal(
				<>
					{drawerOpen && (
						<div
							className="fixed inset-0 bg-slate-950/60 dark:bg-black/80 backdrop-blur-xs z-[100] transition-opacity duration-300"
							onClick={() => setDrawerOpen(false)}
						/>
					)}

					<div
						className={`fixed top-0 right-0 h-screen w-96 max-w-[88vw] bg-white dark:bg-slate-900 shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out flex flex-col border-l border-slate-200 dark:border-slate-800 ${
							drawerOpen ? "translate-x-0" : "translate-x-full"
						}`}
					>
						{/* Drawer Header */}
						<div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
							<div className="flex items-center gap-2.5">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src="/marca/espdocs-marca.svg" alt="" aria-hidden="true" width={28} height={28} className="w-7 h-7" />
								<div>
									<h2 className="text-lg font-display font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
										Navegação ESPDocs
									</h2>
									<p className="text-[11px] text-slate-500 dark:text-slate-400">Guia Técnico em Português</p>
								</div>
							</div>
							<button
								onClick={() => setDrawerOpen(false)}
								className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
								aria-label="Fechar menu lateral"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Quick Action Highlights */}
						<div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 space-y-2">
							<Link
								href="/seletor"
								onClick={() => setDrawerOpen(false)}
								className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm hover:shadow-md transition-all group"
							>
								<div className="flex items-center gap-2.5">
									<Compass className="w-4 h-4 shrink-0" />
									<div className="text-left">
										<div className="font-bold text-xs">Seletor Inteligente</div>
										<div className="text-[10px] text-purple-100">Encontre o ESP32 certo</div>
									</div>
								</div>
								<ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
							</Link>

							<Link
								href="/diagnostico"
								onClick={() => setDrawerOpen(false)}
								className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm hover:shadow-md transition-all group"
							>
								<div className="flex items-center gap-2.5">
									<AlertTriangle className="w-4 h-4 shrink-0" />
									<div className="text-left">
										<div className="font-bold text-xs">Diagnóstico de Falhas</div>
										<div className="text-[10px] text-amber-100">Resolva Brownout, bootloop e erros</div>
									</div>
								</div>
								<ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
							</Link>
						</div>

						{/* Drawer Categorized Menu */}
						<nav className="flex-1 overflow-y-auto p-5 space-y-6" aria-label="Navegação móvel completa">
							{/* Seção 1: Hardware & Microcontroladores */}
							<div>
								<div className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5 px-1">
									Hardware & Séries
								</div>
								<div className="space-y-1">
									<Link
										href="/series"
										onClick={() => setDrawerOpen(false)}
										className={`flex items-center justify-between p-2.5 rounded-xl font-medium text-sm transition-colors ${
											isActive("/series") && pathname === "/series"
												? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold"
												: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
										}`}
									>
										<div className="flex items-center gap-2.5">
											<Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
											<span>Todas as Séries</span>
										</div>
										<span className="text-[11px] bg-slate-200 dark:bg-slate-800 text-slate-650 dark:text-slate-350 px-2 py-0.5 rounded-full font-bold">
											12
										</span>
									</Link>

									<Link
										href="/comparacao"
										onClick={() => setDrawerOpen(false)}
										className={`flex items-center gap-2.5 p-2.5 rounded-xl font-medium text-sm transition-colors ${
											isActive("/comparacao")
												? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold"
												: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
										}`}
									>
										<Scale className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
										<span>Comparar Séries</span>
									</Link>

									<Link
										href="/catalogo"
										onClick={() => setDrawerOpen(false)}
										className={`flex items-center gap-2.5 p-2.5 rounded-xl font-medium text-sm transition-colors ${
											isActive("/catalogo")
												? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold"
												: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
										}`}
									>
										<ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
										<span>Catálogo de Placas</span>
									</Link>
								</div>

								{/* Atalhos Rápidos com Cores */}
								<div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80">
									<div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-1">
										Acesso Rápido a Chips
									</div>
									<div className="grid grid-cols-2 gap-1.5">
										{popularChips.map((chip) => (
											<Link
												key={chip.name}
												href={chip.href}
												onClick={() => setDrawerOpen(false)}
												className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-750 transition-colors"
											>
												<span className="text-xs font-bold text-slate-850 dark:text-slate-100 block">
													{chip.name}
												</span>
												<span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
													{chip.desc}
												</span>
											</Link>
										))}
									</div>
								</div>
							</div>

							{/* Seção 2: Ferramentas & Diagnóstico */}
							<div>
								<div className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5 px-1">
									Ferramentas Interativas
								</div>
								<div className="space-y-1">
									<Link
										href="/seletor"
										onClick={() => setDrawerOpen(false)}
										className={`flex items-center gap-2.5 p-2.5 rounded-xl font-medium text-sm transition-colors ${
											isActive("/seletor")
												? "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-bold"
												: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
										}`}
									>
										<SlidersHorizontal className="w-4 h-4 text-purple-600 dark:text-purple-400" />
										<span>Seletor Inteligente</span>
									</Link>

									<Link
										href="/diagnostico"
										onClick={() => setDrawerOpen(false)}
										className={`flex items-center gap-2.5 p-2.5 rounded-xl font-medium text-sm transition-colors ${
											isActive("/diagnostico")
												? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold"
												: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
										}`}
									>
										<AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
										<span>Diagnóstico & Solução de Erros</span>
									</Link>
								</div>
							</div>

							{/* Seção 3: Documentação & Referência */}
							<div>
								<div className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5 px-1">
									Guias & Documentação
								</div>
								<div className="space-y-1">
									<Link
										href="/frameworks"
										onClick={() => setDrawerOpen(false)}
										className={`flex items-center gap-2.5 p-2.5 rounded-xl font-medium text-sm transition-colors ${
											isActive("/frameworks")
												? "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 font-bold"
												: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
										}`}
									>
										<Terminal className="w-4 h-4 text-teal-600 dark:text-teal-400" />
										<span>Frameworks & SDKs</span>
									</Link>

									<Link
										href="/componentes"
										onClick={() => setDrawerOpen(false)}
										className={`flex items-center gap-2.5 p-2.5 rounded-xl font-medium text-sm transition-colors ${
											isActive("/componentes")
												? "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-bold"
												: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
										}`}
									>
										<Box className="w-4 h-4 text-purple-600 dark:text-purple-400" />
										<span>Component Registry</span>
									</Link>

									<Link
										href="/glossario"
										onClick={() => setDrawerOpen(false)}
										className={`flex items-center gap-2.5 p-2.5 rounded-xl font-medium text-sm transition-colors ${
											isActive("/glossario")
												? "bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 font-bold"
												: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
										}`}
									>
										<BookOpen className="w-4 h-4 text-pink-600 dark:text-pink-400" />
										<span>Glossário Técnico</span>
									</Link>
								</div>
							</div>

							{/* Seção 4: Institucional & Comunidade */}
							<div>
								<div className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5 px-1">
									Comunidade & Projeto
								</div>
								<div className="space-y-1">
									<Link
										href="/sobre"
										onClick={() => setDrawerOpen(false)}
										className={`flex items-center gap-2.5 p-2.5 rounded-xl font-medium text-sm transition-colors ${
											isActive("/sobre")
												? "bg-slate-100 dark:bg-slate-800 text-slate-850 dark:text-slate-100 font-bold"
												: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
										}`}
									>
										<Info className="w-4 h-4 text-slate-500 dark:text-slate-400" />
										<span>Sobre a Plataforma</span>
									</Link>

									<a
										href="https://cienciaembarcada.com.br"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-between p-2.5 rounded-xl font-medium text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors group"
									>
										<div className="flex items-center gap-2.5">
											<Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
											<span>Blog Ciência Embarcada</span>
										</div>
										<ExternalLink className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
									</a>
								</div>
							</div>
						</nav>

						{/* Drawer Footer */}
						<div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-between">
							<div>
								<p className="text-xs font-bold text-slate-700 dark:text-slate-300">
									ESPDocs • 100% em Português
								</p>
								<p className="text-[10px] text-slate-500 dark:text-slate-400">
									12 Séries • 8 Frameworks • 30+ Erros
								</p>
							</div>
							<ThemeToggle />
						</div>
					</div>
				</>
				, document.body
			)}
		</header>
	);
}

/* ThemeToggle Component */
function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-100 dark:bg-slate-900 animate-pulse border border-transparent" />
		);
	}

	return (
		<button
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
			className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-650 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-800/80 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
			aria-label="Alternar tema claro/escuro"
		>
			{resolvedTheme === "dark" ? (
				<Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
			) : (
				<Moon className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
			)}
		</button>
	);
}