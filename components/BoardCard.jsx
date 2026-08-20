'use client';

import { Award, CheckCircle, HelpCircle, ExternalLink } from 'lucide-react';

export default function BoardCard({ board }) {
	const mainFields = ['Nome', 'Link', 'Imagem', 'Loja Oficial'];
	
	const technicalFields = Object.keys(board).filter(
		key => !mainFields.includes(key) && board[key]
	);

	const hasFeature = (value) => {
		const yesValues = ['sim', 'opcional'];
		return yesValues.includes(value?.toString().toLowerCase().trim());
	};

	// Filtrar apenas características que têm "Sim" ou "Opcional"
	const availableFeatures = technicalFields.filter(field => hasFeature(board[field]));
	const optionalFeatures = technicalFields.filter(field => 
		board[field]?.toString().toLowerCase().trim() === 'opcional'
	);

	return (
		<div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-300 dark:border-slate-800/80 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group flex flex-col h-full animate-fadeIn select-none">
			{/* Image Container with premium glass background */}
			{board.Imagem && (
				<div 
					className="mx-auto w-full p-4 flex justify-center bg-white dark:bg-white border-b border-slate-200 dark:border-slate-850/40 shrink-0"
					dangerouslySetInnerHTML={{ __html: board.Imagem }}
				/>
			)}

			<div className="p-6 flex flex-col grow justify-between">
				<div>
					{/* Loja Oficial Badge */}
					{board['Loja Oficial'] && board['Loja Oficial'].toLowerCase() === 'sim' && (
						<div className="mb-2">
							<span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
								<Award className="w-3.5 h-3.5 shrink-0" />
								<span>Loja Oficial</span>
							</span>
						</div>
					)}

					{/* Nome */}
					<h3 className="text-base font-display font-extrabold text-slate-850 dark:text-slate-100 mb-4 line-clamp-2 leading-snug group-hover:text-purple-650 dark:group-hover:text-purple-400 transition-colors">
						{board.Nome || 'Placa Genérica'}
					</h3>

					{/* Características Técnicas */}
					{availableFeatures.length > 0 && (
						<div className="mb-6">
							<h4 className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
								<CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
								<span>Recursos Embarcados</span>
							</h4>
							
							<div className="flex flex-wrap gap-1.5">
								{availableFeatures.map((field) => {
									const isOptional = optionalFeatures.includes(field);
									return (
										<div
											key={field}
											className={`text-[9px] px-2 py-0.5 rounded-lg font-bold flex items-center gap-1 ${
												isOptional
													? 'bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 text-amber-600 dark:text-amber-400'
													: 'bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
											}`}
										>
											{isOptional ? (
												<HelpCircle className="w-2.5 h-2.5 shrink-0" />
											) : (
												<CheckCircle className="w-2.5 h-2.5 shrink-0" />
											)}
											<span>{field}</span>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>

				{/* Link de Compra */}
				{board.Link && (
					<a
						href={board.Link}
						target="_blank"
						rel="noopener noreferrer"
						className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-98 transition-all shadow-md mt-auto flex items-center justify-center gap-1.5"
					>
						<span>Adquirir no AliExpress</span>
						<ExternalLink className="w-3.5 h-3.5" />
					</a>
				)}
			</div>
		</div>
	);
}
