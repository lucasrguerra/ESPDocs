import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import frameworksData from "@/public/frameworks.json";

export default function Frameworks() {
    const frameworks = Object.entries(frameworksData);

    return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
            <Header />

            <main className="px-4 pt-16 pb-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        Frameworks ESP32
                    </h1>
                    
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Descubra os frameworks e bibliotecas disponíveis para ESP32. De desenvolvimento geral a 
                        aplicações especializadas em áudio, visão computacional, IA e IoT.
                    </p>
                </div>

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

                <div className="mt-12 grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            🎓 Iniciante no ESP32?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Se você está começando, recomendo iniciar com&nbsp;
                            <strong>Arduino</strong> ou&nbsp;
                            <strong>MicroPython</strong>&nbsp;
                            para prototipagem rápida, ou&nbsp;
                            <strong>ESP-IDF</strong> para projetos profissionais com controle total.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/frameworks/Arduino" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors">
                                📘 Arduino
                            </Link>
                            <Link href="/frameworks/MicroPython" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-colors">
                                🐍 MicroPython
                            </Link>
                            <Link href="/frameworks/ESP-IDF" className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors">
                                ⚙️ ESP-IDF
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            🚀 Aplicações Especializadas?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Para projetos específicos, explore frameworks especializados como&nbsp;
                            <strong>ESP-ADF</strong> (áudio),&nbsp;
                            <strong>ESP-WHO</strong> (visão),&nbsp;
                            <strong>ESP-NN</strong> (IA) ou&nbsp;
                            <strong>ESP-Matter</strong> (smart home).
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/frameworks/ESP-ADF" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors">
                                🎵 Áudio
                            </Link>
                            <Link href="/frameworks/ESP-WHO" className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-semibold hover:bg-orange-200 transition-colors">
                                📷 Visão
                            </Link>
                            <Link href="/frameworks/ESP-NN" className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg text-sm font-semibold hover:bg-teal-200 transition-colors">
                                🧠 IA
                            </Link>
                            <Link href="/frameworks/ESP-Matter" className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold hover:bg-yellow-200 transition-colors">
                                🏠 Smart Home
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg p-8 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">
                                💡 Precisa de Ajuda para Escolher?
                            </h3>
                            <p className="text-blue-100">
                                Compare frameworks, veja exemplos de código e entenda qual se adequa melhor ao seu projeto.
                            </p>
                        </div>
                        <Link
                            href="/comparacao-frameworks"
                            className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
                        >
                            📊 Comparar Frameworks
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}