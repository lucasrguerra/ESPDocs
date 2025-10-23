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

export default function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const pathname = usePathname();
    const menuItems = [
        { text: "Início", href: "/", icon: <HomeIcon /> },
        { text: "Sobre o Projeto", href: "/sobre", icon: <AboutIcon /> },
        { text: "Séries", href: "/series", icon: <ModelsIcon /> },
        { text: "Frameworks", href: "/frameworks", icon: <FrameworksIcon /> },
        { text: "Comparar Séries", href: "/comparacao", icon: <CompareIcon /> },
    ];

    function isActive(href) {
        if (href === "/") {
            return pathname === "/";
        }
        
        return String(pathname).includes(href) && href !== "/";
    }

    return (
        <header className="bg-white/80 backdrop-blur-md py-4 px-4 md:px-8 text-black shadow-lg border-b border-gray-100 sticky top-0 z-50">
            <div className="flex justify-between max-w-5xl mx-auto items-center">
                <Link href="/" className="group">
                    <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                        ESPDocs
                    </h1>
                </Link>

                <Button 
                    variant="outlined" 
                    onClick={() => setDrawerOpen(true)}
                    className="border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 transition-all duration-300 hover:shadow-lg rounded-xl! px-4"
                >
                    <MenuIcon className="" />
                </Button>
            </div>

            <Drawer 
                anchor="right" 
                open={drawerOpen} 
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    className: "bg-linear-to-br from-white via-blue-50 to-purple-50"
                }}
            >
                <div className="p-6 w-72">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Menu
                        </h2>
                        <div className="h-1 w-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full mt-2"></div>
                    </div>

                    <List>
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
                                        className={`flex items-center w-full p-4 text-left rounded-xl transition-all duration-300 ${
                                            isActive(item.href) 
                                                ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105" 
                                                : "hover:bg-white hover:shadow-md hover:transform hover:scale-102 text-gray-700"
                                        }`}
                                        onClick={() => { setDrawerOpen(false); }}
                                        href={item.href}
                                    >
                                        <span className={`transition-transform duration-300 ${isActive(item.href) ? "scale-110" : "group-hover:scale-110"}`}>
                                            {item.icon}
                                        </span>
                                        <span className="ml-3 font-medium">{item.text}</span>
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