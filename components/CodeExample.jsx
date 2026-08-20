'use client'

import { useEffect, useState } from 'react'
import { Code, Copy, CheckCircle, ExternalLink, HelpCircle } from 'lucide-react'

export default function CodeExample({ framework }) {
	const examplesUrl = framework?.exemplos;
	const color = framework?.cor || '#6B7280';

	const [sample, setSample] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		setSample('');
		setError(null);
		setLoading(false);

		if (!framework) return;

		const exemploPath = framework.exemplo;
		if (!exemploPath) {
			const msg = `// Exemplos completos: ${examplesUrl || 'Ver repositório'}\n// Abra o link acima para ver exemplos e código completo.\n`;
			setSample(msg);
			return;
		}

		const url = exemploPath.startsWith('/') ? exemploPath : `/${exemploPath}`;

		let cancelled = false;
		setLoading(true);

		fetch(url)
			.then((res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.text();
			})
			.then((text) => {
				if (cancelled) return;
				if (text && text.trim().length > 0) {
					setSample(text);
				} else {
					setSample(`// Arquivo de exemplo está vazio. Consulte o repositório oficial.\n`);
					setError('Arquivo vazio');
				}
			})
			.catch((err) => {
				if (cancelled) return;
				setSample(`// Não foi possível carregar o exemplo localmente.\n// Consulte o link do GitHub acima para exemplos funcionais.\n`);
				setError(err.message || 'Falha ao carregar exemplo');
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [framework?.exemplo, framework?.exemplos]);

	const lines = (sample || '').split('\n');

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(sample);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {}
	}

	return (
		<div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-300 dark:border-slate-800/80 shadow-2xl mb-8 animate-fadeIn">
			<div className="md:flex items-center justify-between gap-6 mb-6">
				<div className="select-none">
					<h3 className="text-xl font-display font-extrabold text-slate-850 dark:text-slate-100 mb-1 flex items-center gap-2">
						<Code className="w-5 h-5" style={{ color }} />
						<span>Demonstração de Código</span>
					</h3>
					<p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Trecho de inicialização rápida — copie e personalize em seu projeto.</p>
				</div>

				<div className="flex flex-wrap items-center gap-2.5 mt-4 md:mt-0 select-none">
					<span
						className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
						style={{ 
							backgroundColor: `${color}18`, 
							color, 
							border: `1px solid ${color}25` 
						}}
					>
						{framework?.linguagem || 'Código'}
					</span>

					<button
						onClick={handleCopy}
						className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-250 px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs border border-slate-300 dark:border-slate-800/80 cursor-pointer transition active:scale-95"
						title="Copiar código para a área de transferência"
					>
						{copied ? (
							<>
								<CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
								<span className="text-emerald-600 dark:text-emerald-450">Copiado!</span>
							</>
						) : (
							<>
								<Copy className="w-3.5 h-3.5" />
								<span>Copiar</span>
							</>
						)}
					</button>

					{examplesUrl && (
						<a
							href={examplesUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg active:scale-95 transition hover:opacity-95"
							style={{
								background: `linear-gradient(90deg, ${color} 0%, rgba(147,51,234,1) 100%)`,
								boxShadow: `0 8px 20px -8px ${color}`
							}}
							title="Abrir exemplos no GitHub"
						>
							<span>Mais Exemplos</span>
							<ExternalLink className="w-3.5 h-3.5" />
						</a>
					)}
				</div>
			</div>

			<div className="rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800/80 shadow-md">
				<div className="select-none">
					<div className="flex items-center justify-between bg-slate-100/80 dark:bg-slate-950/70 border-b border-slate-300 dark:border-slate-850/60 px-4 py-3.5">
						<div className="text-xs font-bold text-slate-750 dark:text-slate-250 flex items-center gap-1.5">
							<span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
							<span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
							<span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
							<span className="ml-2 font-mono text-[10px] text-slate-500 dark:text-slate-400">{framework?.nome} example</span>
						</div>
						<div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
							{loading ? 'Buscando exemplo...' : (framework?.exemplo ? 'Local Source' : 'External GitHub')}
						</div>
					</div>
				</div>

				<div className="flex bg-slate-950">
					<pre
						className="text-slate-200 p-5 w-full overflow-auto text-xs leading-relaxed scrollbar-thin select-text"
						style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace' }}
					>
						{lines.map((line, idx) => (
							<div key={idx} className="flex">
								<span className="text-slate-500 pr-4 text-right w-8 select-none border-r border-slate-900/60 mr-4 font-semibold">{idx + 1}</span>
								<code className="whitespace-pre flex-1 text-left">{line === '' ? '\u00A0' : line}</code>
							</div>
						))}
					</pre>
				</div>
			</div>

			{error && (
				<div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 mt-3 select-none">
					<p className="text-[10px] font-bold text-red-600 dark:text-red-400">
						Nota: Não foi possível carregar o arquivo de exemplo local ({error}). Use o botão "Mais Exemplos" para ver os códigos oficiais.
					</p>
				</div>
			)}
			
			<div className="mt-4 flex items-start gap-2 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-150/40 dark:border-slate-850/40 p-4 rounded-2xl select-none">
				<HelpCircle className="w-4.5 h-4.5 text-purple-500 shrink-0 mt-0.5" />
				<p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
					<strong>Dica de Desenvolvimento:</strong> Personalize o trecho de inicialização com as pinagens e configurações corretas correspondentes à série do seu microcontrolador (ex: ESP32-S3, ESP32-C6). A documentação detalhada da API pode ser acessada na barra superior do framework.
				</p>
			</div>
		</div>
	);
}