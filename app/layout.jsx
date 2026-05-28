import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const outfit = Outfit({ 
	subsets: ["latin"],
	variable: "--font-outfit",
	display: "swap",
});

const inter = Inter({ 
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata = {
	title: "ESPDocs",
	description: "Documentação não oficial do ESP32 em português.",
	authors: { name: "Lucas Rayan Guerra", url: "https://cienciaembarcada.com.br" },
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt-BR" className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
			<body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
