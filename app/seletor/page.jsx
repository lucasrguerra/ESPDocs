"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import seriesData from "@/public/series.json";

export default function Seletor() {
    const [currentStep, setCurrentStep] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [answers, setAnswers] = useState({
        wifi: null,
        bluetooth: null,
        cores: null,
        ai: null,
        matter: null,
        gpio: null,
        usb: null,
        lowPower: null,
        ethernet: null,
        display: null,
    });
    const [showResults, setShowResults] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

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
            id: "ethernet",
            question: "Precisa de conexão Ethernet (cabeada)?",
            description: "Ethernet oferece conexão mais estável e rápida que Wi-Fi",
            options: [
                { value: "yes", label: "Sim, preciso", icon: "🔌" },
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
            id: "display",
            question: "Precisa conectar display ou câmera?",
            description: "Interfaces LCD/MIPI para displays e DVP/CSI para câmeras",
            options: [
                { value: "both", label: "Display e câmera", icon: "📱📷" },
                { value: "display", label: "Apenas display", icon: "📺" },
                { value: "camera", label: "Apenas câmera", icon: "📷" },
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
        setCurrentAnswer(value);
        setAnswers({ ...answers, [questionId]: value });
    };

    const handleNext = () => {
        if (currentAnswer !== null) {
            if (currentStep < questions.length - 1) {
                setCurrentStep(currentStep + 1);
                setCurrentAnswer(answers[questions[currentStep + 1].id] || null);
            } else {
                // Última pergunta - mostrar resumo primeiro
                setShowSummary(true);
            }
        }
    };

    const resetQuiz = () => {
        setCurrentStep(0);
        setCurrentAnswer(null);
        setShowResults(false);
        setShowSummary(false);
        setAnswers({
            wifi: null,
            bluetooth: null,
            cores: null,
            ai: null,
            matter: null,
            gpio: null,
            usb: null,
            lowPower: null,
            ethernet: null,
            display: null,
        });
    };

    const goBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setCurrentAnswer(answers[questions[currentStep - 1].id] || null);
        }
    };

    const calculateRecommendations = () => {
        const scores = {};
        const reasons = {};
        
        Object.keys(seriesData).forEach(key => {
            scores[key] = 0;
            reasons[key] = [];
            const serie = seriesData[key];
            
            // Wi-Fi
            if (answers.wifi === "required") {
                if (serie.wifi && !String(serie.wifi).includes("Não")) {
                    scores[key] += 10;
                    reasons[key].push(`✅ Wi-Fi ${serie.wifi.includes("Wi-Fi 6") ? "6 (última geração)" : "disponível"}`);
                } else {
                    scores[key] -= 100;
                    reasons[key].push("❌ Wi-Fi não disponível (requisito essencial)");
                }
            } else if (answers.wifi === "nice" && serie.wifi && !String(serie.wifi).includes("Não")) {
                scores[key] += 3;
                reasons[key].push(`💡 Wi-Fi ${serie.wifi.includes("Wi-Fi 6") ? "6" : ""} disponível`);
            }
            
            // Bluetooth
            if (answers.bluetooth === "required") {
                if (serie.bluetooth !== "Não") {
                    scores[key] += 10;
                    reasons[key].push(`✅ ${serie.bluetooth}`);
                } else {
                    scores[key] -= 100;
                    reasons[key].push("❌ Bluetooth não disponível (requisito essencial)");
                }
            } else if (answers.bluetooth === "nice" && serie.bluetooth !== "Não") {
                scores[key] += 3;
                reasons[key].push(`💡 ${serie.bluetooth}`);
            }

            // Ethernet
            if (answers.ethernet === "yes") {
                if (serie.ethernet === "Sim") {
                    scores[key] += 12;
                    reasons[key].push("✅ Ethernet MAC integrado");
                } else {
                    scores[key] -= 8;
                    reasons[key].push("⚠️ Ethernet não disponível");
                }
            }
            
            // Núcleos
            if (answers.cores === "dual") {
                if (serie.nucleos.includes("2")) {
                    scores[key] += 8;
                    reasons[key].push("✅ Dual-core para processamento paralelo");
                } else {
                    scores[key] -= 5;
                    reasons[key].push("⚠️ Apenas single-core");
                }
            } else if (answers.cores === "single" && serie.nucleos.includes("1")) {
                scores[key] += 5;
                reasons[key].push("✅ Single-core eficiente");
            }
            
            // IA
            if (answers.ai === "yes") {
                if (serie.aceleradores_ia) {
                    scores[key] += 15;
                    reasons[key].push("✅ Aceleradores de IA integrados");
                } else {
                    scores[key] -= 10;
                    reasons[key].push("⚠️ Sem aceleradores de IA dedicados");
                }
            }

            // Display/Câmera
            if (answers.display === "both") {
                if ((serie.lcd || serie.mipi_dsi) && (serie.camera || serie.mipi_csi)) {
                    scores[key] += 15;
                    reasons[key].push("✅ Interfaces para display e câmera");
                } else {
                    scores[key] -= 8;
                    reasons[key].push("⚠️ Interfaces limitadas para display/câmera");
                }
            } else if (answers.display === "display") {
                if (serie.lcd || serie.mipi_dsi) {
                    scores[key] += 10;
                    reasons[key].push(`✅ Interface ${serie.mipi_dsi ? "MIPI DSI" : "LCD"} para display`);
                } else {
                    scores[key] -= 5;
                    reasons[key].push("⚠️ Interface de display limitada");
                }
            } else if (answers.display === "camera") {
                if (serie.camera || serie.mipi_csi) {
                    scores[key] += 10;
                    reasons[key].push(`✅ Interface ${serie.mipi_csi ? "MIPI CSI" : "DVP"} para câmera`);
                } else {
                    scores[key] -= 5;
                    reasons[key].push("⚠️ Interface de câmera limitada");
                }
            }
            
            // Matter/Zigbee/Thread
            if (answers.matter === "yes") {
                if (serie.matter === "Sim") {
                    scores[key] += 12;
                    reasons[key].push("✅ Suporte a Matter/Thread/Zigbee");
                } else {
                    scores[key] -= 8;
                    reasons[key].push("⚠️ Sem suporte a Matter/Thread/Zigbee");
                }
            }
            
            // GPIO
            const gpioCount = parseInt(serie.gpio);
            if (answers.gpio === "many") {
                if (gpioCount >= 35) {
                    scores[key] += 8;
                    reasons[key].push(`✅ ${gpioCount} pinos GPIO (muitos)`);
                } else {
                    scores[key] -= 5;
                    reasons[key].push(`⚠️ ${gpioCount} GPIO (pode ser limitado)`);
                }
            } else if (answers.gpio === "medium") {
                if (gpioCount >= 20 && gpioCount < 35) {
                    scores[key] += 8;
                    reasons[key].push(`✅ ${gpioCount} pinos GPIO (quantidade média)`);
                } else if (gpioCount >= 35) {
                    scores[key] += 6;
                    reasons[key].push(`✅ ${gpioCount} pinos GPIO (mais que o necessário)`);
                } else {
                    scores[key] -= 3;
                    reasons[key].push(`⚠️ ${gpioCount} GPIO (pode ser limitado)`);
                }
            } else if (answers.gpio === "few" && gpioCount < 20) {
                scores[key] += 8;
                reasons[key].push(`✅ ${gpioCount} pinos GPIO (suficiente)`);
            }
            
            // USB
            if (answers.usb === "yes") {
                if (serie.usb && serie.usb !== "Não") {
                    scores[key] += 10;
                    reasons[key].push(`✅ ${serie.usb}`);
                } else {
                    scores[key] -= 5;
                    reasons[key].push("⚠️ USB não disponível");
                }
            } else if (answers.usb === "nice" && serie.usb && serie.usb !== "Não") {
                scores[key] += 5;
                reasons[key].push(`💡 ${serie.usb} disponível`);
            }
            
            // Baixo consumo
            if (answers.lowPower === "critical") {
                const deepSleep = serie.consumo_energia?.deep_sleep;
                if (deepSleep) {
                    const microAmps = deepSleep.match(/(\d+)\s*µA/);
                    if (microAmps && parseInt(microAmps[1]) <= 10) {
                        scores[key] += 12;
                        reasons[key].push(`✅ Consumo ultra-baixo: ${deepSleep} em deep sleep`);
                    } else {
                        scores[key] += 5;
                        reasons[key].push(`💡 Consumo: ${deepSleep} em deep sleep`);
                    }
                }
            } else if (answers.lowPower === "nice") {
                const deepSleep = serie.consumo_energia?.deep_sleep;
                if (deepSleep) {
                    const microAmps = deepSleep.match(/(\d+)\s*µA/);
                    if (microAmps && parseInt(microAmps[1]) <= 10) {
                        scores[key] += 5;
                        reasons[key].push(`💡 Baixo consumo: ${deepSleep}`);
                    }
                }
            }

            // Bonus: Características adicionais
            if (serie.frequencia && parseInt(serie.frequencia) >= 240) {
                reasons[key].push(`⚡ Alta performance: ${serie.frequencia}`);
            }
        });
        
        return { scores, reasons };
    };

    const { scores: allScores, reasons: allReasons } = showResults && Object.values(answers).every(a => a !== null)
        ? calculateRecommendations()
        : { scores: {}, reasons: {} };

    const recommendations = Object.entries(allScores)
        .filter(([_, score]) => score > 0)
        .sort(([, a], [, b]) => b - a);

    const topRecommendations = recommendations.slice(0, 3);
    const otherRecommendations = recommendations.slice(3);

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
                {currentStep < questions.length && !showResults && !showSummary && (
                    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 border-2 border-gray-100 mb-8 transform transition-all duration-300">
                        <div className="text-center mb-8">
                            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
                                {questions[currentStep].question}
                            </h2>
                            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                                {questions[currentStep].description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:gap-4 max-w-2xl mx-auto">
                            {questions[currentStep].options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                                    className={`group border-2 rounded-2xl p-4 md:p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                                        currentAnswer === option.value
                                            ? 'bg-purple-50 border-purple-500 shadow-lg scale-105'
                                            : 'bg-gray-50 hover:bg-purple-50 border-gray-200 hover:border-purple-500'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <span className="text-3xl md:text-4xl shrink-0">{option.icon}</span>
                                        <span className={`text-base md:text-lg font-semibold text-left transition-colors ${
                                            currentAnswer === option.value
                                                ? 'text-purple-600'
                                                : 'text-gray-800 group-hover:text-purple-600'
                                        }`}>
                                            {option.label}
                                        </span>
                                        {currentAnswer === option.value && (
                                            <span className="ml-auto text-purple-600 text-xl md:text-2xl shrink-0">✓</span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                            <button
                                onClick={goBack}
                                disabled={currentStep === 0}
                                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    currentStep === 0
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-md cursor-pointer'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Voltar
                            </button>

                            <button
                                onClick={resetQuiz}
                                className="text-gray-600 hover:text-gray-800 font-semibold transition-colors py-3 cursor-pointer"
                            >
                                Recomeçar
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={currentAnswer === null}
                                className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    currentAnswer === null
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer'
                                }`}
                            >
                                {currentStep === questions.length - 1 ? 'Ver Resultados' : 'Avançar'}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Summary Page */}
                {showSummary && !showResults && (
                    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 border-2 border-gray-100 mb-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-blue-500 rounded-full mb-4">
                                <span className="text-3xl md:text-4xl">📋</span>
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                                Resumo das suas Respostas
                            </h2>
                            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                                Revise suas escolhas antes de ver as recomendações
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto space-y-4 mb-8">
                            {questions.map((question) => {
                                const answer = answers[question.id];
                                const selectedOption = question.options.find(opt => opt.value === answer);
                                
                                return (
                                    <div key={question.id} className="bg-gray-50 rounded-2xl p-4 md:p-6 border-2 border-gray-200">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                            <div className="flex-1">
                                                <h3 className="text-sm md:text-base font-semibold text-gray-700 mb-2">
                                                    {question.question}
                                                </h3>
                                                {selectedOption && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-2xl">{selectedOption.icon}</span>
                                                        <span className="text-base md:text-lg font-bold text-purple-600">
                                                            {selectedOption.label}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const questionIndex = questions.findIndex(q => q.id === question.id);
                                                    setCurrentStep(questionIndex);
                                                    setCurrentAnswer(answers[question.id]);
                                                    setShowSummary(false);
                                                }}
                                                className="self-start md:self-center px-4 py-2 bg-white border-2 border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:border-purple-500 transition-all"
                                            >
                                                ✏️ Editar
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                            <button
                                onClick={() => {
                                    setCurrentStep(questions.length - 1);
                                    setCurrentAnswer(answers[questions[questions.length - 1].id]);
                                    setShowSummary(false);
                                }}
                                className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base hover:bg-gray-300 transition-all duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Voltar
                            </button>

                            <button
                                onClick={() => setShowResults(true)}
                                className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 md:px-12 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <span>✨</span>
                                Ver Recomendações
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Results */}
                {showResults && recommendations.length > 0 && (
                    <div className="space-y-8">
                        <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl p-6 md:p-12 border-2 border-green-200">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full mb-4">
                                    <span className="text-3xl md:text-4xl">✨</span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Recomendações para seu Projeto
                                </h2>
                                <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
                                    Baseado nas suas respostas, estas são as melhores opções de ESP32 para você:
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {topRecommendations.map(([seriesKey, score], index) => {
                                    const serie = seriesData[seriesKey];
                                    const badges = ["🥇 Melhor Opção", "🥈 Segunda Opção", "🥉 Terceira Opção"];
                                    const matchReasons = allReasons[seriesKey] || [];
                                    
                                    return (
                                        <div
                                            key={seriesKey}
                                            className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                                        >
                                            <div className="p-4 md:p-6" style={{ backgroundColor: `${serie.cor}15` }}>
                                                <div className="text-center mb-4">
                                                    <span className="inline-block px-3 py-1 bg-white rounded-full text-xs md:text-sm font-bold text-gray-800 mb-3">
                                                        {badges[index]}
                                                    </span>
                                                    <div className="text-4xl md:text-5xl mb-3">{serie.icone}</div>
                                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{seriesKey}</h3>
                                                    <p className="text-xs md:text-sm text-gray-600 min-h-12">{serie.descricao}</p>
                                                    <div className="mt-3 px-3 py-1 bg-white rounded-full inline-block">
                                                        <span className="text-xs font-semibold text-gray-600">Score: </span>
                                                        <span className="text-sm font-bold" style={{ color: serie.cor }}>{score}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Match Reasons */}
                                            {matchReasons.length > 0 && (
                                                <div className="px-4 md:px-6 py-4 bg-gray-50 border-t border-b border-gray-200">
                                                    <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase">Por que esta série?</h4>
                                                    <ul className="space-y-1.5">
                                                        {matchReasons.slice(0, 5).map((reason, idx) => (
                                                            <li key={idx} className="text-xs text-gray-700 leading-relaxed">
                                                                {reason}
                                                            </li>
                                                        ))}
                                                        {matchReasons.length > 5 && (
                                                            <li className="text-xs text-gray-500 italic">
                                                                +{matchReasons.length - 5} mais vantagens
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            )}

                                            <div className="p-4 md:p-6 space-y-2 bg-white grow">
                                                <div className="flex justify-between text-xs md:text-sm">
                                                    <span className="text-gray-600">Arquitetura:</span>
                                                    <span className="font-semibold text-gray-900">{serie.arquitetura.split(' ')[0]}</span>
                                                </div>
                                                <div className="flex justify-between text-xs md:text-sm">
                                                    <span className="text-gray-600">Núcleos:</span>
                                                    <span className="font-semibold text-gray-900">{serie.nucleos}</span>
                                                </div>
                                                <div className="flex justify-between text-xs md:text-sm">
                                                    <span className="text-gray-600">Frequência:</span>
                                                    <span className="font-semibold text-gray-900">{serie.frequencia}</span>
                                                </div>
                                                <div className="flex justify-between text-xs md:text-sm">
                                                    <span className="text-gray-600">SRAM:</span>
                                                    <span className="font-semibold text-gray-900">{serie.memoria_sram}</span>
                                                </div>
                                                <div className="flex justify-between text-xs md:text-sm">
                                                    <span className="text-gray-600">GPIO:</span>
                                                    <span className="font-semibold text-gray-900">{serie.gpio}</span>
                                                </div>
                                            </div>

                                            <div className="p-4 md:p-6 pt-0 mt-auto">
                                                <Link
                                                    href={`/series/${seriesKey}`}
                                                    className="block w-full text-center py-2.5 md:py-3 rounded-xl font-bold text-white text-sm md:text-base transition-all duration-300 hover:shadow-lg"
                                                    style={{ backgroundColor: serie.cor }}
                                                >
                                                    Ver Detalhes
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Other Compatible Options */}
                            {otherRecommendations.length > 0 && (
                                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border-2 border-gray-200 mb-8">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
                                        Outras Opções Compatíveis
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {otherRecommendations.map(([seriesKey, score]) => {
                                            const serie = seriesData[seriesKey];
                                            return (
                                                <div
                                                    key={seriesKey}
                                                    className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
                                                >
                                                    <div className="text-center mb-3">
                                                        <div className="text-3xl mb-2">{serie.icone}</div>
                                                        <h4 className="text-lg font-bold text-gray-900">{seriesKey}</h4>
                                                        <span className="text-xs text-gray-600">Score: {score}</span>
                                                    </div>
                                                    <Link
                                                        href={`/series/${seriesKey}`}
                                                        className="block w-full text-center py-2 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:shadow-md"
                                                        style={{ backgroundColor: serie.cor }}
                                                    >
                                                        Ver Detalhes
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                                <Link
                                    href="/comparacao"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-purple-500 transition-all duration-300"
                                >
                                    <span>📊</span>
                                    <span>Comparar Recomendações</span>
                                </Link>

                                <button
                                    onClick={resetQuiz}
                                    className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base hover:bg-gray-300 transition-all duration-300"
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

                {/* No Results Found */}
                {showResults && recommendations.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-gray-100">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4">
                                <span className="text-4xl">🤔</span>
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                                Nenhuma Correspondência Perfeita
                            </h2>
                            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                                Não encontramos uma série ESP32 que atenda completamente aos seus requisitos. 
                                Isso pode acontecer quando você combina requisitos que são mutuamente exclusivos ou muito específicos.
                            </p>
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 max-w-2xl mx-auto mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Sugestões:</h3>
                                <ul className="text-left space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>Revise seus requisitos e considere quais são realmente essenciais</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>Algumas combinações (como Wi-Fi 6 + aceleradores de IA) podem requerer séries específicas</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>Considere usar múltiplos módulos ESP32 para diferentes funções do seu projeto</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                                <button
                                    onClick={resetQuiz}
                                    className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <span>🔄</span>
                                    <span>Tentar Novamente</span>
                                </button>
                                <Link
                                    href="/comparacao"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-xl font-bold border-2 border-gray-200 hover:border-purple-500 transition-all duration-300"
                                >
                                    <span>📊</span>
                                    <span>Ver Todas as Séries</span>
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
