import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import frameworksData from "@/public/frameworks.json";

export default function Frameworks() {
    const frameworks = Object.entries(frameworksData);

    return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
            <Header />

            <main id="conteudo" className="px-4 pt-16 pb-20 max-w-7xl mx-auto">
                <section className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-purple-200 shadow-sm">
                        <span className="text-xl">🛠️</span>
                        <span className="text-sm font-semibold text-gray-700">Ferramentas de Desenvolvimento</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight tracking-tight">
                        Frameworks ESP32
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Descubra os frameworks e bibliotecas disponíveis para ESP32. De desenvolvimento geral a 
                        aplicações especializadas em áudio, visão computacional, IA e IoT.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {frameworks.map(([key, framework]) => (
                        <Link
                            key={key}
                            href={`/frameworks/${key}`}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-gray-100 hover:border-opacity-50 h-full flex flex-col">
                                
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-5xl">{framework.icone}</span>
                                        <div className="flex flex-col gap-2 items-end">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                                                style={{ backgroundColor: framework.cor }}>
                                                {framework.linguagem}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <h2 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                                        {framework.nome}
                                    </h2>
                                    
                                    <p className="text-xs text-gray-500 mb-3 font-medium">
                                        {framework.nome_completo}
                                    </p>
                                    
                                    <p className="text-sm text-gray-600 line-clamp-3">
                                        {framework.descricao}
                                    </p>
                                </div>

                                <div className="p-6 space-y-4 grow">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold"
                                            style={{ 
                                                backgroundColor: `${framework.cor}20`, 
                                                color: framework.cor 
                                            }}>
                                            {framework.tipo}
                                        </span>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                            🎯 Função Principal
                                        </h4>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {framework.funcao_principal}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                            ⚡ Características
                                        </h4>
                                        <ul className="space-y-1">
                                            {framework.caracteristicas.slice(0, 3).map((carac, idx) => (
                                                <li key={idx} className="text-xs text-gray-600 flex items-start">
                                                    <span className="mr-2 mt-0.5" style={{ color: framework.cor }}>▪</span>
                                                    <span className="line-clamp-1">{carac}</span>
                                                </li>
                                            ))}
                                            {framework.caracteristicas.length > 3 && (
                                                <li className="text-xs text-gray-400 italic">
                                                    +{framework.caracteristicas.length - 3} mais...
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                            💼 Casos de Uso
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {framework.casos_uso.slice(0, 3).map((caso, idx) => (
                                                <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                    {caso}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 pb-6">
                                    <div className="flex items-center justify-between text-sm font-semibold group-hover:text-purple-600 transition-colors">
                                        <span>Ver Detalhes e Exemplos</span>
                                        <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 grid md:grid-cols-2 gap-8">
                    <div className="bg-linear-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-8 border-2 border-blue-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">🎓</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                Iniciante no ESP32?
                            </h3>
                        </div>
                        <p className="text-gray-700 mb-6 leading-relaxed text-base">
                            Se você está começando, recomendo iniciar com&nbsp;
                            <strong>Arduino</strong> ou&nbsp;
                            <strong>MicroPython</strong>&nbsp;
                            para prototipagem rápida, ou&nbsp;
                            <strong>ESP-IDF</strong> para projetos profissionais com controle total.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/frameworks/Arduino" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-200 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                <span className="text-lg">📘</span>
                                <span>Arduino</span>
                            </Link>
                            <Link href="/frameworks/MicroPython" className="inline-flex items-center gap-2 px-5 py-3 bg-purple-100 text-purple-700 rounded-xl text-sm font-bold hover:bg-purple-200 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                <span className="text-lg">🐍</span>
                                <span>MicroPython</span>
                            </Link>
                            <Link href="/frameworks/ESP-IDF" className="inline-flex items-center gap-2 px-5 py-3 bg-red-100 text-red-700 rounded-xl text-sm font-bold hover:bg-red-200 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                <span className="text-lg">⚙️</span>
                                <span>ESP-IDF</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-linear-to-br from-white to-purple-50 rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                Aplicações Especializadas?
                            </h3>
                        </div>
                        <p className="text-gray-700 mb-6 leading-relaxed text-base">
                            Para projetos específicos, explore frameworks especializados como&nbsp;
                            <strong>ESP-ADF</strong> (áudio),&nbsp;
                            <strong>ESP-WHO</strong> (visão),&nbsp;
                            <strong>ESP-NN</strong> (IA) ou&nbsp;
                            <strong>ESP-Matter</strong> (smart home).
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/frameworks/ESP-ADF" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-200 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                <span className="text-lg">🎵</span>
                                <span>Áudio</span>
                            </Link>
                            <Link href="/frameworks/ESP-WHO" className="inline-flex items-center gap-2 px-5 py-3 bg-orange-100 text-orange-700 rounded-xl text-sm font-bold hover:bg-orange-200 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                <span className="text-lg">📷</span>
                                <span>Visão</span>
                            </Link>
                            <Link href="/frameworks/ESP-NN" className="inline-flex items-center gap-2 px-5 py-3 bg-teal-100 text-teal-700 rounded-xl text-sm font-bold hover:bg-teal-200 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                <span className="text-lg">🧠</span>
                                <span>IA</span>
                            </Link>
                            <Link href="/frameworks/ESP-Matter" className="inline-flex items-center gap-2 px-5 py-3 bg-yellow-100 text-yellow-700 rounded-xl text-sm font-bold hover:bg-yellow-200 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                <span className="text-lg">🏠</span>
                                <span>Smart Home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}