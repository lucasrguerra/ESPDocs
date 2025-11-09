"use client";

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
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full">
            {/* Imagem */}
            {board.Imagem && (
                <div 
                    className="mx-auto w-fit"
                    dangerouslySetInnerHTML={{ __html: board.Imagem }}
                />
            )}

            <div className="p-6 flex flex-col grow">
                {/* Nome */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {board.Nome || 'Placa sem nome'}
                </h3>

                {/* Loja Oficial */}
                {board['Loja Oficial'] && board['Loja Oficial'].toLowerCase() === 'sim' && (
                    <div className="mb-4">
                        <p className="text-sm text-blue-600 flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Link da loja oficial do fabricante</span>
                        </p>
                    </div>
                )}

                {/* Características Técnicas */}
                {availableFeatures.length > 0 && (
                    <div className="mb-4 grow">
                        <div className="flex items-center gap-2 mb-3">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <h4 className="text-sm font-semibold text-gray-700">Recursos Disponíveis</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {availableFeatures.map((field) => {
                                const isOptional = optionalFeatures.includes(field);
                                return (
                                    <div
                                        key={field}
                                        className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 ${
                                            isOptional
                                                ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                                : 'bg-green-100 text-green-700 border border-green-200'
                                        }`}
                                    >
                                        {isOptional ? (
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        <span>{field}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Link para mais informações - sempre no final */}
                {board.Link && (
                    <a
                        href={board.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-linear-to-r from-blue-600 to-purple-600 text-white text-center px-4 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 mt-auto"
                    >
                        Abrir no AliExpress 🔗
                    </a>
                )}
            </div>
        </div>
    );
}
