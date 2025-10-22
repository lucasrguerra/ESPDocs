import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
	const resources = [
		{name: "Detalhes Técnicos", description: "Explore as especificações técnicas de cada série ESP32, incluindo arquitetura, recursos e capacidades", icon: "🔧"},
		{name: "Diagramas Interativos", description: "Visualize diagramas detalhados dos componentes ESP32 com interatividade para melhor compreensão", icon: "📊"},
		{name: "Frameworks Avançados", description: "Aprenda sobre frameworks populares como ESP-IDF, Arduino e MicroPython para desenvolvimento com ESP32", icon: "⚡"},
		{name: "Comparação de Séries", description: "Compare diferentes séries ESP32 para escolher o mais adequado ao seu projeto", icon: "📈"},
		{name: "Datasheets", description: "Acesso direto aos datasheets oficiais para informações detalhadas sobre cada série", icon: "📄"},
		{name: "Exemplos de Código", description: "Encontre exemplos práticos de código para iniciar rapidamente seus projetos com ESP32", icon: "💻"},
	]

    return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
			<Header />

            <main className="text-center px-4 pt-16 pb-8 max-w-5xl mx-auto">
                <div className="inline-block mb-6">
                    <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        🚀 Documentação em Português
                    </div>
                </div>
                
                <h1 className="text-6xl md:text-7xl font-extrabold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-fade-in">
                    ESPDocs
                </h1>
                
                <h2 className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6">
                    Ecossistema ESP32 em Português
                </h2>
                
                <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed mb-12">
                    Documentação não oficial completa para facilitar seu aprendizado e desenvolvimento 
                    com ESP32. Explore especificações, diagramas, frameworks e muito mais!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                    <Link
						className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
						href="/series"
					>
						📚 Ver Séries
                    </Link>

                    <Link
						className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-purple-400 transform hover:-translate-y-1 transition-all duration-300"
						href="/frameworks"
					>
						⚡ Ver Frameworks
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-16">
                    {resources.map((resource) => (
                        <div key={resource.name} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                            <div className="text-5xl mb-4">{resource.icon}</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                {resource.name}
                            </h3>
                            <p className="text-gray-600">
                                {resource.description}
                            </p>
                        </div>
                    ))}
                </div>

				<div className="mt-12 px-4 md:px-16">
					<p className="text-md">
						O ESPDocs é uma documentação não oficial e independente, criada por
						um entusiasta da comunidade ESP32 e que não possui nenhum tipo de afiliação
						com a Espressif Systems, fabricante dos chips ESP32. Todas as informações
						são coletadas de fontes públicas e experiências pessoais de desenvolvimento.
					</p>
				</div> 
            </main>

			<Footer />
        </div>
    );
}