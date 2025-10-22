import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"] });

export const metadata = {
	title: "ESPDocs",
	description: "Documentação não oficial do ESP32 em português.",
	authors: { name: "Lucas Rayan Guerra", url: "https://cienciaembarcada.com.br" },
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt-BR">
			<body className={`${roboto.className} font-sans`}>
				{children}
			</body>
		</html>
	);
}
