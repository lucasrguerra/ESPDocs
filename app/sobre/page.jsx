import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Sobre() {
    const features = [
        { icon: "📚", title: "Documentação Curada", desc: "Conteúdos organizados por níveis — do iniciante ao avançado." },
        { icon: "🔧", title: "Exemplos Práticos", desc: "Projetos e trechos de código para aprender fazendo." },
        { icon: "🌐", title: "Comunidade", desc: "Contribuições abertas e canal para dúvidas e trocas." },
        { icon: "♿", title: "Acessibilidade", desc: "Textos claros, contraste adequado e navegação por teclado." },
    ];

    return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen text-gray-800">
            <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow focus:ring-2 focus:ring-purple-500">
                Ir para o conteúdo
            </a>

            <Header />

            <main id="conteudo" className="px-4 pt-16 pb-20 max-w-6xl mx-auto">
                <header className="relative overflow-hidden rounded-2xl p-8 md:p-12 bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow-lg">
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-linear-to-r from-white to-purple-100 mb-3">
                            Sobre o ESPDocs
                        </h1>

                        <p className="text-lg md:text-xl opacity-90 max-w-3xl mb-6">
                            Uma documentação não oficial, em português, feita por um entusiasta e para
                            a comunidade — com foco em clareza, exemplos práticos e colaboração aberta.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                            <Link href="/" className="inline-flex items-center justify-center bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white" aria-label="Voltar para a página inicial">
                                ← Voltar
                            </Link>

                            <a
                                href="https://github.com/lucasrguerra/ESPDocs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-white/20 border border-white/30 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                                aria-label="Abrir repositório do projeto no GitHub (abre em nova aba)"
                            >
                                Contribuir no GitHub
                            </a>
                        </div>
                    </div>
                </header>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <section className="md:col-span-2 space-y-6">
                        <article className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-2">Missão</h2>
                            <p className="text-gray-700 leading-relaxed text-justify">
                                Facilitar o aprendizado e acelerar projetos com ESP32 por meio de
                                documentação clara, exemplos testados e comparativos práticos.
                                Priorizei traduções fiéis, explicações passo a passo e dicas
                                baseadas em experiência real de desenvolvimento.
                            </p>
                        </article>

                        <article className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-2">Por que o ESPDocs?</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Informações técnicas frequentemente estão dispersas entre datasheets,
                                fóruns e repositórios. O ESPDocs centraliza esse conteúdo em português,
                                com foco em aplicabilidade.
                            </p>

                            <ul role="list" className="grid sm:grid-cols-2 gap-4">
                                {features.map((f) => (
                                    <li key={f.title} className="flex gap-3 items-start bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        <div className="text-2xl" aria-hidden="true">{f.icon}</div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{f.title}</h3>
                                            <p className="text-sm text-gray-600">{f.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </article>

                        <article className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-2">Como contribuir</h2>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                Correções, traduções e novos exemplos são bem-vindos. Abra uma
                                issue ou um pull request no repositório. Busco por clareza nas
                                descrições e exemplos testáveis.
                            </p>
                            <ol className="list-decimal list-inside text-gray-700 space-y-1">
                                <li>Fork do repositório e crie uma branch clara.</li>
                                <li>Adicione exemplos ou corrija o conteúdo com referências quandopossível.</li>
                                <li>Abra um PR e descreva o que foi alterado.</li>
                            </ol>
                        </article>

                        <article className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-2">Acessibilidade</h2>
                            <p className="text-gray-700 leading-relaxed">
                                O site prioriza leitura, contraste legível e navegação por teclado.
                                Se encontrar barreiras, por favor relate para que eu possa melhorar.
                            </p>
                        </article>
                    </section>

                    <aside className="space-y-4">
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                            <div className="flex flex-col items-center mb-4">
                                <img 
                                    src="/logo.png" 
                                    alt="Ciência Embarcada" 
                                    className="h-16 mb-3"
                                />
                                <h3 className="text-lg font-semibold text-center">Sobre o Autor</h3>
                            </div>

                            <p className="text-gray-700 text-sm leading-relaxed mb-4 text-justify">
                                <strong>Lucas Rayan Guerra</strong>, criador do <a 
                                    href="https://cienciaembarcada.com.br" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:text-purple-800 font-semibold"
                                >
                                    Ciência Embarcada
                                </a>, é Técnico em Desenvolvimento de Sistemas, estudante de Ciência da Computação na UFRPE e de Blockchain e Criptografia Digital na FMU.
                            </p>

                            <p className="text-gray-700 text-sm leading-relaxed mb-4 text-justify">
                                Recifense apaixonado por Pernambuco, Diretor de Software da Semine AgriTech e palestrante em eventos como o REC'n'Play, Lucas compartilha conhecimento sobre ESP32, Eletrônica, IoT, Cibersegurança e muito mais.
                            </p>

                            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-4 text-justify">
                                <p className="text-sm text-gray-700 italic">
                                    "O Ciência Embarcada nasceu do desejo de criar um espaço livre e organizado para compartilhar conhecimentos e experiências sobre tecnologia e ciência."
                                </p>
                            </div>

                            <a
                                href="https://cienciaembarcada.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
                            >
                                🚀 Visitar Ciência Embarcada
                            </a>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-semibold">Contribua</h3>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Open Source</span>
                            </div>

                            <p className="text-gray-700 mb-4">
                                Ajude a melhorar o ESPDocs com exemplos, correções e traduções.
                            </p>

                            <div className="flex flex-col gap-3">
                                <a
                                    href="https://github.com/lucasrguerra/ESPDocs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    aria-label="Abrir repositório no GitHub"
                                >
                                    Ver repositório
                                </a>
                            </div>

                            <div className="mt-4 text-sm text-gray-500">
                                <strong>Nota:</strong> Conteúdo não oficial. Consulte sempre datasheets
                                e documentos oficiais para decisões críticas.
                            </div>
                        </div>

                        <div className="bg-white/80 rounded-2xl p-4 shadow-sm border border-gray-100">
                            <h4 className="font-semibold mb-2">Resumo</h4>
                            <ul className="text-sm text-gray-700 space-y-2">
                                <li>🔎 Conteúdo técnico explicado.</li>
                                <li>🧪 Exemplos e projetos.</li>
                                <li>🤝 Comunidade e contribuições.</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}