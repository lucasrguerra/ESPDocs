import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import frameworksData from "@/public/frameworks.json";
import { notFound } from "next/navigation";

export default function FrameworkDetail({ params }) {
    const { key } = params;
    const framework = frameworksData[key];

    if (!framework) {
        notFound();
    }

    const features = framework.caracteristicas || [];
    const useCases = framework.casos_uso || [];

    return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
            <Header />

            <main className="px-4 pt-16 pb-8 max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link href="/frameworks" className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors mb-4">
                        <span className="mr-2">←</span> Voltar para Frameworks
                    </Link>

                    <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100"
                        style={{ borderColor: framework.cor + '30' }}>
                        <div className="flex items-start justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <span className="text-6xl">{framework.icone}</span>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
                                        {framework.nome}
                                    </h1>
                                    <p className="text-xl text-gray-600 mb-2">{framework.nome_completo}</p>
                                    <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white"
                                        style={{ backgroundColor: framework.cor }}>
                                        {framework.tipo}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {framework.documentacao && (
                                    <a
                                        href={framework.documentacao}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-xl font-semibold shadow hover:shadow-lg transition"
                                    >
                                        📘 Documentação
                                    </a>
                                )}

                                {framework.repositorio && (
                                    <a
                                        href={framework.repositorio}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-white text-gray-800 px-5 py-2 rounded-xl font-semibold shadow border-2 border-gray-100 hover:border-purple-300 transition"
                                    >
                                        🔗 Repositório
                                    </a>
                                )}
                            </div>
                        </div>

                        <p className="text-lg text-gray-700 mt-6 leading-relaxed">
                            {framework.descricao}
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4" style={{ borderColor: framework.cor }}>
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">LINGUAGEM</h3>
                        <p className="text-3xl font-bold text-gray-800">{framework.linguagem}</p>
                        <p className="text-gray-600 mt-1">Principal</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4" style={{ borderColor: framework.cor }}>
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">TIPO</h3>
                        <p className="text-3xl font-bold text-gray-800">{framework.tipo}</p>
                        <p className="text-gray-600 mt-1">Categoria</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4" style={{ borderColor: framework.cor }}>
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">FUNÇÃO PRINCIPAL</h3>
                        <p className="text-3xl font-bold text-gray-800">{framework.funcao_principal}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-3 border-b-2" style={{ borderColor: framework.cor }}>
                            ✨ Principais Características
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {features.map((f, i) => (
                                <li key={i} className="pl-2">{f}</li>
                            ))}
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-3 border-b-2" style={{ borderColor: framework.cor }}>
                            📦 Casos de Uso
                        </h2>
                        <div className="grid md:grid-cols-2 gap-3">
                            {useCases.map((u, i) => (
                                <div key={i} className="bg-gray-50 p-3 rounded-lg text-gray-700">{u}</div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-3 border-b-2" style={{ borderColor: framework.cor }}>
                            📋 Detalhes Rápidos
                        </h2>
                        <div className="space-y-3 text-gray-700">
                            <div><span className="font-semibold">Nome completo:</span> {framework.nome_completo}</div>
                            <div><span className="font-semibold">Linguagem:</span> {framework.linguagem}</div>
                            <div><span className="font-semibold">Tipo:</span> {framework.tipo}</div>
                            <div><span className="font-semibold">Cor (tema):</span> <span className="inline-block w-4 h-4 rounded ml-2" style={{ backgroundColor: framework.cor }} /></div>
                        </div>
                    </div>
                </div>

                {framework.exemplo_codigo && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ borderColor: framework.cor }}>
                            Exemplo de Código
                        </h3>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-sm" style={{ maxHeight: 480 }}>
                            <pre className="whitespace-pre-wrap">
                                <code>{framework.exemplo_codigo}</code>
                            </pre>
                        </div>
                    </div>
                )}

                <div className="flex gap-4 mt-6">
                    {framework.documentacao && (
                        <a
                            href={framework.documentacao}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:shadow-xl transition"
                        >
                            📚 Documentação Oficial
                        </a>
                    )}

                    {framework.repositorio && (
                        <a
                            href={framework.repositorio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold shadow border-2 border-gray-100 hover:border-purple-300 transition"
                        >
                            💻 Repositório no GitHub
                        </a>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export async function generateMetadata({ params }) {
    const { key } = params;
    const framework = frameworksData[key];

    if (!framework) {
        return { title: "Framework não encontrado" };
    }

    return {
        title: `${framework.nome} - ${framework.nome_completo}`,
        description: framework.descricao,
    };
}

export async function generateStaticParams() {
    return Object.keys(frameworksData).map((key) => ({ key }));
}