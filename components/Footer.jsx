"use client";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer role="contentinfo" aria-label="Rodapé do site ESPDocs" className="bg-linear-to-r from-blue-600 to-purple-600 text-white mt-12">
            <div className="max-w-6xl mx-auto px-6 py-8 rounded-t-2xl shadow-inner border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-2xl font-extrabold tracking-tight">ESPDocs</h3>
                        <p className="text-sm text-white/90 max-w-sm">
                            Documentação não oficial em português para ESP32 — focada em clareza, exemplos práticos e comunidade.
                        </p>

                        <div className="">
                            <a
                                href="https://github.com/lucasrguerra/ESPDocs"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Ver repositório do ESPDocs no GitHub (abre em nova aba)"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="opacity-90">
                                    <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.7 1.9-1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.4.9 1.1.9 2.2v3.2c0 .3.2.7.8.6A12 12 0 0012 .5z" fill="currentColor"/>
                                </svg>
                                Ver no GitHub
                            </a>
                        </div>
                    </div>

                    <nav aria-label="Links úteis" className="text-sm">
                        <h4 className="text-sm font-semibold mb-2">Links úteis</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://github.com/lucasrguerra/ESPDocs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline text-white/95 focus:outline-none focus:ring-2 focus:ring-white/20 rounded"
                                    aria-label="Abrir repositório no GitHub"
                                >
                                    Repositório no GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/lucasrguerra/ESPDocs/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20 rounded"
                                    aria-label="Abrir issues do repositório"
                                >
                                    Reportar bug / Abrir issue
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://cienciaembarcada.com.br"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20 rounded"
                                    aria-label="Visitar Ciência Embarcada (abre em nova aba)"
                                >
                                    Ciência Embarcada
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Créditos</h4>
                        <p className="text-sm text-white/90">
                            Desenvolvido por{' '}
                            <a
                                href="https://linkedin.com/in/lucasrguerra"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-white"
                                aria-label="Perfil LinkedIn de Lucas Rayan Guerra (abre em nova aba)"
                            >
                                Lucas Rayan Guerra
                            </a>
                            .
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                            <a
                                href="https://github.com/lucasrguerra/ESPDocs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                                aria-label="GitHub do projeto"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.7 1.9-1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.4.9 1.1.9 2.2v3.2c0 .3.2.7.8.6A12 12 0 0012 .5z" fill="currentColor"/>
                                </svg>
                            </a>

                            <a
                                href="https://linkedin.com/in/lucasrguerra"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                                aria-label="LinkedIn do autor"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M4.98 3.5a2.5 2.5 0 11.001 5.001A2.5 2.5 0 014.98 3.5zM3 8.98h4v12H3v-12zM9.5 8.98h3.8v1.6h.1c.5-.9 1.8-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8v6.5h-4v-5.8c0-1.4-.1-3.2-2-3.2-2 0-2.3 1.6-2.3 3.1v5.9h-4v-12z" fill="currentColor"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-sm text-white/80 text-center">
                    <div>
                        © {year} ESPDocs — Conteúdo não oficial. Consulte sempre datasheets e documentos oficiais para decisões críticas.
                    </div>
                </div>
            </div>
        </footer>
    );
}