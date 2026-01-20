import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import seriesData from "@/public/series.json";

export default function Series() {
    const series = Object.entries(seriesData);

    return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
            <Header />

            <main id="conteudo" className="px-4 pt-16 pb-20 max-w-7xl mx-auto">
                <section className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-purple-200 shadow-sm">
                        <span className="text-xl">⚡</span>
                        <span className="text-sm font-semibold text-gray-700">Explore o Ecossistema ESP32</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight tracking-tight">
                        Séries ESP32
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Explore toda a família ESP32. Cada série foi projetada para atender necessidades específicas,
                        desde projetos simples até aplicações de IA e IoT avançadas.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {series.map(([key, serie]) => (
                        <Link
                            key={key}
                            href={`/series/${key}`}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-gray-100 hover:border-opacity-50 h-full"
                                style={{ '--hover-color': serie.cor }}>
                                
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-4xl">{serie.icone}</span>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                                            style={{ backgroundColor: serie.cor }}>
                                            {serie.arquitetura.includes("RISC-V") ? "RISC-V" : "Xtensa"}
                                        </span>
                                    </div>
                                    
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                                        {key}
                                    </h2>
                                    
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {serie.descricao}
                                    </p>
                                </div>

                                <div className="p-6 space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">⚙️ Núcleos:</span>
                                        <span className="font-semibold text-gray-800">{serie.nucleos}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">🚀 Frequência:</span>
                                        <span className="font-semibold text-gray-800">{serie.frequencia}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">💾 SRAM:</span>
                                        <span className="font-semibold text-gray-800">{serie.memoria_sram}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">📶 Wi-Fi:</span>
                                        <span className="font-semibold text-gray-800">
                                            {String(serie.wifi).includes("Não") ? "❌" : "✅"}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">📱 Bluetooth:</span>
                                        <span className="font-semibold text-gray-800">
                                            {serie.bluetooth === "Não" ? "❌" : "✅"}
                                        </span>
                                    </div>

                                    {serie.consumo_energia?.deep_sleep && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">🔋 Deep Sleep:</span>
                                            <span className="font-semibold text-gray-800">{serie.consumo_energia.deep_sleep}</span>
                                        </div>
                                    )}

                                    {serie.aceleradores_ia && (
                                        <div className="pt-2 border-t border-gray-100">
                                            <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                                                🤖 Aceleradores IA
                                            </span>
                                        </div>
                                    )}

                                    {serie.matter === "Sim" && (
                                        <div className="pt-2 border-t border-gray-100">
                                            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                                                🏠 Suporte Matter
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="px-6 pb-6">
                                    <div className="flex items-center justify-between text-sm font-semibold group-hover:text-purple-600 transition-colors">
                                        <span>Ver Detalhes</span>
                                        <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 bg-linear-to-br from-white to-purple-50 rounded-3xl shadow-2xl p-10 border-2 border-purple-100">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                            <span className="text-3xl">💡</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">
                            Não sabe qual escolher?
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-base">
                            Compare as especificações de cada série para encontrar a mais adequada ao seu projeto.
                            Considere requisitos de conectividade, processamento e recursos específicos.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href="/comparacao"
                            className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <span className="text-xl">📊</span>
                            <span>Comparar Séries</span>
                            <svg 
                                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}