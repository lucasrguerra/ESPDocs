import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { SITE, jsonLd } from "@/lib/seo";

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
	// metadataBase é o que transforma caminhos relativos em URLs absolutas nas
	// tags canonical e og:image. Sem ele, o Google recebe og:image quebrado.
	metadataBase: new URL(SITE.url),

	title: {
		default: "ESPDocs · Documentação do ESP32 em português",
		// Cada página fornece só o próprio nome; o sufixo entra automaticamente.
		template: "%s · ESPDocs",
	},
	description:
		"Especificações, pinagem, comparação e seleção das 12 séries de microcontroladores ESP32, em português brasileiro. Datasheets, periféricos, segurança em hardware e diagramas de conexão.",

	applicationName: "ESPDocs",
	authors: [{ name: "Lucas Rayan Guerra", url: "https://lucasrguerra.dev.br" }],
	creator: "Lucas Rayan Guerra",
	publisher: "Ciência Embarcada",
	category: "technology",

	keywords: [
		"ESP32", "ESP32 português", "documentação ESP32", "pinout ESP32",
		"ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-P4", "ESP32-H2",
		"comparar ESP32", "qual ESP32 escolher", "datasheet ESP32",
		"microcontrolador", "Espressif", "ESP-IDF", "IoT", "sistemas embarcados",
	],

	alternates: { canonical: "/" },

	openGraph: {
		type: "website",
		locale: "pt_BR",
		url: SITE.url,
		siteName: "ESPDocs",
		title: "ESPDocs · Documentação do ESP32 em português",
		description:
			"Especificações, pinagem, comparação e seleção das 12 séries de microcontroladores ESP32, em português brasileiro.",
	},

	twitter: {
		card: "summary_large_image",
		title: "ESPDocs · Documentação do ESP32 em português",
		description:
			"Especificações, pinagem, comparação e seleção das 12 séries de ESP32, em português.",
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},

	icons: { icon: "/marca/espdocs-marca.svg", apple: "/marca/espdocs-marca.svg" },
	formatDetection: { telephone: false, address: false, email: false },
};

export const viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f8fafc" },
		{ media: "(prefers-color-scheme: dark)", color: "#020617" },
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt-BR" className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
			<head>
				{/* Dados estruturados do site e da organização. É o que permite ao
				    Google montar o box de busca interna e entender a autoria. */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.siteESociedade()) }}
				/>
			</head>
			<body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300" suppressHydrationWarning>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
