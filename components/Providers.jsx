"use client";

import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} disableTransitionOnChange>
			{children}
		</ThemeProvider>
	);
}
