'use client'

import { useEffect, useState } from 'react'

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
                    setSample(`// Arquivo de exemplo está vazio. Consulte: ${examplesUrl || 'repositório'}\n`);
                    setError('Arquivo vazio');
                }
            })
            .catch((err) => {
                if (cancelled) return;
                setSample(`// Não foi possível carregar o exemplo local. Consulte: ${examplesUrl || 'repositório'}\n`);
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 mb-8">
            <div className="md:flex items-start justify-between gap-4 mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Exemplo de Código</h3>
                    <p className="text-sm text-gray-600">Trecho rápido para começar — personalize conforme necessário.</p>
                </div>

                <div className="grid grid-cols-2 md:flex items-center gap-2">
                    <span
                        className="inline-flex items-center text-sm font-semibold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: color }}
                    >
                        {framework?.linguagem || 'Código'}
                    </span>

                    <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-2 bg-white text-gray-800 px-3 py-2 rounded-lg font-medium shadow border-2 border-gray-100 cursor-pointer hover:shadow-lg transition"
                        title="Copiar código"
                    >
                        {copied ? '✅ Copiado' : '📋 Copiar'}
                    </button>

                    {examplesUrl && (
                        <a
                            href={examplesUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-white col-span-2"
                            style={{
                                background: `linear-gradient(90deg, ${color} 0%, rgba(124,58,237,1) 100%)`
                            }}
                            title="Abrir exemplos no GitHub"
                        >
                            🔗 Ver Outros no GitHub
                        </a>
                    )}
                </div>
            </div>

            <div className="rounded-lg overflow-hidden border">
                <div className="p-0">
                    <div className="flex items-center justify-between bg-linear-to-r from-gray-900 to-gray-800 p-3">
                        <div className="text-xs text-gray-300 font-medium">{framework?.nome}</div>
                        <div className="text-xs text-gray-400">
                            {loading ? 'Carregando exemplo...' : (framework?.exemplo ? 'Exemplo do framework' : 'Abrir no GitHub')}
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <pre
                        className="bg-gray-900 text-gray-100 p-4 w-full overflow-auto"
                        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace' }}
                    >
                        {lines.map((line, idx) => (
                            <div key={idx} className="flex select-text">
                                <span className="text-gray-500 pr-4 text-right w-8 select-none">{idx + 1}</span>
                                <code className="whitespace-pre-wrap flex-1">{line === '' ? '\u00A0' : line}</code>
                            </div>
                        ))}
                    </pre>
                </div>
            </div>

            {error && <p className="text-xs text-red-500 mt-2">Não foi possível carregar o arquivo de exemplo: {error}. Usando instrução para o repositório.</p>}
            <p className="text-xs text-gray-500 mt-3">Dica: personalize este trecho conforme o seu projeto. Os exemplos completos estão no repositório.</p>
        </div>
    );
}