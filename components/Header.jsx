"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AboutIcon from "@mui/icons-material/Info";
import ModelsIcon from "@mui/icons-material/Memory";
import FrameworksIcon from "@mui/icons-material/Apps";
import CompareIcon from "@mui/icons-material/CompareArrows";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const pathname = usePathname();
    const menuItems = [
        { text: "Início", href: "/", icon: <HomeIcon />, featured: true },
        { text: "Sobre o Projeto", brief: "Sobre", href: "/sobre", icon: <AboutIcon /> },
        { text: "Glossário", href: "/glossario", icon: <MenuBookIcon /> },
        { text: "Séries", href: "/series", icon: <ModelsIcon />, featured: true },
        { text: "Frameworks", href: "/frameworks", icon: <FrameworksIcon />, featured: true },
        { text: "Comparar Séries", brief: "Comparar", href: "/comparacao", icon: <CompareIcon />, featured: true },
        { text: "Catálogo de Placas", brief: "Catálogo", href: "/catalogo", icon: <ShoppingCartIcon /> },
    ];

    const featuredItems = menuItems.filter(item => item.featured);

    function isActive(href) {
        if (href === "/") {
            return pathname === "/";
        }
        
        return String(pathname).includes(href) && href !== "/";
    }

    return (
        <header className="bg-white/80 backdrop-blur-md py-4 px-4 md:px-8 text-black shadow-lg border-b border-gray-100 sticky top-0 z-50">
            <div className="flex justify-between max-w-7xl mx-auto items-center gap-8">
                <Link href="/" className="group shrink-0">
                    <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                        ESPDocs
                    </h1>
                </Link>

                {/* Menu Desktop - visível em telas médias e grandes */}
                <nav className="hidden lg:flex items-center gap-2 flex-1 justify-end" aria-label="Menu principal">
                    {featuredItems.map((item) => (
                        <Link
                            key={item.text}
                            href={item.href}
                            className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                                isActive(item.href)
                                    ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-200"
                                    : "text-gray-700 hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md hover:-translate-y-0.5"
                            }`}
                            aria-label={item.brief || item.text}
                            aria-current={isActive(item.href) ? "page" : undefined}
                        >
                            <span className={`transition-transform duration-300 ${
                                isActive(item.href) ? "scale-110" : "group-hover:scale-110"
                            }`}>
                                {item.icon}
                            </span>
                            <span className="text-sm whitespace-nowrap">{item.brief || item.text}</span>
                        </Link>
                    ))}
                    
                    {/* Botão Menu Completo Desktop */}
                    <Button 
                        variant="outlined" 
                        onClick={() => setDrawerOpen(true)}
                        className="border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 transition-all duration-300 hover:shadow-lg rounded-xl! px-4"
                        aria-label="Abrir menu completo"
                        aria-expanded={drawerOpen}
                        aria-controls="mobile-menu-drawer"
                    >
                        <MenuIcon />
                    </Button>
                </nav>

                {/* Botão Menu Mobile - visível apenas em telas pequenas */}
                <div className="lg:hidden">
                    <Button 
                        variant="outlined" 
                        onClick={() => setDrawerOpen(true)}
                        className="border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 transition-all duration-300 hover:shadow-lg rounded-xl! px-4"
                        aria-label="Abrir menu de navegação"
                        aria-expanded={drawerOpen}
                        aria-controls="mobile-menu-drawer"
                    >
                        <MenuIcon />
                    </Button>
                </div>
            </div>

            {/* Drawer Mobile */}
            <Drawer 
                anchor="right" 
                open={drawerOpen} 
                onClose={() => setDrawerOpen(false)}
                id="mobile-menu-drawer"
            >
                <div className="p-6 w-72">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Menu
                        </h2>
                        <div className="h-1 w-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full mt-2"></div>
                    </div>

                    <List component="nav" aria-label="Menu de navegação">
                        {menuItems.map((item, index) => (
                            <ListItem 
                                key={item.text} 
                                disablePadding 
                                className="mb-3"
                                style={{
                                    animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
                                }}
                            >
                                <div className="w-full">
                                    <Link
                                        className={`flex items-center w-full p-4 text-left rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                                            isActive(item.href) 
                                                ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105" 
                                                : "hover:bg-white hover:shadow-md hover:transform hover:scale-102 text-gray-700"
                                        }`}
                                        onClick={() => { setDrawerOpen(false); }}
                                        href={item.href}
                                        aria-label={item.text}
                                        aria-current={isActive(item.href) ? "page" : undefined}
                                    >
                                        <span className={`transition-transform duration-300 ${isActive(item.href) ? "scale-110" : "group-hover:scale-110"}`}>
                                            {item.icon}
                                        </span>
                                        <span className="ml-3 font-medium">{item.text}</span>
                                        {isActive(item.href) && (
                                            <span className="ml-auto">
                                                <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                            </span>
                                        )}
                                    </Link>
                                </div>
                            </ListItem>
                        ))}
                    </List>

                    <div className="mt-8 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-600 text-center">
                            Documentação não oficial
                        </p>
                    </div>
                </div>
            </Drawer>

            <style jsx global>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </header>
    );
}