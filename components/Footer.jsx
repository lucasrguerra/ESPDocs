"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Footer() {
	const [year, setYear] = useState(2026);

	useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);

	return (
		<footer role="contentinfo" aria-label="Rodapé do site ESPDocs" className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 mt-24 border-t border-slate-250/30 dark:border-slate-800/80">
			<div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
					
					{/* Coluna 1: Logo & Info */}
					<div className="space-y-4">
						<h3 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-100">
							ESPDocs
						</h3>
						<p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
							Plataforma brasileira e independente que centraliza e organiza informações técnicas sobre o ecossistema ESP32. Focada em clareza, usabilidade e agilidade no desenvolvimento de hardware.
						</p>
						
						<div className="pt-2">
							<a
								href="https://github.com/lucasrguerra/ESPDocs"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Ver repositório do ESPDocs no GitHub (abre em nova aba)"
								className="inline-flex items-center gap-2 bg-slate-200/60 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer hover:shadow-xs active:scale-[0.98]"
							>
								<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
									<path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.7 1.9-1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.4.9 1.1.9 2.2v3.2c0 .3.2.7.8.6A12 12 0 0012 .5z" fill="currentColor"/>
								</svg>
								<span>Ver no GitHub</span>
							</a>
						</div>
					</div>

					{/* Coluna 2: Links Úteis */}
					<nav aria-label="Links úteis" className="space-y-4">
						<h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
							Recursos
						</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href="/componentes"
									className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5 font-medium"
								>
									<span>ESP Component Registry</span>
								</Link>
							</li>
							<li>
								<Link
									href="/diagnostico"
									className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5 font-medium"
								>
									<span>Guia de Diagnóstico & Erros</span>
								</Link>
							</li>
							<li>
								<a
									href="https://github.com/lucasrguerra/ESPDocs"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
									aria-label="Abrir repositório no GitHub"
								>
									<span>Repositório Principal</span>
									<ExternalLink className="w-3.5 h-3.5 opacity-60" />
								</a>
							</li>
							<li>
								<a
									href="https://github.com/lucasrguerra/ESPDocs/issues"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
									aria-label="Abrir issues do repositório"
								>
									<span>Reportar um Bug / Feedback</span>
									<ExternalLink className="w-3.5 h-3.5 opacity-60" />
								</a>
							</li>
							<li>
								<a
									href="https://cienciaembarcada.com.br"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
									aria-label="Visitar Ciência Embarcada (abre em nova aba)"
								>
									<span className="font-semibold text-purple-600 dark:text-purple-400">Ciência Embarcada</span>
									<ExternalLink className="w-3.5 h-3.5 opacity-60 text-purple-600 dark:text-purple-400" />
								</a>
							</li>
						</ul>
					</nav>

					{/* Coluna 3: Autor & Social */}
					<div className="space-y-4">
						<h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
							Sobre o Autor
						</h4>
						<p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
							Desenvolvido com dedicação por{' '}
							<a
								href="https://linkedin.com/in/lucasrguerra"
								target="_blank"
								rel="noopener noreferrer"
								className="font-semibold underline text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
								aria-label="Perfil LinkedIn de Lucas Rayan Guerra (abre em nova aba)"
							>
								Lucas Rayan Guerra
							</a>
							, compartilhando eletrônica, IoT e computação no Brasil.
						</p>

						<div className="flex items-center gap-3 pt-2">
							<a
								href="https://github.com/lucasrguerra/ESPDocs"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-200/60 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-xs"
								aria-label="GitHub do projeto"
							>
								<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
									<path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.7 1.9-1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.4.9 1.1.9 2.2v3.2c0 .3.2.7.8.6A12 12 0 0012 .5z" fill="currentColor"/>
								</svg>
							</a>

							<a
								href="https://linkedin.com/in/lucasrguerra"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-200/60 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-xs"
								aria-label="LinkedIn do autor"
							>
								<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
									<path d="M4.98 3.5a2.5 2.5 0 11.001 5.001A2.5 2.5 0 014.98 3.5zM3 8.98h4v12H3v-12zM9.5 8.98h3.8v1.6h.1c.5-.9 1.8-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8v6.5h-4v-5.8c0-1.4-.1-3.2-2-3.2-2 0-2.3 1.6-2.3 3.1v5.9h-4v-12z" fill="currentColor"/>
								</svg>
							</a>
						</div>
					</div>
				</div>

				{/* Divisor & Isenção */}
				<div className="mt-12 pt-8 border-t border-slate-300 dark:border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
					<p className="text-center md:text-left leading-relaxed">
						© {year} ESPDocs. Esta plataforma independente de código aberto não possui afiliação com a Espressif Systems.
					</p>
					<p className="text-center md:text-right shrink-0">
						Feito para a comunidade maker 🇧🇷
					</p>
				</div>
			</div>
		</footer>
	);
}