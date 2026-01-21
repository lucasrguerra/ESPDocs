"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import seriesData from "@/public/series.json";

export default function Seletor() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({
        wifi: null,
        bluetooth: null,
        cores: null,
        ai: null,
        matter: null,
        gpio: null,
        usb: null,
        lowPower: null,
    });

    const questions = [
        {
            id: "wifi",
            question: "Seu projeto precisa de conectividade Wi-Fi?",
            description: "Wi-Fi permite conexão com internet e redes locais sem fio",
            options: [
                { value: "required", label: "Sim, é essencial", icon: "📶" },
                { value: "nice", label: "Seria útil, mas não é obrigatório", icon: "📡" },
                { value: "no", label: "Não preciso", icon: "📵" },
            ]
        },
        {
            id: "bluetooth",
            question: "Seu projeto precisa de Bluetooth?",
            description: "Bluetooth permite comunicação com dispositivos móveis e periféricos",
            options: [
                { value: "required", label: "Sim, é essencial", icon: "📱" },
                { value: "nice", label: "Seria útil, mas não é obrigatório", icon: "🔵" },
                { value: "no", label: "Não preciso", icon: "🚫" },
            ]
        },
        {
            id: "cores",
            question: "Quantos núcleos de processamento você precisa?",
            description: "Mais núcleos permitem executar tarefas em paralelo",
            options: [
                { value: "dual", label: "Dual-core (2 núcleos)", icon: "⚡⚡" },
                { value: "single", label: "Single-core (1 núcleo)", icon: "⚡" },
                { value: "any", label: "Tanto faz", icon: "🤷" },
            ]
        },
        {
            id: "ai",
            question: "Precisa de recursos de IA/Machine Learning?",
            description: "Aceleradores de IA ajudam em reconhecimento de voz, imagem e visão computacional",
            options: [
                { value: "yes", label: "Sim, vou usar IA", icon: "🤖" },
                { value: "no", label: "Não preciso", icon: "🚫" },
            ]
        },
        {
            id: "matter",
            question: "Precisa de suporte a Matter, Zigbee ou Thread?",
            description: "Protocolos para casa inteligente e IoT de baixo consumo",
            options: [
                { value: "yes", label: "Sim, preciso", icon: "🏠" },
                { value: "no", label: "Não preciso", icon: "🚫" },
            ]
        },
        {
            id: "gpio",
            question: "Quantos pinos GPIO você precisa?",
            description: "GPIO permite conectar sensores, displays e outros componentes",
            options: [
                { value: "many", label: "Muitos (35+)", icon: "🔌🔌🔌" },
                { value: "medium", label: "Quantidade média (20-35)", icon: "🔌🔌" },
                { value: "few", label: "Poucos (menos de 20)", icon: "🔌" },
            ]
        },
        {
            id: "usb",
            question: "Precisa de USB nativo?",
            description: "USB nativo facilita programação e comunicação sem adaptadores",
            options: [
                { value: "yes", label: "Sim, preciso", icon: "🔌" },
                { value: "nice", label: "Seria útil", icon: "💡" },
                { value: "no", label: "Não preciso", icon: "🚫" },
            ]
        },
        {
            id: "lowPower",
            question: "Baixo consumo de energia é crítico?",
            description: "Importante para projetos com bateria ou painéis solares",
            options: [
                { value: "critical", label: "Sim, é crítico", icon: "🔋" },
                { value: "nice", label: "Seria bom", icon: "💡" },
                { value: "no", label: "Não é prioridade", icon: "⚡" },
            ]
        },
    ];

    const handleAnswer = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const resetQuiz = () => {
        setCurrentStep(0);
        setAnswers({
            wifi: null,
            bluetooth: null,
            cores: null,
            ai: null,
            matter: null,
            gpio: null,
            usb: null,
            lowPower: null,
        });
    };

    const goBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const calculateRecommendations = () => {
        const scores = {};
        
        Object.keys(seriesData).forEach(key => {
            scores[key] = 0;
            const serie = seriesData[key];
            
            // Wi-Fi
            if (answers.wifi === "required" && serie.wifi && !String(serie.wifi).includes("Não")) {
                scores[key] += 10;
            } else if (answers.wifi === "no" && (!serie.wifi || String(serie.wifi).includes("Não"))) {
                scores[key] += 5;
            } else if (answers.wifi === "nice" && serie.wifi && !String(serie.wifi).includes("Não")) {
                scores[key] += 3;
            } else if (answers.wifi === "required" && (!serie.wifi || String(serie.wifi).includes("Não"))) {
                scores[key] -= 100; // Desqualifica
            }
            
            // Bluetooth
            if (answers.bluetooth === "required" && serie.bluetooth !== "Não") {
                scores[key] += 10;
            } else if (answers.bluetooth === "no" && serie.bluetooth === "Não") {
                scores[key] += 5;
            } else if (answers.bluetooth === "nice" && serie.bluetooth !== "Não") {
                scores[key] += 3;
            } else if (answers.bluetooth === "required" && serie.bluetooth === "Não") {
                scores[key] -= 100; // Desqualifica
            }
            
            // Núcleos
            if (answers.cores === "dual" && serie.nucleos.includes("2")) {
                scores[key] += 8;
            } else if (answers.cores === "single" && serie.nucleos.includes("1")) {
                scores[key] += 5;
            } else if (answers.cores === "dual" && !serie.nucleos.includes("2")) {
                scores[key] -= 5;
            }
            
            // IA
            if (answers.ai === "yes" && serie.aceleradores_ia) {
                scores[key] += 15;
            } else if (answers.ai === "yes" && !serie.aceleradores_ia) {
                scores[key] -= 10;
            }
            
            // Matter/Zigbee/Thread
            if (answers.matter === "yes" && serie.matter === "Sim") {
                scores[key] += 12;
            } else if (answers.matter === "yes" && serie.matter !== "Sim") {
                scores[key] -= 8;
            }
            
            // GPIO
            const gpioCount = parseInt(serie.gpio);
            if (answers.gpio === "many" && gpioCount >= 35) {
                scores[key] += 8;
            } else if (answers.gpio === "medium" && gpioCount >= 20 && gpioCount < 35) {
                scores[key] += 8;
            } else if (answers.gpio === "few" && gpioCount < 20) {
                scores[key] += 8;
            } else if (answers.gpio === "many" && gpioCount < 35) {
                scores[key] -= 5;
            }
            
            // USB
            if (answers.usb === "yes" && serie.usb && serie.usb !== "Não") {
                scores[key] += 10;
            } else if (answers.usb === "nice" && serie.usb && serie.usb !== "Não") {
                scores[key] += 5;
            } else if (answers.usb === "yes" && (!serie.usb || serie.usb === "Não")) {
                scores[key] -= 5;
            }
            
            // Baixo consumo
            if (answers.lowPower === "critical") {
                const deepSleep = serie.consumo_energia?.deep_sleep;
                if (deepSleep && (deepSleep.includes("µA") || deepSleep.includes("5 µA") || deepSleep.includes("7 µA"))) {
                    scores[key] += 12;
                }
            }
        });
        
        // Ordenar por pontuação
        const sortedSeries = Object.entries(scores)
            .filter(([_, score]) => score > 0)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3);
        
        return sortedSeries.map(([key]) => key);
    };

    const recommendations = currentStep === questions.length - 1 && Object.values(answers).every(a => a !== null)
        ? calculateRecommendations()
        : [];

    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
            <Header />

            <main id="conteudo" className="px-4 pt-16 pb-20 max-w-5xl mx-auto">
                <section className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-purple-200 shadow-sm">
                        <span className="text-xl">🎯</span>
                        <span className="text-sm font-semibold text-gray-700">Ferramenta de Seleção Inteligente</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight tracking-tight">
                        Encontre seu ESP32 Ideal
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Responda algumas perguntas sobre seu projeto e descubra qual série ESP32 é perfeita para você
                    </p>
                </section>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-600">
                            Pergunta {currentStep + 1} de {questions.length}
                        </span>
                        <span className="text-sm font-semibold text-purple-600">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                            className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 h-full rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question Card */}
                {currentStep < questions.length && recommendations.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-100 mb-8 transform transition-all duration-300">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                {questions[currentStep].question}
                            </h2>
                            <p className="text-base text-gray-600 max-w-2xl mx-auto">
                                {questions[currentStep].description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                            {questions[currentStep].options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                                    className="group bg-gray-50 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-500 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl">{option.icon}</span>
                                        <span className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors text-left">
                                            {option.label}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                            <button
                                onClick={goBack}
                                disabled={currentStep === 0}
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    currentStep === 0
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-md'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Voltar
                            </button>

                            <button
                                onClick={resetQuiz}
                                className="text-gray-600 hover:text-gray-800 font-semibold transition-colors"
                            >
                                Recomeçar
                            </button>
                        </div>
                    </div>
                )}

                {/* Results */}
                {recommendations.length > 0 && (
                    <div className="space-y-8">
                        <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl p-8 md:p-12 border-2 border-green-200">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
                                    <span className="text-4xl">✨</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Recomendações para seu Projeto
                                </h2>
                                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                                    Baseado nas suas respostas, estas são as melhores opções de ESP32 para você:
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                {recommendations.map((seriesKey, index) => {
                                    const serie = seriesData[seriesKey];
                                    const badges = ["🥇 Melhor Opção", "🥈 Segunda Opção", "🥉 Terceira Opção"];
                                    
                                    return (
                                        <div
                                            key={seriesKey}
                                            className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300 flex flex-col h-full"
                                        >
                                            <div className="p-6" style={{ backgroundColor: `${serie.cor}15` }}>
                                                <div className="text-center mb-4">
                                                    <span className="inline-block px-3 py-1 bg-white rounded-full text-sm font-bold text-gray-800 mb-3">
                                                        {badges[index]}
                                                    </span>
                                                    <div className="text-5xl mb-3">{serie.icone}</div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{seriesKey}</h3>
                                                    <p className="text-sm text-gray-600 min-h-[3rem]">{serie.descricao}</p>
                                                </div>
                                            </div>

                                            <div className="p-6 space-y-2 bg-white flex-grow">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Arquitetura:</span>
                                                    <span className="font-semibold text-gray-900">{serie.arquitetura.split(' ')[0]}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Núcleos:</span>
                                                    <span className="font-semibold text-gray-900">{serie.nucleos}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Frequência:</span>
                                                    <span className="font-semibold text-gray-900">{serie.frequencia}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">SRAM:</span>
                                                    <span className="font-semibold text-gray-900">{serie.memoria_sram}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">GPIO:</span>
                                                    <span className="font-semibold text-gray-900">{serie.gpio}</span>
                                                </div>
                                            </div>

                                            <div className="p-6 pt-0 mt-auto">
                                                <Link
                                                    href={`/series/${seriesKey}`}
                                                    className="block w-full text-center py-3 rounded-xl font-bold text-white transition-all duration-300 hover:shadow-lg"
                                                    style={{ backgroundColor: serie.cor }}
                                                >
                                                    Ver Detalhes
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link
                                    href="/comparacao"
                                    className="inline-flex items-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-purple-500 transition-all duration-300"
                                >
                                    <span>📊</span>
                                    <span>Comparar Recomendações</span>
                                </Link>

                                <button
                                    onClick={resetQuiz}
                                    className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-8 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
                                >
                                    <span>🔄</span>
                                    <span>Fazer Novamente</span>
                                </button>
                            </div>
                        </div>

                        {/* Additional Resources */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                Próximos Passos
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <Link
                                    href="/catalogo"
                                    className="group bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="text-4xl mb-3">🛒</div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        Ver Catálogo de Placas
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Encontre placas de desenvolvimento verificadas
                                    </p>
                                </Link>

                                <Link
                                    href="/frameworks"
                                    className="group bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="text-4xl mb-3">⚡</div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                        Explorar Frameworks
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Conheça ESP-IDF, Arduino, MicroPython e mais
                                    </p>
                                </Link>

                                <Link
                                    href="/glossario"
                                    className="group bg-pink-50 border-2 border-pink-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="text-4xl mb-3">📚</div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                                        Consultar Glossário
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Entenda termos técnicos e especificações
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
