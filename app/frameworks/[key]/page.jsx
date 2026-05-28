import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import CodeExample from "@/components/CodeExample";
import frameworksData from "@/public/frameworks.json";
import { 
	ArrowLeft, 
	BookOpen, 
	Code, 
	Layers, 
	Zap, 
	Compass, 
	CheckCircle, 
	Terminal, 
	FileText, 
	Sliders,
	Award,
	Target
} from "lucide-react";

export default async function FrameworkDetail({ params }) {
	const { key } = await params;
	const framework = frameworksData[key];

	if (!framework) {
		notFound();
	}

	const features = framework.caracteristicas || [];
	const useCases = framework.casos_uso || [];

	return (
		<div className="bg-gradient-to-br from-slate-50 via-white to-purple-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<Header />

			<main className="px-6 pt-16 pb-24 max-w-7xl mx-auto">
				{/* Back navigation link */}
				<div className="mb-8">
					<Link 
						href="/frameworks" 
						className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors uppercase tracking-wider mb-6"
					>
						<ArrowLeft className="w-3.5 h-3.5" /> 
						<span>Voltar para Frameworks</span>
					</Link>

					{/* Top Info Banner Panel */}
					<div 
						className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border relative overflow-hidden"
						style={{ borderColor: `${framework.cor}40` }}
					>
						<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
							<div className="flex items-center gap-5">
								<span className="text-6xl select-none filter drop-shadow-md">{framework.icone}</span>
								<div>
									<h1 className="text-4xl font-display font-extrabold text-slate-850 dark:text-slate-100 tracking-tight leading-none mb-3">
										{framework.nome}
									</h1>
									<p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mb-4">{framework.nome_completo}</p>
									<span 
										className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest select-none"
										style={{ backgroundColor: `${framework.cor}18`, color: framework.cor, border: `1px solid ${framework.cor}30` }}
									>
										{framework.tipo}
									</span>
								</div>
							</div>

							{/* Call to Actions CTA Grid */}
							<div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3 w-full lg:w-auto">
								{framework.documentacao && (
									<a
										href={framework.documentacao}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg"
									>
										<BookOpen className="w-4 h-4" />
										<span>Documentação Oficial</span>
									</a>
								)}

								{framework.repositorio && (
									<a
										href={framework.repositorio}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-purple-500/20 transition-all shadow-xs"
									>
										<Code className="w-4 h-4" />
										<span>Repositório no GitHub</span>
									</a>
								)}
							</div>
						</div>

						<p className="text-sm text-slate-500 dark:text-slate-200 mt-6 leading-relaxed max-w-4xl font-semibold">
							{framework.descricao}
						</p>
					</div>
				</div>

				{/* Framework Core Specifications Grid */}
				<div className="grid md:grid-cols-3 gap-6 mb-8 select-none animate-fadeIn">
					<div 
						className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-lg p-6 border-l-4" 
						style={{ borderColor: framework.cor }}
					>
						<h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
							<Code className="w-3.5 h-3.5 text-blue-500" />
							<span>LINGUAGEM DE DESENVOLVIMENTO</span>
						</h3>
						<p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{framework.linguagem}</p>
						<p className="text-xs text-slate-400 mt-1">Sintaxe principal do ecossistema</p>
					</div>

					<div 
						className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-lg p-6 border-l-4" 
						style={{ borderColor: framework.cor }}
					>
						<h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
							<Layers className="w-3.5 h-3.5 text-purple-500" />
							<span>CATEGORIA DO FRAMEWORK</span>
						</h3>
						<p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{framework.tipo}</p>
						<p className="text-xs text-slate-400 mt-1">Classificação de arquitetura</p>
					</div>

					<div 
						className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-lg p-6 border-l-4" 
						style={{ borderColor: framework.cor }}
					>
						<h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-450 mb-1.5 flex items-center gap-1.5">
							<Target className="w-3.5 h-3.5 text-emerald-500" />
							<span>OBJETIVO PRINCIPAL</span>
						</h3>
						<p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed mt-1.5">{framework.funcao_principal}</p>
					</div>
				</div>

				{/* side-by-side details block */}
				<div className="grid lg:grid-cols-3 gap-6 mb-8 items-start">
					{/* Left specs card */}
					<div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/45 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl space-y-8">
						<div>
							<h2 
								className="text-lg font-display font-extrabold text-slate-850 dark:text-slate-100 mb-6 pb-3 border-b flex items-center gap-2.5 select-none" 
								style={{ borderBottomColor: `${framework.cor}30` }}
							>
								<Zap className="w-5 h-5" style={{ color: framework.cor }} />
								<span>Características de Destaque</span>
							</h2>
							
							<ul className="space-y-3">
								{features.map((feature, i) => (
									<li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-650 dark:text-slate-200">
										<CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-450 mt-0.5 shrink-0" />
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h2 
								className="text-lg font-display font-extrabold text-slate-850 dark:text-slate-100 mb-6 pb-3 border-b flex items-center gap-2.5 select-none" 
								style={{ borderBottomColor: `${framework.cor}30` }}
							>
								<Compass className="w-5 h-5" style={{ color: framework.cor }} />
								<span>Casos de Uso Recomendados</span>
							</h2>
							
							<div className="grid md:grid-cols-2 gap-3.5">
								{useCases.map((useCase, i) => (
									<div key={i} className="bg-slate-50/50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-150/40 dark:border-slate-800/80 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:bg-purple-500/5 dark:hover:bg-purple-400/5 transition-colors select-none">
										<span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: framework.cor }} />
										<span>{useCase}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right summary metadata card */}
					<div className="bg-white/80 dark:bg-slate-900/45 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl select-none">
						<h2 
							className="text-lg font-display font-extrabold text-slate-850 dark:text-slate-100 mb-6 pb-3 border-b flex items-center gap-2.5" 
							style={{ borderBottomColor: `${framework.cor}30` }}
						>
							<FileText className="w-5 h-5" style={{ color: framework.cor }} />
							<span>Resumo Técnico</span>
						</h2>
						
						<div className="space-y-4 text-xs font-bold text-slate-650 dark:text-slate-200">
							<div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-850/45">
								<span className="text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[9px]">Nome Oficial</span>
								<span className="text-slate-800 dark:text-slate-200 font-extrabold">{framework.nome}</span>
							</div>
							<div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-850/45">
								<span className="text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[9px]">Linguagem</span>
								<span className="text-slate-800 dark:text-slate-200 font-extrabold">{framework.linguagem}</span>
							</div>
							<div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-850/45">
								<span className="text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[9px]">Tipo / Suite</span>
								<span className="text-slate-800 dark:text-slate-200 font-extrabold">{framework.tipo}</span>
							</div>
							<div className="flex justify-between items-center py-2">
								<span className="text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[9px]">Cor Temática</span>
								<div className="flex items-center gap-2">
									<code className="text-[10px] text-slate-500 uppercase">{framework.cor}</code>
									<span className="inline-block w-4 h-4 rounded-md shadow-xs border border-white/20" style={{ backgroundColor: framework.cor }} />
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Coding examples container (renders only if framework has examples defined) */}
				{framework.exemplos && (
					<div className="mt-12">
						<CodeExample framework={framework} />
					</div>
				)}

				{/* Technical documentation double CTAs */}
				<div className="flex flex-wrap gap-4 mt-8 select-none">
					{framework.documentacao && (
						<a
							href={framework.documentacao}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg"
						>
							<BookOpen className="w-4 h-4" />
							<span>Documentação do Desenvolvedor</span>
						</a>
					)}

					{framework.repositorio && (
						<a
							href={framework.repositorio}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-purple-500/20 transition-all shadow-xs"
						>
							<Code className="w-4 h-4" />
							<span>Código Fonte no GitHub</span>
						</a>
					)}
				</div>
			</main>

			<Footer />
		</div>
	);
}

export async function generateMetadata({ params }) {
	const { key } = await params;
	const framework = frameworksData[key];

	if (!framework) {
		return { title: "Framework não encontrado" };
	}

	return {
		title: `ESPDocs - ${framework.nome_completo}`,
		description: framework.descricao,
	};
}

export async function generateStaticParams() {
	return Object.keys(frameworksData).map((key) => ({
		key: key,
	}));
}