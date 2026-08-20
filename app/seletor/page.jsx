"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import seriesData from "@/public/series.json";
import {
	Wifi,
	Bluetooth,
	Network,
	Cpu,
	Bot,
	Monitor,
	Camera,
	Home as HomeIcon,
	Sliders,
	Cable,
	Battery,
	Zap,
	Ban,
	ChevronLeft,
	ChevronRight,
	RotateCcw,
	Sparkles,
	Edit2,
	CheckCircle,
	HelpCircle,
	Award,
	SlidersHorizontal,
	ExternalLink,
	ShoppingBag,
	BookOpen,
	Compass,
	Smartphone,
	ShieldCheck
} from "lucide-react";

// Dynamic icon mapper to convert choices to sleek Lucide vectors
const iconMap = {
	// Categoria
	"category_wearable": <Battery className="w-6 h-6 text-green-500" />,
	"category_smarthome": <HomeIcon className="w-6 h-6 text-amber-500" />,
	"category_multimedia": <Monitor className="w-6 h-6 text-cyan-500" />,
	"category_industrial": <Cpu className="w-6 h-6 text-purple-500" />,
	
	// Conectividade
	"connectivity_wifi-ble": <Wifi className="w-6 h-6 text-blue-500" />,
	"connectivity_mesh": <Network className="w-6 h-6 text-orange-500" />,
	"connectivity_ethernet": <Cable className="w-6 h-6 text-emerald-500" />,
	"connectivity_none": <Ban className="w-6 h-6 text-slate-450 dark:text-slate-500" />,
	
	// Alimentacao
	"power_battery": <Battery className="w-6 h-6 text-green-500" />,
	"power_always-on": <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />,
	
	// Hardware
	"hardware_display-camera": (
		<div className="flex gap-1 text-cyan-500 shrink-0">
			<Monitor className="w-5 h-5" />
			<Camera className="w-5 h-5" />
		</div>
	),
	"hardware_usb-native": <Cable className="w-6 h-6 text-teal-500" />,
	"hardware_many-gpios": <Sliders className="w-6 h-6 text-sky-500" />,
	"hardware_basic": <HelpCircle className="w-6 h-6 text-slate-450 dark:text-slate-550" />,
	
	// IA
	"ai_ai-ml": <Bot className="w-6 h-6 text-pink-500" />,
	"ai_standard": <Ban className="w-6 h-6 text-slate-450 dark:text-slate-550" />,

	// Segurança
	"security_critical": <ShieldCheck className="w-6 h-6 text-teal-500" />,
	"security_standard": <HelpCircle className="w-6 h-6 text-slate-450 dark:text-slate-550" />,
};

const getOptionIcon = (questionId, value) => {
	const key = `${questionId}_${value}`;
	return iconMap[key] || <HelpCircle className="w-6 h-6 text-slate-400" />;
};

export default function Seletor() {
	const [currentStep, setCurrentStep] = useState(0);
	const [currentAnswer, setCurrentAnswer] = useState(null);
	const [answers, setAnswers] = useState({
		category: null,
		connectivity: null,
		power: null,
		hardware: null,
		ai: null,
		security: null,
	});
	const [showResults, setShowResults] = useState(false);
	const [showSummary, setShowSummary] = useState(false);

	const questions = [
		{
			id: "category",
			question: "Qual é o foco principal ou aplicação do seu projeto?",
			description: "Categorizar seu projeto nos ajuda a equilibrar fatores de tamanho físico, consumo de energia e poder computacional do chip.",
			options: [
				{ value: "wearable", label: "Dispositivo Portátil ou Vestível (Wearable)", icon: "category_wearable" },
				{ value: "smarthome", label: "Automação / Smart Home / IoT Conectado", icon: "category_smarthome" },
				{ value: "multimedia", label: "Interface Multimídia (Telas / Câmeras / HMI)", icon: "category_multimedia" },
				{ value: "industrial", label: "Industrial / Robótica / Alto Desempenho", icon: "category_industrial" },
			]
		},
		{
			id: "connectivity",
			question: "Qual tecnologia de rede sem fio (RF) você precisa?",
			description: "O ecossistema ESP32 oferece desde rádios Wi-Fi tradicionais até controladores industriais cabeados ou rádio Mesh 802.15.4.",
			options: [
				{ value: "wifi-ble", label: "Wi-Fi + Bluetooth BLE (IoT Tradicional)", icon: "connectivity_wifi-ble" },
				{ value: "mesh", label: "Matter / Zigbee / Thread (Redes Mesh)", icon: "connectivity_mesh" },
				{ value: "ethernet", label: "Rede Cabeada Industrial (Ethernet)", icon: "connectivity_ethernet" },
				{ value: "none", label: "Apenas Local / Sem Conexão Sem Fio", icon: "connectivity_none" },
			]
		},
		{
			id: "power",
			question: "Como o dispositivo será alimentado eletricamente?",
			description: "A escolha da fonte de energia determina a importância de blocos internos de silício de consumo ultra-baixo (Deep Sleep).",
			options: [
				{ value: "battery", label: "Bateria ou Painel Solar (Consumo Ultra-Baixo)", icon: "power_battery" },
				{ value: "always-on", label: "Tomada, Fonte Externa ou USB (Sempre Ativo)", icon: "power_always-on" },
			]
		},
		{
			id: "hardware",
			question: "Quais periféricos físicos ou barramentos serão conectados?",
			description: "Determinados módulos requerem interfaces dedicadas no silício, como barramento LCD, USB nativo ou alta quantidade de GPIOs.",
			options: [
				{ value: "display-camera", label: "Displays Gráficos LCD ou Câmeras", icon: "hardware_display-camera" },
				{ value: "usb-native", label: "Conexão USB Nativa (Emular Teclado/Disco)", icon: "hardware_usb-native" },
				{ value: "many-gpios", label: "Muitos Atuadores / Pinos (Mais de 30 GPIOs)", icon: "hardware_many-gpios" },
				{ value: "basic", label: "Básico (Poucos sensores com I2C, SPI ou UART)", icon: "hardware_basic" },
			]
		},
		{
			id: "ai",
			question: "Seu projeto usará Inteligência Artificial local (Edge AI)?",
			description: "Aceleração por hardware permite rodar redes neurais, reconhecimento de voz ou visão computacional na borda em milissegundos.",
			options: [
				{ value: "ai-ml", label: "Sim, preciso rodar modelos de IA localmente", icon: "ai_ai-ml" },
				{ value: "standard", label: "Não, processamento lógico comum é suficiente", icon: "ai_standard" },
			]
		},
		{
			id: "security",
			question: "Qual o nível de segurança criptográfica exigido pelo produto?",
			description: "Aceleradores criptográficos no silício executam AES, SHA, RSA e curvas elípticas em hardware, viabilizando Secure Boot, criptografia de flash e provisionamento seguro de chaves sem penalizar a CPU.",
			options: [
				{ value: "critical", label: "Crítico (Matter, pagamentos, provisionamento seguro de chaves)", icon: "security_critical" },
				{ value: "standard", label: "Padrão (TLS comum e projetos sem requisitos regulatórios)", icon: "security_standard" },
			]
		}
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
			category: null,
			connectivity: null,
			power: null,
			hardware: null,
			ai: null,
			security: null,
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
			
			// 1. CATEGORIA DO PROJETO (category)
			if (answers.category === "wearable") {
				if (serie.bluetooth !== "Não") {
					scores[key] += 10;
					reasons[key].push("Suporte de rádio Bluetooth de alta eficiência para pareamento");
				}
				const sleep = serie.consumo_energia?.deep_sleep;
				if (sleep) {
					const uaMatch = sleep.match(/(\d+)\s*µA/);
					if (uaMatch && parseInt(uaMatch[1]) <= 10) {
						scores[key] += 15;
						reasons[key].push(`Modo standby ultra-eficiente (${sleep}) conserva baterias comerciais`);
					}
				}
				if (key === "ESP32-C2" || key === "ESP32-C3") {
					scores[key] += 6;
					reasons[key].push("Footprint de tamanho reduzido ideal para dispositivos ultra-compactos");
				}
			} else if (answers.category === "smarthome") {
				if (serie.wifi && !String(serie.wifi).includes("Não")) {
					scores[key] += 10;
					reasons[key].push("Cadeia RF Wi-Fi robusta integrada para integração residencial");
				}
				if (serie.matter === "Sim") {
					scores[key] += 15;
					reasons[key].push("Suporte oficial a Matter para alta interoperabilidade inteligente");
				}
			} else if (answers.category === "multimedia") {
				if (serie.lcd || serie.mipi_dsi) {
					scores[key] += 15;
					reasons[key].push("Barramentos dedicados no silício para controle de telas coloridas");
				}
				if (serie.camera || serie.mipi_csi) {
					scores[key] += 15;
					reasons[key].push("Linhas dedicadas para conexão de câmeras de vídeo");
				}
				if (serie.psram_externa && serie.psram_externa !== "Não") {
					scores[key] += 10;
					reasons[key].push("Suporte a PSRAM externa de alta densidade para buffers e quadros");
				}
			} else if (answers.category === "industrial") {
				if (serie.nucleos.includes("2")) {
					scores[key] += 12;
					reasons[key].push("Arquitetura Dual-Core ideal para loops síncronos e processamento paralelo");
				}
				if (parseInt(serie.gpio) >= 30) {
					scores[key] += 10;
					reasons[key].push(`Grande número de portas digitais (${serie.gpio} GPIOs)`);
				}
				if (serie.aceleradores_ia) {
					scores[key] += 10;
					reasons[key].push("Acelerador neural de silício ideal para controle de feedback preditivo");
				}
			}

			// 2. CONECTIVIDADE SEM FIO (connectivity)
			if (answers.connectivity === "wifi-ble") {
				if (serie.wifi && !String(serie.wifi).includes("Não") && serie.bluetooth !== "Não") {
					scores[key] += 20;
					reasons[key].push(`Conexão de rádio integrada Wi-Fi (${serie.wifi}) e Bluetooth (${serie.bluetooth})`);
				} else if (serie.wifi && !String(serie.wifi).includes("Não")) {
					scores[key] += 8;
					reasons[key].push("Possui conexão Wi-Fi ativa, mas carece de Bluetooth");
				} else {
					scores[key] -= 80;
					reasons[key].push("Incompatível: Necessita de rádio Wi-Fi ou Bluetooth");
				}
			} else if (answers.connectivity === "mesh") {
				if (serie.matter === "Sim") {
					scores[key] += 25;
					reasons[key].push("Rádio 802.15.4 integrado de alto alcance para barramentos Mesh (Zigbee/Thread)");
				} else {
					scores[key] -= 15;
					reasons[key].push("Sem rádio mesh 802.15.4 integrado no chip");
				}
			} else if (answers.connectivity === "ethernet") {
				if (serie.ethernet === "Sim" || serie.ethernet_mac === "Sim") {
					scores[key] += 25;
					reasons[key].push("Controlador MAC Ethernet cabeado para conexões imunes a ruídos RF");
				} else {
					scores[key] -= 10;
					reasons[key].push("Requer shield ou controlador externo para conexão de rede cabeada");
				}
			} else if (answers.connectivity === "none") {
				if (serie.wifi === "Não" || serie.bluetooth === "Não" || key === "ESP32-H2" || key === "ESP32-C2") {
					scores[key] += 15;
					reasons[key].push("Microcontrolador focado em baixo custo e alta eficiência para circuitos locais");
				} else {
					scores[key] += 5;
				}
			}

			// 3. FONTE DE ALIMENTAÇÃO & CONSUMO (power)
			if (answers.power === "battery") {
				const sleep = serie.consumo_energia?.deep_sleep;
				if (sleep) {
					const uaMatch = sleep.match(/(\d+)\s*µA/);
					if (uaMatch && parseInt(uaMatch[1]) <= 10) {
						scores[key] += 20;
						reasons[key].push(`Standby em Deep Sleep de apenas ${sleep} maximiza fontes recarregáveis`);
					} else {
						scores[key] += 10;
						reasons[key].push(`Gerenciamento térmico e modo de suspensão em ${sleep}`);
					}
				} else {
					scores[key] -= 10;
					reasons[key].push("Standby de energia menos otimizado para longos ciclos de bateria");
				}
			} else if (answers.power === "always-on") {
				if (serie.nucleos.includes("2")) {
					scores[key] += 10;
					reasons[key].push("Desempenho multitarefa constante garantido por núcleos redundantes");
				}
				if (parseInt(serie.frequencia) >= 240) {
					scores[key] += 10;
					reasons[key].push(`Velocidade de cálculo mantida em clock máximo de ${serie.frequencia}`);
				}
			}

			// 4. INTERFACE E PERIFÉRICOS (hardware)
			if (answers.hardware === "display-camera") {
				if ((serie.lcd || serie.mipi_dsi) && (serie.camera || serie.mipi_csi)) {
					scores[key] += 25;
					reasons[key].push("Possui barramento flexível LCD e câmera digital rodando simultaneamente");
				} else if (serie.lcd || serie.mipi_dsi || serie.camera || serie.mipi_csi) {
					scores[key] += 15;
					reasons[key].push("Suporte para telas gráficas ou interfaces de captura de imagem");
				} else {
					scores[key] -= 50;
					reasons[key].push("Incompatível: Sem barramentos físicos dedicados para telas e câmeras");
				}
			} else if (answers.hardware === "usb-native") {
				if (serie.usb && serie.usb !== "Não") {
					scores[key] += 25;
					reasons[key].push(`Interface física USB OTG integrada (${serie.usb}) para depuração direta`);
				} else {
					scores[key] -= 35;
					reasons[key].push("Incompatível: Requer depurador USB-Serial de placa externa");
				}
			} else if (answers.hardware === "many-gpios") {
				const gpios = parseInt(serie.gpio);
				if (gpios >= 35) {
					scores[key] += 20;
					reasons[key].push(`Grade extensiva de portas de expansão com ${gpios} pinos GPIO livres`);
				} else if (gpios >= 22) {
					scores[key] += 10;
					reasons[key].push(`Portas GPIO moderadas (${gpios} pinos)`);
				} else {
					scores[key] -= 20;
					reasons[key].push(`Grade de pinagem física restrita (${gpios} GPIOs)`);
				}
			} else if (answers.hardware === "basic") {
				scores[key] += 10;
			}

			// 5. INTELIGÊNCIA ARTIFICIAL (ai)
			if (answers.ai === "ai-ml") {
				if (serie.aceleradores_ia) {
					scores[key] += 30;
					reasons[key].push("Acelerador vetorial neural de silício dedicado (inferências Edge AI ultra-rápidas)");
				} else {
					scores[key] -= 25;
					reasons[key].push("Desempenho de IA limitado por falta de aceleração nativa em hardware");
				}
			} else if (answers.ai === "standard") {
				scores[key] += 5;
			}

			// 6. SEGURANÇA CRIPTOGRÁFICA (security)
			if (answers.security === "critical") {
				const cripto = serie.aceleradores_cripto || "";

				if (cripto.includes("Key Manager")) {
					scores[key] += 30;
					reasons[key].push("Suíte criptográfica completa em hardware com Key Manager (provisionamento e uso de chaves sem exposição ao firmware)");
				} else if (cripto.includes("ECDSA")) {
					scores[key] += 20;
					reasons[key].push("Aceleradores criptográficos com ECC/ECDSA dedicados (assinatura digital e Secure Boot eficientes)");
				} else if (cripto) {
					scores[key] += 10;
					reasons[key].push("Aceleradores criptográficos básicos em hardware (AES, SHA, Secure Boot e criptografia de flash)");
				} else {
					scores[key] -= 20;
					reasons[key].push("Sem aceleração criptográfica dedicada: operações de segurança ficam a cargo da CPU");
				}
			} else if (answers.security === "standard") {
				scores[key] += 5;
			}
		});
		
		return { scores, reasons };
	};

	const { scores: allScores, reasons: allReasons } = (showResults && Object.values(answers).every(a => a !== null))
		? calculateRecommendations()
		: { scores: {}, reasons: {} };

	const recommendations = Object.entries(allScores)
		.filter(([_, score]) => score > 0)
		.sort(([, a], [, b]) => b - a);

	// Rearrange podium for premium visual styling: 2nd Place | 1st Place | 3rd Place
	const getPodiumOrder = (topThree) => {
		if (topThree.length < 2) return topThree;
		if (topThree.length === 2) return [topThree[1], topThree[0]]; 
		return [topThree[1], topThree[0], topThree[2]]; 
	};

	const topThree = recommendations.slice(0, 3);
	const desktopPodium = getPodiumOrder(topThree);
	const otherRecommendations = recommendations.slice(3);

	const progress = ((currentStep + 1) / questions.length) * 100;

	return (
		<div className="bg-gradient-to-br from-slate-50 via-white to-purple-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<Header />

			<main id="conteudo" className="px-6 pt-16 pb-24 max-w-7xl mx-auto">
				
				{/* Top Header Section */}
				<section className="text-center mb-12 max-w-4xl mx-auto">
					<div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full mb-6 border border-purple-500/20 text-xs font-bold tracking-widest uppercase select-none">
						🎯 Seletor IoT Inteligente
					</div>
					
					<h1 className="text-4xl md:text-6xl font-display font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 leading-tight tracking-tight">
						Seletor Inteligente ESP32
					</h1>
					
					<p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
						Responda a **6 perguntas simples** sobre o propósito, conexões de hardware, alimentação e segurança do seu projeto e encontre instantaneamente o silício Espressif perfeito para sua bancada.
					</p>
				</section>

				{/* Wizard Progress Bar */}
				{!showResults && !showSummary && (
					<div className="max-w-2xl mx-auto mb-10">
						<div className="flex justify-between items-center mb-3">
							<span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
								Etapa {currentStep + 1} de {questions.length}
							</span>
							<span className="text-xs font-extrabold text-purple-600 dark:text-purple-400">
								{Math.round(progress)}% Concluído
							</span>
						</div>
						<div className="w-full bg-slate-200 dark:bg-slate-800/80 rounded-full h-2 overflow-hidden shadow-inner">
							<div 
								className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 ease-out"
								style={{ 
									width: `${progress}%`,
									boxShadow: "0 0 10px rgba(139, 92, 246, 0.3)"
								}}
							></div>
						</div>
					</div>
				)}

				{/* STEP 1: Quiz Card Interface */}
				{currentStep < questions.length && !showResults && !showSummary && (
					<div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-6 md:p-10 max-w-2xl mx-auto shadow-2xl transition-all duration-300">
						<div className="text-center mb-8">
							<h2 className="text-xl md:text-2xl font-display font-extrabold text-slate-850 dark:text-slate-100 mb-3 leading-snug">
								{questions[currentStep].question}
							</h2>
							<p className="text-xs md:text-sm text-slate-450 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
								{questions[currentStep].description}
							</p>
						</div>

						<div className="grid grid-cols-1 gap-3 max-w-xl mx-auto">
							{questions[currentStep].options.map((option) => {
								const isSelected = currentAnswer === option.value;
								return (
									<button
										key={option.value}
										onClick={() => handleAnswer(questions[currentStep].id, option.value)}
										className={`group flex items-center gap-4 text-left border rounded-2xl p-4 transition-all duration-300 cursor-pointer hover:shadow-md active:scale-[0.99] ${
											isSelected
												? 'bg-purple-500/10 dark:bg-purple-400/10 border-purple-500 dark:border-purple-400 shadow-xs'
												: 'bg-slate-50/50 dark:bg-slate-900/20 hover:bg-purple-500/5 dark:hover:bg-purple-400/5 border-slate-200 dark:border-slate-800/80 hover:border-purple-400/50'
										}`}
									>
										{/* Icon Badge */}
										<div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105 ${
											isSelected ? 'bg-purple-500/20' : 'bg-slate-100 dark:bg-slate-800'
										}`}>
											{getOptionIcon(questions[currentStep].id, option.value)}
										</div>

										{/* Label */}
										<span className={`text-xs md:text-sm font-bold transition-colors grow ${
											isSelected
												? 'text-purple-700 dark:text-purple-400'
												: 'text-slate-700 dark:text-slate-350 group-hover:text-purple-600 dark:group-hover:text-purple-400'
										}`}>
											{option.label}
										</span>

										{/* Check Indicator */}
										{isSelected && (
											<div className="w-5 h-5 rounded-full bg-purple-500 dark:bg-purple-400 flex items-center justify-center shrink-0 shadow-xs">
												<span className="text-white text-[10px] font-bold">✓</span>
											</div>
										)}
									</button>
								);
							})}
						</div>

						{/* Bottom Navigation Buttons */}
						<div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
							<button
								onClick={goBack}
								disabled={currentStep === 0}
								className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
									currentStep === 0
										? 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-transparent'
										: 'bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-250 dark:hover:bg-slate-700 hover:shadow-xs'
								}`}
							>
								<ChevronLeft className="w-4 h-4" />
								<span>Voltar</span>
							</button>

							<button
								onClick={resetQuiz}
								className="text-slate-500 dark:text-slate-400 hover:text-slate-850 dark:hover:text-white font-bold transition-colors text-xs py-2.5 cursor-pointer flex items-center gap-1.5 justify-center"
							>
								<RotateCcw className="w-3.5 h-3.5" />
								<span>Reiniciar</span>
							</button>

							<button
								onClick={handleNext}
								disabled={currentAnswer === null}
								className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
									currentAnswer === null
										? 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-transparent'
										: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0'
								}`}
							>
								<span>{currentStep === questions.length - 1 ? 'Revisar' : 'Avançar'}</span>
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					</div>
				)}

				{/* STEP 2: Choice Summary */}
				{showSummary && !showResults && (
					<div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-6 md:p-10 max-w-3xl mx-auto shadow-2xl transition-all duration-300">
						<div className="text-center mb-8">
							<div className="inline-flex items-center justify-center w-14 h-14 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full mb-4 border border-purple-500/20">
								<Award className="w-6 h-6" />
							</div>
							<h2 className="text-xl md:text-2xl font-display font-extrabold text-slate-850 dark:text-slate-100 mb-2">
								Resumo das suas Configurações
							</h2>
							<p className="text-xs text-slate-450 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
								Revise suas escolhas de arquitetura abaixo. Você pode ajustar qualquer especificação individual antes de processar as recomendações.
							</p>
						</div>

						{/* Double Column summary cards */}
						<div className="grid md:grid-cols-2 gap-3 mb-8 max-w-2xl mx-auto">
							{questions.map((question) => {
								const answer = answers[question.id];
								const selectedOption = question.options.find(opt => opt.value === answer);
								
								return (
									<div key={question.id} className="bg-slate-50/50 dark:bg-slate-900/20 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800/80 hover:shadow-xs transition-all flex justify-between items-center gap-3">
										<div className="flex-1 min-w-0">
											<h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 truncate select-none">
												{question.id.replace('connectivity', 'conectividade').replace('hardware', 'periféricos').replace('power', 'alimentação').toUpperCase()}
											</h3>
											{selectedOption && (
												<div className="flex items-center gap-2">
													<div className="w-7 h-7 rounded-lg bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center shrink-0">
														{getOptionIcon(question.id, answer)}
													</div>
													<span className="text-xs font-extrabold text-purple-700 dark:text-purple-450 truncate">
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
											className="p-2 border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-400 bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-950/20 rounded-lg text-slate-400 hover:text-purple-650 dark:hover:text-purple-400 transition-all cursor-pointer shrink-0"
											title="Editar esta resposta"
										>
											<Edit2 className="w-3.5 h-3.5" />
										</button>
									</div>
								);
							})}
						</div>

						<div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center border-t border-slate-200/60 dark:border-slate-800/60 pt-6">
							<button
								onClick={() => {
									setCurrentStep(questions.length - 1);
									setCurrentAnswer(answers[questions[questions.length - 1].id]);
									setShowSummary(false);
								}}
								className="inline-flex items-center justify-center gap-2 bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-250 transition-all duration-300 cursor-pointer"
							>
								<ChevronLeft className="w-4 h-4" />
								<span>Voltar</span>
							</button>

							<button
								onClick={() => setShowResults(true)}
								className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
							>
								<Sparkles className="w-4 h-4" />
								<span>Verificar Recomendações</span>
							</button>
						</div>
					</div>
				)}

				{/* STEP 3: Premium Podium & Results */}
				{showResults && recommendations.length > 0 && (
					<div className="space-y-12 animate-fadeIn">
						
						{/* Desktop Podium Layout */}
						<div className="hidden lg:block">
							<div className="grid grid-cols-3 gap-6 items-end max-w-6xl mx-auto pt-8 pb-6">
								
								{desktopPodium.map((recommendation) => {
									const [seriesKey, score] = recommendation;
									const serie = seriesData[seriesKey];
									const matchReasons = allReasons[seriesKey] || [];
									const rankIdx = topThree.findIndex(([key]) => key === seriesKey);
									
									const rankConfig = [
										{
											badge: "🥇 1º Recomendado",
											cardClass: "border-amber-500/80 dark:border-amber-400 bg-linear-to-b from-amber-500/5 to-transparent shadow-[0_0_40px_rgba(245,158,11,0.25)] min-h-[580px] z-10 scale-[1.03]",
											badgeClass: "text-amber-700 bg-amber-500/10 border-amber-500/20 dark:text-amber-400 dark:bg-amber-500/10",
											scoreClass: "text-amber-600 dark:text-amber-400"
										},
										{
											badge: "🥈 2º Recomendado",
											cardClass: "border-slate-200/80 dark:border-slate-800 bg-linear-to-b from-slate-500/5 to-transparent min-h-[540px] opacity-95 hover:opacity-100",
											badgeClass: "text-slate-650 bg-slate-500/10 border-slate-500/20 dark:text-slate-350 dark:bg-slate-850",
											scoreClass: "text-slate-500 dark:text-slate-300"
										},
										{
											badge: "🥉 3º Recomendado",
											cardClass: "border-amber-800/40 dark:border-slate-850/80 bg-linear-to-b from-amber-800/5 to-transparent min-h-[540px] opacity-95 hover:opacity-100",
											badgeClass: "text-amber-800 bg-amber-800/10 border-amber-800/20 dark:text-amber-450 dark:bg-slate-850",
											scoreClass: "text-amber-700 dark:text-amber-500"
										}
									][rankIdx];

									return (
										<div
											key={seriesKey}
											className={`relative flex flex-col bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:z-20 ${rankConfig.cardClass}`}
										>
											{/* Top Color Band */}
											<div className="h-1 w-full shrink-0" style={{ backgroundColor: serie.cor }} />

											<div className="p-6 pb-0 flex-1 flex flex-col justify-between">
												<div>
													<div className="text-center mb-4 select-none">
														<span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${rankConfig.badgeClass}`}>
															{rankConfig.badge}
														</span>
													</div>

													<div className="text-center mb-6">
														<div className="text-5xl mb-3 transform hover:rotate-6 transition-transform select-none">{serie.icone}</div>
														<h3 className="text-xl font-display font-extrabold text-slate-850 dark:text-slate-100 mb-1 leading-none">
															{seriesKey}
														</h3>
														<p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider truncate">
															{serie.nome_completo}
														</p>
														
														<div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 shadow-xs">
															<span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider">Afinidade:</span>
															<span className={`text-xs font-extrabold ${rankConfig.scoreClass}`}>
																{score} pts
															</span>
														</div>
													</div>

													{/* Specifications Checklist */}
													<div className="space-y-2 border-t border-slate-200/50 dark:border-slate-850/60 pt-4 mb-6 select-none">
														<h4 className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5">Principais Vantagens</h4>
														<ul className="space-y-2">
															{matchReasons.slice(0, 3).map((reason, idx) => (
																<li key={idx} className="flex items-start gap-2 text-xs leading-normal text-slate-600 dark:text-slate-350">
																	<CheckCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-450 mt-0.5 shrink-0" />
																	<span>{reason}</span>
																</li>
															))}
															{matchReasons.length > 3 && (
																<li className="text-[10px] text-slate-400 dark:text-slate-500 italic pl-5.5">
																	+{matchReasons.length - 3} outros requisitos atendidos
																</li>
															)}
														</ul>
													</div>
												</div>

												{/* Spec Mini Badges */}
												<div className="grid grid-cols-2 gap-2 bg-slate-50/50 dark:bg-slate-950/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/40 mb-4 select-none">
													<div className="flex flex-col">
														<span className="text-[8px] font-bold uppercase text-slate-400 tracking-wider">Frequência</span>
														<span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 truncate">{serie.frequencia}</span>
													</div>
													<div className="flex flex-col">
														<span className="text-[8px] font-bold uppercase text-slate-400 tracking-wider">GPIOs Físicas</span>
														<span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 truncate">{serie.gpio} pinos</span>
													</div>
												</div>
											</div>

											{/* Ver Documentação CTA Button */}
											<div className="px-5 pb-5 mt-auto">
												<Link
													href={`/series/${seriesKey}`}
													className="flex items-center justify-center gap-1.5 w-full text-center py-3 rounded-xl font-bold text-white text-xs uppercase tracking-wider hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
													style={{ backgroundColor: serie.cor }}
												>
													<span>Ver Documentação</span>
													<ExternalLink className="w-3.5 h-3.5" />
												</Link>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						{/* Stacked Layout for mobile */}
						<div className="lg:hidden space-y-6 max-w-xl mx-auto">
							<h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center select-none mb-1">Grade de Resultados</h3>
							{topThree.map(([seriesKey, score], index) => {
								const serie = seriesData[seriesKey];
								const matchReasons = allReasons[seriesKey] || [];
								const mobileBadges = ["🥇 1ª Recomendação", "🥈 2ª Recomendação", "🥉 3ª Recomendação"];
								const isFirst = index === 0;

								return (
									<div
										key={seriesKey}
										className={`bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border rounded-3xl overflow-hidden shadow-xl flex flex-col ${
											isFirst ? "border-amber-500 dark:border-amber-400" : "border-slate-200/80 dark:border-slate-800"
										}`}
									>
										<div className="p-5 flex-1">
											<div className="flex justify-between items-center mb-3.5">
												<span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
													isFirst 
														? "text-amber-700 bg-amber-500/10 dark:text-amber-400 border border-amber-500/20" 
														: "text-slate-650 bg-slate-500/10 dark:text-slate-350 dark:bg-slate-850 border border-transparent"
												}`}>
													{mobileBadges[index]}
												</span>
												<span className="text-[10px] font-bold text-slate-450">Score: <strong className="text-xs text-purple-650 dark:text-purple-400 font-extrabold">{score} pts</strong></span>
											</div>

											<div className="flex gap-4 items-start mb-4">
												<span className="text-4xl select-none shrink-0">{serie.icone}</span>
												<div>
													<h4 className="text-base font-bold text-slate-850 dark:text-slate-100 leading-tight">{seriesKey}</h4>
													<p className="text-xs text-slate-450 dark:text-slate-400 leading-snug line-clamp-2 mt-1">{serie.descricao}</p>
												</div>
											</div>

											<div className="space-y-1.5 border-t border-slate-150 dark:border-slate-850/60 pt-3 select-none">
												{matchReasons.slice(0, 3).map((reason, idx) => (
													<div key={idx} className="flex gap-2 items-start text-xs text-slate-600 dark:text-slate-350">
														<CheckCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-450 mt-0.5 shrink-0" />
														<span>{reason}</span>
													</div>
												))}
											</div>
										</div>

										<Link
											href={`/series/${seriesKey}`}
											className="w-full text-center py-3.5 font-bold text-white text-xs uppercase tracking-wider block"
											style={{ backgroundColor: serie.cor }}
										>
											Ver Detalhes do Chip
										</Link>
									</div>
								);
							})}
						</div>

						{/* Other options */}
						{otherRecommendations.length > 0 && (
							<div className="bg-slate-50/50 dark:bg-slate-900/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-850/50 max-w-6xl mx-auto shadow-inner">
								<h3 className="text-lg font-display font-extrabold text-slate-850 dark:text-slate-150 mb-6 text-center select-none">
									Outras Opções Compatíveis
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{otherRecommendations.map(([seriesKey, score]) => {
										const serie = seriesData[seriesKey];
										return (
											<div
												key={seriesKey}
												className="bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
											>
												<div className="text-center mb-4">
													<div className="text-3xl mb-2 select-none">{serie.icone}</div>
													<h4 className="text-xs font-bold text-slate-850 dark:text-slate-250 truncate leading-none">{seriesKey}</h4>
													<span className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold">Afinidade: {score} pts</span>
												</div>
												<Link
													href={`/series/${seriesKey}`}
													className="block w-full text-center py-2.5 rounded-xl font-bold text-white text-[10px] uppercase tracking-wider transition-all duration-300 hover:shadow-xs active:scale-95"
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

						{/* Bottom navigation buttons */}
						<div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-2xl mx-auto border-t border-slate-200 dark:border-slate-850/60 pt-8 select-none">
							<Link
								href="/comparacao"
								className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer w-full sm:w-auto"
							>
								<SlidersHorizontal className="w-3.5 h-3.5" />
								<span>Comparar Lado a Lado</span>
							</Link>

							<button
								onClick={resetQuiz}
								className="inline-flex items-center justify-center gap-2 bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-250 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer active:scale-95 w-full sm:w-auto"
							>
								<RotateCcw className="w-3.5 h-3.5" />
								<span>Refazer Quiz</span>
							</button>
						</div>

						{/* Secondary showcase tools */}
						<div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 max-w-6xl mx-auto shadow-2xl">
							<h3 className="text-lg font-display font-extrabold text-slate-850 dark:text-slate-100 mb-6 text-center select-none">
								Próximos Passos de Desenvolvimento
							</h3>
							<div className="grid md:grid-cols-3 gap-6">
								<Link
									href="/catalogo"
									className="group bg-blue-500/5 dark:bg-blue-950/10 border border-blue-500/10 dark:border-blue-500/20 hover:border-blue-500/40 dark:hover:border-blue-400/40 rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
								>
									<div className="w-9 h-9 rounded-xl bg-blue-500/10 dark:bg-blue-400/15 text-blue-500 dark:text-blue-400 flex items-center justify-center mb-4 shrink-0 shadow-xs select-none">
										<ShoppingBag className="w-4 h-4" />
									</div>
									<h4 className="text-sm font-bold text-slate-850 dark:text-slate-200 mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
										Catálogo de Placas
									</h4>
									<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
										Explore placas de desenvolvimento oficiais e módulos contendo o silício recomendado com links seguros de compra.
									</p>
								</Link>

								<Link
									href="/frameworks"
									className="group bg-purple-500/5 dark:bg-purple-950/10 border border-purple-500/10 dark:border-purple-500/20 hover:border-purple-500/40 dark:hover:border-purple-400/40 rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
								>
									<div className="w-9 h-9 rounded-xl bg-purple-500/10 dark:bg-purple-400/15 text-purple-500 dark:text-purple-400 flex items-center justify-center mb-4 shrink-0 shadow-xs select-none">
										<Cpu className="w-4 h-4" />
									</div>
									<h4 className="text-sm font-bold text-slate-850 dark:text-slate-200 mb-1.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
										Explorar SDKs & Frameworks
									</h4>
									<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
										Descubra qual SDK oficial da Espressif (ESP-IDF, Arduino Core, MicroPython) oferece a melhor pilha de drivers.
									</p>
								</Link>

								<Link
									href="/glossario"
									className="group bg-pink-500/5 dark:bg-pink-950/10 border border-pink-500/10 dark:border-pink-500/20 hover:border-pink-500/40 dark:hover:border-pink-400/40 rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
								>
									<div className="w-9 h-9 rounded-xl bg-pink-500/10 dark:bg-pink-400/15 text-pink-500 dark:text-pink-400 flex items-center justify-center mb-4 shrink-0 shadow-xs select-none">
										<BookOpen className="w-4 h-4" />
									</div>
									<h4 className="text-sm font-bold text-slate-850 dark:text-slate-200 mb-1.5 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
										Glossário de Parâmetros
									</h4>
									<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
										Ficou em dúvida sobre termos de hardware como ULP, SRAM RTC, JTAG ou Matter? Consulte definições rápidas de engenharia.
									</p>
								</Link>
							</div>
						</div>
					</div>
				)}

				{/* STEP 3B: No Results Found */}
				{showResults && recommendations.length === 0 && (
					<div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-8 md:p-10 max-w-2xl mx-auto shadow-2xl transition-all duration-300">
						<div className="text-center mb-8">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full mb-4 border border-amber-500/20">
								<HelpCircle className="w-8 h-8" />
							</div>
							<h2 className="text-xl md:text-2xl font-display font-extrabold text-slate-850 dark:text-slate-100 mb-3">
								Sem Correspondência Exata
							</h2>
							<p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-6 leading-relaxed">
								Não foi possível encontrar um único microcontrolador ESP32 que atenda simultaneamente a todos os critérios. Isso ocorre quando requisitamos combinações extremas (ex: Ethernet industrial cabeada + BLE portátil com economia de bateria ultra-baixa).
							</p>

							<div className="bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850 p-5 rounded-2xl max-w-xl mx-auto mb-6 text-left select-none">
								<h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">💡 Dicas Rápidas de Seleção:</h3>
								<ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
									<li className="flex items-start gap-2">
										<span className="text-purple-500 font-extrabold">•</span>
										<span>Reconsidere os barramentos mais pesados (USB Nativo ou Display/Câmera) e veja se podem ser depurados via Serial UART comum.</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="text-purple-500 font-extrabold">•</span>
										<span>Se o foco principal for Inteligência Artificial e capturar imagens pesadas, a série recomendada primária é a **ESP32-S3**.</span>
									</li>
								</ul>
							</div>
							
							<div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
								<button
									onClick={resetQuiz}
									className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95"
								>
									<RotateCcw className="w-4 h-4" />
									<span>Refazer Quiz</span>
								</button>
								
								<Link
									href="/comparacao"
									className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-350 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 cursor-pointer"
								>
									<SlidersHorizontal className="w-4 h-4" />
									<span>Ver Grade Completa</span>
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
