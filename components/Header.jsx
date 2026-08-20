"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
	Menu, 
	X, 
	Sun, 
	Moon 
} from "lucide-react";

export default function Header() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setMounted(true);
	}, []);

	const menuItems = [
		{ text: "Início", href: "/", icon: <Home className="w-4 h-4" />, featured: true },
		{ text: "Sobre o Projeto", brief: "Sobre", href: "/sobre", icon: <Info className="w-4 h-4" /> },
		{ text: "Glossário", href: "/glossario", icon: <BookOpen className="w-4 h-4" /> },
		{ text: "Séries", href: "/series", icon: <Cpu className="w-4 h-4" />, featured: true },
		{ text: "Seletor de ESP32", brief: "Seletor", href: "/seletor", icon: <SlidersHorizontal className="w-4 h-4" />, featured: true },
		{ text: "Frameworks", href: "/frameworks", icon: <Terminal className="w-4 h-4" />, featured: true },
		{ text: "Comparar Séries", brief: "Comparar", href: "/comparacao", icon: <Scale className="w-4 h-4" />, featured: true },
		{ text: "Catálogo de Placas", brief: "Catálogo", href: "/catalogo", icon: <ShoppingBag className="w-4 h-4" /> },
	];

	const featuredItems = menuItems.filter(item => item.featured);

	function isActive(href) {
		if (href === "/") {
			return pathname === "/";
		}
		return String(pathname).includes(href) && href !== "/";
	}

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

	return (
		<header className="bg-white dark:bg-slate-950/80 backdrop-blur-md py-4 px-4 md:px-8 shadow-xs border-b border-slate-200 dark:border-slate-800/60 sticky top-0 z-50 transition-colors duration-300">
			<div className="flex justify-between max-w-7xl mx-auto items-center gap-8">
				{/* LOGO */}
				<Link href="/" className="group shrink-0">
					<h1 className="text-2xl md:text-3xl font-display font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-[1.02]">
						ESPDocs
					</h1>
				</Link>

				{/* Menu Desktop */}
				<nav className="hidden lg:flex items-center gap-2 flex-1 justify-end" aria-label="Menu principal">
					{featuredItems.map((item) => (
						<Link
							key={item.text}
							href={item.href}
							className={`group flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
								isActive(item.href)
									? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-purple-500/10"
									: "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:text-purple-600 dark:hover:text-purple-400"
							}`}
							aria-label={item.brief || item.text}
							aria-current={isActive(item.href) ? "page" : undefined}
						>
							<span className={`transition-transform duration-300 ${
								isActive(item.href) ? "scale-110" : "group-hover:scale-110"
							}`}>
								{item.icon}
							</span>
							<span className="whitespace-nowrap">{item.brief || item.text}</span>
						</Link>
					))}

					{/* Divider */}
					<div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

					{/* Theme Switcher Button */}
					<ThemeToggle />

					{/* Full Menu Burger Trigger */}
					<button
						onClick={() => setDrawerOpen(true)}
						className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/80 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all cursor-pointer"
						aria-label="Abrir menu completo"
						aria-expanded={drawerOpen}
					>
						<Menu className="w-5 h-5" />
					</button>
				</nav>

				{/* Botões Mobile (Theme + Burger) */}
				<div className="flex lg:hidden items-center gap-2">
					<ThemeToggle />
					<button
						onClick={() => setDrawerOpen(true)}
						className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/80 hover:border-purple-500 dark:hover:border-purple-400 transition-all cursor-pointer"
						aria-label="Abrir menu de navegação"
						aria-expanded={drawerOpen}
					>
						<Menu className="w-5 h-5" />
					</button>
				</div>
			</div>

			{/* Render side-panel and overlay at body level via React Portal to prevent layout leakage */}
			{mounted && createPortal(
				<>
					{drawerOpen && (
						<div
							className="fixed inset-0 bg-slate-950/50 dark:bg-black/75 backdrop-blur-xs z-[100] transition-opacity duration-300"
							onClick={() => setDrawerOpen(false)}
						/>
					)}

					<div
						className={`fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out flex flex-col border-l border-slate-300 dark:border-slate-800 ${
							drawerOpen ? "translate-x-0" : "translate-x-full"
						}`}
					>
						{/* Drawer Header */}
						<div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800/80">
							<h2 className="text-xl font-display font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
								Menu Navegação
							</h2>
							<button
								onClick={() => setDrawerOpen(false)}
								className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer"
								aria-label="Fechar menu"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Drawer Menu Items */}
						<nav className="flex-1 overflow-y-auto p-6 animate-fadeIn" aria-label="Navegação móvel">
							<ul className="space-y-2">
								{menuItems.map((item) => (
									<li key={item.text}>
										<Link
											href={item.href}
											className={`flex items-center gap-3 w-full p-3.5 rounded-xl font-medium transition-all duration-205 text-sm ${
												isActive(item.href)
													? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-purple-500/10"
													: "text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-purple-600 dark:hover:text-purple-400"
											}`}
											onClick={() => setDrawerOpen(false)}
											aria-current={isActive(item.href) ? "page" : undefined}
										>
											<span className="shrink-0">{item.icon}</span>
											<span className="grow text-left">{item.text}</span>
											{isActive(item.href) && (
												<span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
											)}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						{/* Drawer Footer Info */}
						<div className="p-6 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
							<p className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
								ESPDocs • Plataforma Não Oficial
							</p>
						</div>
					</div>
				</>
				, document.body
			)}
		</header>
	);
}

/* Internal ThemeToggle Component */
function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 animate-pulse border border-transparent" />
		);
	}

	return (
		<button
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
			className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800/80 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-250/20 dark:border-slate-800/60 shadow-xs flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 shrink-0"
			aria-label="Alternar tema"
		>
			{resolvedTheme === "dark" ? (
				<Sun className="w-5 h-5 text-yellow-500" />
			) : (
				<Moon className="w-5 h-5 text-indigo-600" />
			)}
		</button>
	);
}