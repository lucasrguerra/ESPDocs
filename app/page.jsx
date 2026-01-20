import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
	const resources = [
        {name: "Catálogo de Placas", description: "Encontre placas de desenvolvimento ESP32 verificadas com filtros avançados e links seguros para compra", icon: "🛒"},
		{name: "Especificações Organizadas", description: "Especificações técnicas de cada série ESP32 organizadas em tabelas comparativas em português", icon: "🔧"},
		{name: "Diagramas de Conexões", description: "Visualize diagramas interativos dos componentes e pinos de cada série ESP32", icon: "📊"},
		{name: "Informações sobre Frameworks", description: "Conheça frameworks como ESP-IDF, Arduino e MicroPython com descrições, casos de uso e exemplos", icon: "⚡"},
		{name: "Comparação de Séries", description: "Compare lado a lado as especificações de diferentes séries ESP32 em uma única visualização", icon: "📈"},
		{name: "Links para Documentação", description: "Acesso direto aos datasheets, manuais técnicos e guias oficiais da Espressif (em inglês)", icon: "📄"},
		{name: "Exemplos de Código", description: "Snippets de código básico para diferentes frameworks com links para repositórios oficiais", icon: "💻"},
        {name: "Informações Atualizadas", description: "Dados atualizados sobre as séries e frameworks mais recentes do ecossistema ESP32", icon: "🔄"},
        {name: "Interface em Português", description: "Navegação e organização de informações totalmente em português para facilitar a consulta", icon: "📚"},
    ]

    return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
			<Header />

            <main className="px-4 pt-12 pb-16 max-w-7xl mx-auto">
                {/* Hero Section */}
                <section className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 tracking-tight">
                        ESPDocs
                    </h1>
                    
                    <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-800 font-bold mb-6 max-w-4xl mx-auto leading-tight">
                        Organização e acesso facilitado ao ecossistema ESP32
                    </h2>
                    
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
                        Plataforma não oficial com interface em português que organiza e centraliza
                        informações sobre ESP32. Compare especificações, visualize diagramas e acesse
                        a documentação oficial da Espressif.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            className="group inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                            href="/series"
                        >
                            <span className="text-xl">📚</span>
                            <span>Explorar Séries ESP32</span>
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>

                        <Link
                            className="group inline-flex items-center gap-3 bg-white text-gray-800 px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-purple-500 transform hover:-translate-y-1 transition-all duration-300"
                            href="/frameworks"
                        >
                            <span className="text-xl">⚡</span>
                            <span>Frameworks</span>
                        </Link>

                        <Link
                            className="group inline-flex items-center gap-3 bg-white text-gray-800 px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-purple-500 transform hover:-translate-y-1 transition-all duration-300"
                            href="/catalogo"
                        >
                            <span className="text-xl">🛒</span>
                            <span>Catálogo</span>
                        </Link>
                    </div>
                </section>

                {/* Recursos Section */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recursos da Plataforma</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Ferramentas e informações organizadas para facilitar seu trabalho com ESP32</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.map((resource, index) => (
                            <div 
                                key={resource.name} 
                                className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-200"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-4xl shrink-0 transform group-hover:scale-110 transition-transform">
                                        {resource.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                            {resource.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {resource.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Ciência Embarcada Section */}
                <section className="mb-12">
                    <div className="bg-linear-to-br from-white to-purple-50 rounded-3xl shadow-xl p-8 md:p-12 border-2 border-purple-100">
						{/* Logo e Link do Ciência Embarcada */}
						<div className="flex flex-col items-center mb-6">
							<a 
								href="https://cienciaembarcada.com.br" 
								target="_blank" 
								rel="noopener noreferrer"
								className="group"
							>
								<img 
									src="/logo.png" 
									alt="Ciência Embarcada" 
									className="h-16 md:h-20 mb-4 transition-transform duration-300 group-hover:scale-110"
								/>
							</a>
							<p className="text-lg font-semibold text-gray-800 mb-2">
								Conteúdo por <a 
									href="https://cienciaembarcada.com.br" 
									target="_blank" 
									rel="noopener noreferrer"
									className="text-purple-600 hover:text-purple-800 transition-colors"
								>
									Ciência Embarcada
								</a>
							</p>
							<p className="text-sm text-gray-600 max-w-xl text-center mb-4">
								Artigos sobre ESP32, Eletrônica, IoT, Cibersegurança e muito mais.
								Visite o blog para aprender com tutoriais práticos e projetos reais!
							</p>
							<a
								href="https://cienciaembarcada.com.br"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
							>
								🚀 Visitar Blog
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
							</a>
						</div>

                        {/* Disclaimer */}
                        <div className="border-t-2 border-purple-200 pt-6 mt-6">
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        <strong className="font-semibold text-gray-900">Plataforma não oficial:</strong> O ESPDocs é independente e sem afiliação com a Espressif Systems. 
                                        Organiza informações públicas e links para documentação oficial. Para dados técnicos críticos, 
                                        consulte sempre os datasheets e manuais oficiais da Espressif.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> 
            </main>

			<Footer />
        </div>
    );
}