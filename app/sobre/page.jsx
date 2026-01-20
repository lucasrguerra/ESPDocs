import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Sobre() {
    const features = [
        { icon: "📚", title: "Interface em Português", desc: "Organização e apresentação de dados técnicos totalmente em português." },
        { icon: "🔧", title: "Comparações Visuais", desc: "Tabelas comparativas e diagramas para facilitar a escolha da série ideal." },
        { icon: "🌐", title: "Acesso Centralizado", desc: "Links diretos para documentação oficial, repositórios e exemplos." },
        { icon: "♿", title: "Código Aberto", desc: "Projeto open-source com contribuições bem-vindas no GitHub." },
    ];

    return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen text-gray-800">
            <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow focus:ring-2 focus:ring-purple-500">
                Ir para o conteúdo
            </a>

            <Header />

            <main id="conteudo" className="px-4 pt-12 pb-20 max-w-7xl mx-auto">
                <header className="relative overflow-hidden rounded-3xl p-10 md:p-16 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl mb-12">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                            Sobre o ESPDocs
                        </h1>

                        <p className="text-lg md:text-xl opacity-95 max-w-3xl mb-8 leading-relaxed">
                            Uma plataforma não oficial com interface em português que organiza
                            informações técnicas do ESP32 e facilita o acesso à documentação oficial
                            da Espressif. Feita por um entusiasta para a comunidade.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <Link href="/" className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1" aria-label="Voltar para a página inicial">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Voltar</span>
                            </Link>

                            <a
                                href="https://github.com/lucasrguerra/ESPDocs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all"
                                aria-label="Abrir repositório do projeto no GitHub (abre em nova aba)"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.7 1.9-1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.4.9 1.1.9 2.2v3.2c0 .3.2.7.8.6A12 12 0 0012 .5z" fill="currentColor"/>
                                </svg>
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>
                </header>

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <section className="lg:col-span-2 space-y-8">
                        <article className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-purple-200 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">🎯</span>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Missão</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-base">
                                Facilitar o acesso e a compreensão do ecossistema ESP32 através de uma
                                interface em português que organiza especificações técnicas, compara séries,
                                apresenta frameworks e centraliza links para a documentação oficial da
                                Espressif. O objetivo é economizar tempo na busca por informações técnicas.
                            </p>
                        </article>

                        <article className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">❓</span>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Por que o ESPDocs?</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-6 text-base">
                                As informações sobre ESP32 estão dispersas em datasheets (PDF), repositórios
                                GitHub e documentação oficial — tudo em inglês. O ESPDocs organiza essas
                                informações em uma interface em português, facilitando comparações e consultas
                                rápidas antes de mergulhar na documentação técnica oficial.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {features.map((f) => (
                                    <div key={f.title} className="flex gap-4 items-start bg-linear-to-br from-gray-50 to-white p-5 rounded-xl border-2 border-gray-100 hover:border-purple-200 transition-colors">
                                        <div className="text-3xl shrink-0" aria-hidden="true">{f.icon}</div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-1 text-base">{f.title}</h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-linear-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">🤝</span>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Como contribuir</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4 text-base">
                                Correções, traduções e novos exemplos são bem-vindos. Abra uma
                                issue ou um pull request no repositório. Busco por clareza nas
                                descrições e exemplos testáveis.
                            </p>
                            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-5 border-2 border-blue-100">
                                <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm">
                                    <li className="font-medium">Fork do repositório e crie uma branch clara.</li>
                                    <li className="font-medium">Adicione exemplos ou corrija o conteúdo com referências quando possível.</li>
                                    <li className="font-medium">Abra um PR e descreva o que foi alterado.</li>
                                </ol>
                            </div>
                        </article>

                        <article className="bg-linear-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg border-2 border-purple-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">♿</span>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Acessibilidade</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-base">
                                O site prioriza leitura, contraste legível e navegação por teclado.
                                Se encontrar barreiras, por favor relate para que eu possa melhorar.
                            </p>
                        </article>
                    </section>

                    <aside className="space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-purple-200 transition-colors">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-20 h-20 bg-linear-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-4">
                                    <img 
                                        src="/logo.png" 
                                        alt="Ciência Embarcada" 
                                        className="h-16 w-16 object-contain"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 text-center">Sobre o Autor</h3>
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
                                <strong>Importante:</strong> Esta é uma plataforma de organização de informações, não uma
                                tradução da documentação oficial. A interface está em português, mas datasheets, manuais
                                técnicos e repositórios linkados são da Espressif e estão em inglês. Para decisões
                                técnicas críticas, sempre consulte a documentação oficial.
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