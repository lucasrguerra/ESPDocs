"use client";

import { useState, useMemo } from "react";
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
	ShieldCheck,
	KeyRound,
	Lock,
	Radio,
	Layers,
	Microchip,
	Activity,
	Flame,
	Check,
	X,
	AlertTriangle,
	Gauge,
	Volume2,
	Tv,
	HardDrive,
	Filter,
	ArrowRight,
	Lightbulb,
	Info
} from "lucide-react";

// Dynamic icon mapper for options and presets
const iconMap = {
	// Categorias
	"category_smarthome": <HomeIcon className="w-5 h-5 text-amber-500" />,
	"category_multimedia": <Monitor className="w-5 h-5 text-cyan-500" />,
	"category_ai_edge": <Bot className="w-5 h-5 text-pink-500" />,
	"category_wearable": <Battery className="w-5 h-5 text-green-500" />,
	"category_industrial": <Cpu className="w-5 h-5 text-purple-500" />,
	"category_basic_iot": <Sparkles className="w-5 h-5 text-emerald-500" />,

	// Conectividade
	"connectivity_wifi6_dualband": <Wifi className="w-5 h-5 text-indigo-500" />,
	"connectivity_wifi6_mesh": <Network className="w-5 h-5 text-teal-500" />,
	"connectivity_mesh_only": <Radio className="w-5 h-5 text-amber-500" />,
	"connectivity_wifi_ble": <Wifi className="w-5 h-5 text-blue-500" />,
	"connectivity_bt_classic_audio": <Volume2 className="w-5 h-5 text-pink-500" />,
	"connectivity_ethernet": <Cable className="w-5 h-5 text-emerald-500" />,
	"connectivity_none_local": <Ban className="w-5 h-5 text-slate-400" />,

	// Alimentação
	"power_battery_critical": <Battery className="w-5 h-5 text-green-500" />,
	"power_ulp_coprocessor": <Activity className="w-5 h-5 text-sky-500" />,
	"power_always_on": <Zap className="w-5 h-5 text-yellow-500" />,

	// Periféricos / Hardware
	"hardware_mipi_multimedia": <Monitor className="w-5 h-5 text-cyan-500" />,
	"hardware_usb_otg": <Cable className="w-5 h-5 text-teal-500" />,
	"hardware_can_twai": <Sliders className="w-5 h-5 text-orange-500" />,
	"hardware_dac_audio": <Volume2 className="w-5 h-5 text-pink-500" />,
	"hardware_many_gpios": <SlidersHorizontal className="w-5 h-5 text-sky-500" />,
	"hardware_standard_sensors": <Cpu className="w-5 h-5 text-slate-400" />,

	// Memória
	"memory_heavy_psram": <HardDrive className="w-5 h-5 text-purple-500" />,
	"memory_moderate_sram": <Layers className="w-5 h-5 text-blue-500" />,
	"memory_minimal_cost": <Sparkles className="w-5 h-5 text-emerald-500" />,

	// IA
	"ai_ai_vector": <Bot className="w-5 h-5 text-pink-500" />,
	"ai_standard": <Ban className="w-5 h-5 text-slate-400" />,

	// Segurança
	"security_key_manager_dpa": <KeyRound className="w-5 h-5 text-red-500" />,
	"security_hardware_ecc_ecdsa": <ShieldCheck className="w-5 h-5 text-teal-500" />,
	"security_matter_ecdsa": <ShieldCheck className="w-5 h-5 text-teal-500" />,
	"security_secure_boot": <Lock className="w-5 h-5 text-amber-500" />,
	"security_standard_tls": <HelpCircle className="w-5 h-5 text-slate-400" />,

	// Ecossistema
	"ecosystem_arduino_ready": <CheckCircle className="w-5 h-5 text-emerald-500" />,
	"ecosystem_advanced_idf": <Cpu className="w-5 h-5 text-purple-500" />,
};

const getOptionIcon = (questionId, value) => {
	const key = `${questionId}_${value}`;
	return iconMap[key] || <HelpCircle className="w-5 h-5 text-slate-400" />;
};

// 7 Preset Configurations for 1-click recommendations
const PRESETS = [
	{
		id: "preset_smarthome",
		title: "Smart Home & Matter",
		icon: "🏠",
		badge: "Automação 802.15.4",
		color: "from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-700 dark:text-teal-300",
		description: "Wi-Fi 6, Thread/Zigbee e baixo consumo",
		answers: {
			category: "smarthome",
			connectivity: "wifi6_mesh",
			power: "ulp_coprocessor",
			hardware: "standard_sensors",
			memory: "moderate_sram",
			ai: "standard",
			security: "hardware_ecc_ecdsa",
			ecosystem: "arduino_ready",
		}
	},
	{
		id: "preset_hmi",
		title: "Painel Touch & Telas",
		icon: "🎨",
		badge: "Display / Câmera",
		color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300",
		description: "Display LCD/MIPI, PSRAM e alta taxa de quadros",
		answers: {
			category: "multimedia",
			connectivity: "wifi_ble",
			power: "always_on",
			hardware: "mipi_multimedia",
			memory: "heavy_psram",
			ai: "standard",
			security: "secure_boot",
			ecosystem: "arduino_ready",
		}
	},
	{
		id: "preset_ai",
		title: "Edge AI & Visão",
		icon: "🧠",
		badge: "Aceleração Vetorial",
		color: "from-pink-500/20 to-purple-500/10 border-pink-500/30 text-pink-700 dark:text-pink-300",
		description: "Acelerador neural, câmera e alta memória",
		answers: {
			category: "ai_edge",
			connectivity: "wifi_ble",
			power: "always_on",
			hardware: "mipi_multimedia",
			memory: "heavy_psram",
			ai: "ai_vector",
			security: "secure_boot",
			ecosystem: "arduino_ready",
		}
	},
	{
		id: "preset_wearable",
		title: "Wearable a Bateria",
		icon: "🔋",
		badge: "Deep Sleep <10µA",
		color: "from-green-500/20 to-emerald-500/10 border-green-500/30 text-green-700 dark:text-green-300",
		description: "Eficiência extrema e rádio Bluetooth LE",
		answers: {
			category: "wearable",
			connectivity: "wifi_ble",
			power: "battery_critical",
			hardware: "standard_sensors",
			memory: "minimal_cost",
			ai: "standard",
			security: "standard_tls",
			ecosystem: "arduino_ready",
		}
	},
	{
		id: "preset_wifi6_5ghz",
		title: "Wi-Fi 6 Dual-Band (5GHz)",
		icon: "📶",
		badge: "2.4 & 5 GHz",
		color: "from-indigo-500/20 to-blue-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-300",
		description: "Banda de 5 GHz com menor interferência de RF",
		answers: {
			category: "smarthome",
			connectivity: "wifi6_dualband",
			power: "always_on",
			hardware: "standard_sensors",
			memory: "moderate_sram",
			ai: "standard",
			security: "key_manager_dpa",
			ecosystem: "arduino_ready",
		}
	},
	{
		id: "preset_industrial",
		title: "Industrial / CAN & Rede",
		icon: "🏭",
		badge: "Ethernet & TWAI",
		color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300",
		description: "Barramento CAN/TWAI, Ethernet e alta robustez",
		answers: {
			category: "industrial",
			connectivity: "ethernet",
			power: "always_on",
			hardware: "can_twai",
			memory: "moderate_sram",
			ai: "standard",
			security: "secure_boot",
			ecosystem: "arduino_ready",
		}
	},
	{
		id: "preset_budget",
		title: "IoT Básico de Baixo Custo",
		icon: "💸",
		badge: "Ultra-Econômico",
		color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
		description: "Menor custo por unidade para sensores simples",
		answers: {
			category: "basic_iot",
			connectivity: "wifi_ble",
			power: "battery_critical",
			hardware: "standard_sensors",
			memory: "minimal_cost",
			ai: "standard",
			security: "standard_tls",
			ecosystem: "arduino_ready",
		}
	}
];

export default function Seletor() {
	const [mode, setMode] = useState("wizard"); // "wizard" | "filter"
	const [currentStep, setCurrentStep] = useState(0);
	const [currentAnswer, setCurrentAnswer] = useState(null);
	const [activePreset, setActivePreset] = useState(null);

	const [answers, setAnswers] = useState({
		category: null,
		connectivity: null,
		power: null,
		hardware: null,
		memory: null,
		ai: null,
		security: null,
		ecosystem: null,
	});

	const [showResults, setShowResults] = useState(false);
	const [showSummary, setShowSummary] = useState(false);

	// Direct Parametric Filter State (for "filter" mode)
	const [filters, setFilters] = useState({
		wifi6: false,
		wifi5ghz: false,
		bluetoothClassic: false,
		leAudio: false,
		matter: false,
		ethernet: false,
		aiAccel: false,
		psram: false,
		mipiDisplayCamera: false,
		usbOTG: false,
		canBus: false,
		dac: false,
		touch: false,
		arduinoReady: false,
		keyManager: false,
		eccHardware: false,
		ecdsaHardware: false,
		secureBootV2: false,
	});

	const questions = [
		{
			id: "category",
			question: "1. Qual é o foco principal ou aplicação do seu projeto?",
			description: "Categorizar sua aplicação ajuda a equilibrar formato físico, custo por unidade, barramentos de mídia e poder computacional.",
			options: [
				{ value: "smarthome", label: "Automação / Smart Home / Dispositivos Conectados", icon: "category_smarthome" },
				{ value: "multimedia", label: "Interfaces Gráficas (Telas LCD/MIPI / Câmeras / IHM)", icon: "category_multimedia" },
				{ value: "ai_edge", label: "Inteligência Artificial na Borda (Visão / Áudio / TinyML)", icon: "category_ai_edge" },
				{ value: "wearable", label: "Dispositivo Portátil / Vestível (Alimentado a Bateria)", icon: "category_wearable" },
				{ value: "industrial", label: "Industrial / Robótica / Redes de Campo e Automação", icon: "category_industrial" },
				{ value: "basic_iot", label: "IoT Básico / Sensor Conectado de Ultra-Baixo Custo", icon: "category_basic_iot" },
			]
		},
		{
			id: "connectivity",
			question: "2. Qual tecnologia de rede sem fio ou cabeada você precisa?",
			description: "O ecossistema ESP32 oferece desde rádios Wi-Fi 6 Dual-Band (2.4/5GHz), Bluetooth 6 e Mesh 802.15.4 até Ethernet cabeada e Bluetooth Clássico.",
			options: [
				{ value: "wifi6_dualband", label: "Wi-Fi 6 Dual-Band (2.4 GHz e 5 GHz) + Bluetooth 6.0", icon: "connectivity_wifi6_dualband" },
				{ value: "wifi6_mesh", label: "Wi-Fi 6 (2.4 GHz) + Matter / Zigbee 3.0 / Thread (802.15.4)", icon: "connectivity_wifi6_mesh" },
				{ value: "mesh_only", label: "Apenas Rádio Mesh (Zigbee / Thread / Matter) + BLE (Sem Wi-Fi)", icon: "connectivity_mesh_only" },
				{ value: "wifi_ble", label: "Wi-Fi 4 Tradicional (2.4 GHz) + Bluetooth LE", icon: "connectivity_wifi_ble" },
				{ value: "bt_classic_audio", label: "Bluetooth Clássico BR/EDR (Áudio A2DP / SPP Serial)", icon: "connectivity_bt_classic_audio" },
				{ value: "ethernet", label: "Rede Cabeada Industrial (Ethernet MAC integrado)", icon: "connectivity_ethernet" },
				{ value: "none_local", label: "Apenas Processamento Local / Sem Conexão Sem Fio", icon: "connectivity_none_local" },
			]
		},
		{
			id: "power",
			question: "3. Como o dispositivo será alimentado eletricamente?",
			description: "A escolha da fonte define a importância de modos de Deep Sleep ultra-baixos (<10µA) e coprocessadores ULP para monitoramento contínuo.",
			options: [
				{ value: "battery_critical", label: "Bateria / Solar (Consumo Ultra-Baixo em Deep Sleep <10µA)", icon: "power_battery_critical" },
				{ value: "ulp_coprocessor", label: "Misto / Monitorar sensores em background via Coprocessador ULP", icon: "power_ulp_coprocessor" },
				{ value: "always_on", label: "Tomada, Fonte Externa ou USB (Sempre Ativo / Alto Desempenho)", icon: "power_always_on" },
			]
		},
		{
			id: "hardware",
			question: "4. Quais periféricos ou barramentos físicos especiais você vai usar?",
			description: "Algumas funcionalidades exigem blocos de silício dedicados, como interfaces de vídeo MIPI/RGB, barramento CAN industrial ou USB nativo.",
			options: [
				{ value: "mipi_multimedia", label: "Display Gráfico LCD (RGB/MIPI DSI) ou Câmeras (DVP/MIPI CSI)", icon: "hardware_mipi_multimedia" },
				{ value: "usb_otg", label: "USB Nativo OTG / Host (Emular teclado/mouse HID, CDC ou modo Host)", icon: "hardware_usb_otg" },
				{ value: "can_twai", label: "Barramento Automotivo / Industrial CAN (TWAI ou CAN-FD)", icon: "hardware_can_twai" },
				{ value: "dac_audio", label: "Áudio Analógico com DAC integrado (saída direta de som)", icon: "hardware_dac_audio" },
				{ value: "many_gpios", label: "Muitos pinos livres de expansão (Mais de 35 GPIOs físicos)", icon: "hardware_many_gpios" },
				{ value: "standard_sensors", label: "Sensores comuns com barramentos tradicionais (I2C, SPI, UART, PWM)", icon: "hardware_standard_sensors" },
			]
		},
		{
			id: "memory",
			question: "5. Qual o volume de memória RAM / PSRAM necessário?",
			description: "Projetos gráficos (LVGL), visão computacional, áudio ou pilhas pesadas exigem suporte a PSRAM externa ou integrada de alta densidade.",
			options: [
				{ value: "heavy_psram", label: "Alta Densidade de PSRAM (>4 MB a 64 MB para buffers de vídeo, IA ou LVGL)", icon: "memory_heavy_psram" },
				{ value: "moderate_sram", label: "SRAM interna equilibrada (320 KB a 512 KB) com ou sem PSRAM leve", icon: "memory_moderate_sram" },
				{ value: "minimal_cost", label: "Memória compacta e econômica (firmware enxuto de baixo custo)", icon: "memory_minimal_cost" },
			]
		},
		{
			id: "ai",
			question: "6. Seu projeto usará Inteligência Artificial local (Edge AI / TinyML)?",
			description: "Instruções vetoriais e aceleradores neurais dedicados em hardware reduzem o tempo de inferência de redes neurais de segundos para milissegundos.",
			options: [
				{ value: "ai_vector", label: "Sim, preciso de acelerador vetorial de IA em hardware (TinyML / Visão)", icon: "ai_ai_vector" },
				{ value: "standard", label: "Não, processamento lógico e matemático comum é suficiente", icon: "ai_standard" },
			]
		},
		{
			id: "security",
			question: "7. Qual nível de segurança e criptografia por hardware o produto exige?",
			description: "As séries diferem em suporte a Key Manager, proteção contra ataques de canal lateral (DPA), curvas elípticas (ECC/ECDSA) e aceleradores AES.",
			options: [
				{ value: "key_manager_dpa", label: "Proteção Máxima: Key Manager em hardware (chave isolada da CPU) e Proteção DPA", icon: "security_key_manager_dpa" },
				{ value: "hardware_ecc_ecdsa", label: "Acelerador de Curvas Elípticas (ECC) e Assinatura Digital ECDSA por hardware", icon: "security_hardware_ecc_ecdsa" },
				{ value: "secure_boot", label: "Boot Seguro V2 e Criptografia de Flash (XTS-AES) contra cópia do firmware", icon: "security_secure_boot" },
				{ value: "standard_tls", label: "Comunicação TLS/HTTPS comum (Aceleradores AES e SHA por hardware)", icon: "security_standard_tls" },
			]
		},
		{
			id: "ecosystem",
			question: "8. Qual é a sua preferência de ambiente de desenvolvimento?",
			description: "Chips mais maduros têm amplo suporte oficial no Arduino Core com centenas de bibliotecas prontas, enquanto chips preliminares utilizam ESP-IDF.",
			options: [
				{ value: "arduino_ready", label: "Pronto para Arduino IDE (suporte maduro com vasta coleção de bibliotecas)", icon: "ecosystem_arduino_ready" },
				{ value: "advanced_idf", label: "ESP-IDF profissional ou aberto a silícios de última geração (S31, H4, etc.)", icon: "ecosystem_advanced_idf" },
			]
		}
	];

	const handleAnswer = (questionId, value) => {
		setCurrentAnswer(value);
		setAnswers(prev => ({ ...prev, [questionId]: value }));
		setActivePreset(null);
	};

	const handleNext = () => {
		if (currentAnswer !== null) {
			if (currentStep < questions.length - 1) {
				const nextStep = currentStep + 1;
				setCurrentStep(nextStep);
				setCurrentAnswer(answers[questions[nextStep].id] || null);
			} else {
				setShowSummary(true);
			}
		}
	};

	const goBack = () => {
		if (currentStep > 0) {
			const prevStep = currentStep - 1;
			setCurrentStep(prevStep);
			setCurrentAnswer(answers[questions[prevStep].id] || null);
		}
	};

	const resetQuiz = () => {
		setCurrentStep(0);
		setCurrentAnswer(null);
		setShowResults(false);
		setShowSummary(false);
		setActivePreset(null);
		setAnswers({
			category: null,
			connectivity: null,
			power: null,
			hardware: null,
			memory: null,
			ai: null,
			security: null,
			ecosystem: null,
		});
	};

	const applyPreset = (preset) => {
		setAnswers(preset.answers);
		setActivePreset(preset.id);
		setCurrentStep(questions.length - 1);
		setCurrentAnswer(preset.answers.ecosystem);
		setShowSummary(false);
		setShowResults(true);
	};

	// Comprehensive Multi-Criteria Scoring Engine based on series.json
	const calculateRecommendations = () => {
		const scores = {};
		const reasons = {};
		const alerts = {};

		Object.keys(seriesData).forEach(key => {
			scores[key] = 0;
			reasons[key] = [];
			alerts[key] = [];
			const serie = seriesData[key];
			const seg = serie.seguranca || {};

			// 1. CATEGORIA (category)
			if (answers.category === "smarthome") {
				if (serie.matter === "Sim") {
					scores[key] += 25;
					reasons[key].push("Suporte nativo a Matter para interoperabilidade residencial inteligente");
				}
				if (serie.zigbee_thread && serie.zigbee_thread !== "Não") {
					scores[key] += 20;
					reasons[key].push("Rádio 802.15.4 integrado compatível com Zigbee 3.0 e Thread");
				}
				if (serie.wifi && !String(serie.wifi).includes("Não")) {
					scores[key] += 10;
					reasons[key].push("Rádio Wi-Fi integrado para conexão direta ao roteador");
				}
			} else if (answers.category === "multimedia") {
				if (serie.mipi_dsi || serie.mipi_csi) {
					scores[key] += 35;
					reasons[key].push("Barramentos avançados de alta velocidade MIPI DSI (telas) e MIPI CSI (câmeras)");
				} else if (serie.lcd || serie.camera) {
					scores[key] += 25;
					reasons[key].push("Interfaces dedicadas em hardware para telas LCD RGB e câmeras DVP");
				} else {
					scores[key] -= 40;
					alerts[key].push("Sem barramentos dedicados para telas coloridas ou câmeras (apenas SPI/I2C simples)");
				}

				if (serie.psram_externa && serie.psram_externa !== "Não") {
					scores[key] += 20;
					reasons[key].push("Suporte a PSRAM de alta capacidade para framebuffers gráficos e processamento de imagem");
				}
			} else if (answers.category === "ai_edge") {
				if (serie.aceleradores_ia) {
					scores[key] += 40;
					reasons[key].push(`Aceleração neural e instruções vetoriais dedicadas (${serie.aceleradores_ia})`);
				} else {
					scores[key] -= 50;
					alerts[key].push("Sem aceleradores neurais dedicados em hardware");
				}
				if (serie.nucleos && serie.nucleos.includes("2")) {
					scores[key] += 10;
					reasons[key].push("Processador Dual-Core para pipeline paralelo de captura e inferência");
				}
			} else if (answers.category === "wearable") {
				const sleep = serie.consumo_energia?.deep_sleep;
				if (sleep) {
					const uaMatch = sleep.match(/(\d+)\s*µA/);
					if (uaMatch && parseInt(uaMatch[1]) <= 10) {
						scores[key] += 25;
						reasons[key].push(`Consumo em Deep Sleep ultrabaixo de apenas ${sleep} preserva baterias compactas`);
					}
				}
				if (serie.bluetooth && serie.bluetooth !== "Não") {
					scores[key] += 15;
					reasons[key].push("Rádio Bluetooth de alta eficiência energética para pareamento contínuo");
				}
				if (key === "ESP32-C2" || key === "ESP32-C3" || key === "ESP32-H2") {
					scores[key] += 10;
					reasons[key].push("Encapsulamento compacto QFN reduz o footprint na placa");
				}
			} else if (answers.category === "industrial") {
				if (serie.ethernet || serie.ethernet_mac) {
					scores[key] += 30;
					reasons[key].push("Controlador MAC Ethernet integrado para conexões cabeadas industriais imunes a ruídos de RF");
				}
				if (serie.can) {
					scores[key] += 25;
					reasons[key].push(`Interface de barramento industrial ${serie.can}`);
				}
				if (parseInt(serie.gpio) >= 30) {
					scores[key] += 10;
					reasons[key].push(`Ampla contagem de portas digitais (${serie.gpio} GPIOs) para relés e atuadores`);
				}
			} else if (answers.category === "basic_iot") {
				if (key === "ESP32-C2" || key === "ESP32-C3" || key === "ESP32-C61") {
					scores[key] += 30;
					reasons[key].push("Excelente relação custo-benefício para sensores e atuadores conectados em escala");
				}
				if (serie.wifi && !String(serie.wifi).includes("Não") && serie.bluetooth !== "Não") {
					scores[key] += 15;
					reasons[key].push("Wi-Fi + BLE integrados em módulo econômico");
				}
			}

			// 2. CONECTIVIDADE (connectivity)
			if (answers.connectivity === "wifi6_dualband") {
				if (String(serie.wifi).includes("5 GHz") || String(serie.wifi).includes("dual-band")) {
					scores[key] += 50;
					reasons[key].push("Exclusivo Wi-Fi 6 Dual-Band (2.4 GHz e 5 GHz) para ambientes com alto ruído de RF");
				} else {
					scores[key] -= 250;
					alerts[key].push("Incompatível: Não possui rádio Wi-Fi na faixa de 5 GHz");
				}
			} else if (answers.connectivity === "wifi6_mesh") {
				if (String(serie.wifi).includes("Wi-Fi 6") && serie.matter === "Sim") {
					scores[key] += 40;
					reasons[key].push("Wi-Fi 6 (802.11ax) somado a rádio 802.15.4 para Thread/Zigbee/Matter");
				} else if (serie.matter === "Sim") {
					scores[key] += 15;
					reasons[key].push("Suporte a Matter/Thread, porém sem Wi-Fi 6");
				} else {
					scores[key] -= 150;
					alerts[key].push("Incompatível: Sem rádio 802.15.4 integrado para Thread/Zigbee");
				}
			} else if (answers.connectivity === "mesh_only") {
				if ((serie.wifi === "Não" || !serie.wifi) && serie.matter === "Sim") {
					scores[key] += 45;
					reasons[key].push("Foco 100% em 802.15.4 (Zigbee/Thread/Matter) com baixo consumo e sem rádio Wi-Fi");
				} else if (serie.matter === "Sim") {
					scores[key] += 20;
					reasons[key].push("Suporta redes Mesh (Zigbee/Thread), mas inclui rádio Wi-Fi adicional");
				} else {
					scores[key] -= 180;
					alerts[key].push("Incompatível: Sem rádio 802.15.4 para protocolo Thread ou Zigbee");
				}
			} else if (answers.connectivity === "wifi_ble") {
				if (serie.wifi && !String(serie.wifi).includes("Não") && serie.bluetooth && serie.bluetooth !== "Não") {
					scores[key] += 30;
					reasons[key].push(`Pilha completa com Wi-Fi (${serie.wifi}) e Bluetooth (${serie.bluetooth})`);
				} else if (serie.wifi && !String(serie.wifi).includes("Não")) {
					scores[key] += 10;
					alerts[key].push("Possui Wi-Fi, mas não possui rádio Bluetooth integrado");
				} else {
					scores[key] -= 200;
					alerts[key].push("Incompatível: Não possui rádio Wi-Fi integrado");
				}
			} else if (answers.connectivity === "bt_classic_audio") {
				if (String(serie.bluetooth).includes("Classic") || String(serie.bluetooth).includes("Clássico")) {
					scores[key] += 50;
					reasons[key].push("Suporte a Bluetooth Clássico (BR/EDR) com perfis A2DP de áudio e SPP serial");
				} else {
					scores[key] -= 250;
					alerts[key].push("Incompatível: Não possui Bluetooth Clássico (apenas BLE, incompatível com áudio A2DP legado)");
				}
			} else if (answers.connectivity === "ethernet") {
				if (serie.ethernet || serie.ethernet_mac) {
					scores[key] += 45;
					reasons[key].push("Controlador MAC Ethernet nativo integrado (requer apenas transceiver PHY)");
				} else {
					scores[key] -= 180;
					alerts[key].push("Sem MAC Ethernet interno (necessita de módulo SPI Ethernet externo como W5500)");
				}
			} else if (answers.connectivity === "none_local") {
				if (serie.wifi === "Não" || serie.bluetooth === "Não" || key === "ESP32-P4") {
					scores[key] += 35;
					reasons[key].push("Arquitetura orientada a processamento local dedicado sem custo de transceivers de rádio");
				} else {
					scores[key] += 10;
				}
			}

			// 3. ALIMENTAÇÃO (power)
			if (answers.power === "battery_critical") {
				const sleep = serie.consumo_energia?.deep_sleep;
				if (sleep) {
					const uaMatch = sleep.match(/(\d+)\s*µA/);
					if (uaMatch && parseInt(uaMatch[1]) <= 10) {
						scores[key] += 25;
						reasons[key].push(`Consumo de suspensão de ${sleep} permite operação prolongada por bateria`);
					} else {
						scores[key] += 10;
						reasons[key].push(`Modo de baixo consumo de ${sleep}`);
					}
				}
				if (serie.coprocessador_ulp && serie.coprocessador_ulp !== "Não") {
					scores[key] += 10;
					reasons[key].push("Coprocessador ULP permite checar pinos sem despertar a CPU principal");
				}
			} else if (answers.power === "ulp_coprocessor") {
				if (serie.coprocessador_ulp && serie.coprocessador_ulp !== "Não") {
					scores[key] += 35;
					reasons[key].push(`Coprocessador ULP / CPU de Baixo Consumo (${serie.coprocessador_ulp})`);
				} else {
					scores[key] -= 30;
					alerts[key].push("Sem coprocessador ULP dedicado");
				}
			} else if (answers.power === "always_on") {
				if (serie.nucleos && serie.nucleos.includes("2")) {
					scores[key] += 15;
					reasons[key].push("Processador Dual-Core para multitarefa paralela contínua");
				}
				const freqMatch = serie.frequencia?.match(/(\d+)\s*MHz/);
				if (freqMatch && parseInt(freqMatch[1]) >= 240) {
					scores[key] += 15;
					reasons[key].push(`Frequência de clock de alto desempenho (${serie.frequencia})`);
				}
			}

			// 4. HARDWARE & PERIFÉRICOS (hardware)
			if (answers.hardware === "mipi_multimedia") {
				if (serie.mipi_dsi || serie.mipi_csi) {
					scores[key] += 40;
					reasons[key].push("Interface MIPI DSI (telas) e MIPI CSI (câmeras) de altíssima taxa de transferência");
				} else if (serie.lcd || serie.camera) {
					scores[key] += 25;
					reasons[key].push("Interfaces paralelas para LCD RGB e câmeras DVP de 8/16 bits");
				} else {
					scores[key] -= 180;
					alerts[key].push("Incompatível: Sem interfaces dedicadas de tela/câmera (limitado a barramento SPI/I2C)");
				}
			} else if (answers.hardware === "usb_otg") {
				if (serie.usb && String(serie.usb).includes("OTG 2.0")) {
					scores[key] += 40;
					reasons[key].push(`Porta USB 2.0 High-Speed OTG (${serie.usb}) para emulação HID, CDC e modo Host`);
				} else if (serie.usb && String(serie.usb).includes("OTG")) {
					scores[key] += 30;
					reasons[key].push(`Interface USB OTG 1.1 integrada (${serie.usb}) para emulação HID e Host`);
				} else {
					scores[key] -= 160;
					alerts[key].push("Incompatível: Sem USB OTG nativo (USB Serial/JTAG não suporta modo Host ou HID customizado)");
				}
			} else if (answers.hardware === "can_twai") {
				if (serie.can && String(serie.can).includes("CAN FD")) {
					scores[key] += 40;
					reasons[key].push("Controlador avançado CAN-FD (Flexible Data-Rate) para alta largura de banda automotiva");
				} else if (serie.can) {
					scores[key] += 30;
					reasons[key].push(`Controlador de barramento industrial ${serie.can}`);
				} else {
					scores[key] -= 150;
					alerts[key].push("Incompatível: Sem controlador de barramento CAN / TWAI nativo");
				}
			} else if (answers.hardware === "dac_audio") {
				if (serie.dac && serie.dac !== "Não") {
					scores[key] += 45;
					reasons[key].push(`Conversores Digital-Analógico embutidos (${serie.dac}) para saída de áudio direta sem DAC externo`);
				} else {
					scores[key] -= 150;
					alerts[key].push("Incompatível: Não possui conversor DAC interno de áudio (requer codec I2S externo)");
				}
			} else if (answers.hardware === "many_gpios") {
				const gpios = parseInt(serie.gpio) || 0;
				if (gpios >= 40) {
					scores[key] += 35;
					reasons[key].push(`Excepcional número de pinos disponíveis (${gpios} GPIOs)`);
				} else if (gpios >= 28) {
					scores[key] += 15;
					reasons[key].push(`Quantidade moderada de portas (${gpios} GPIOs)`);
				} else {
					scores[key] -= 60;
					alerts[key].push(`Contagem restrita de pinos (${gpios} GPIOs)`);
				}
			} else if (answers.hardware === "standard_sensors") {
				scores[key] += 10;
			}

			// 5. MEMÓRIA & PSRAM (memory)
			if (answers.memory === "heavy_psram") {
				if (serie.psram_externa && (String(serie.psram_externa).includes("64 MB") || String(serie.psram_externa).includes("1 GB"))) {
					scores[key] += 40;
					reasons[key].push(`Expansão massiva de memória PSRAM (${serie.psram_externa})`);
				} else if (serie.psram_externa && serie.psram_externa !== "Não") {
					scores[key] += 25;
					reasons[key].push(`Suporte a memória PSRAM externa (${serie.psram_externa})`);
				} else {
					scores[key] -= 180;
					alerts[key].push("Incompatível: Sem suporte a memória PSRAM externa ou integrada");
				}
			} else if (answers.memory === "moderate_sram") {
				const sramMatch = serie.memoria_sram?.match(/(\d+)\s*KB/);
				if (sramMatch && parseInt(sramMatch[1]) >= 380) {
					scores[key] += 15;
					reasons[key].push(`SRAM interna confortável (${serie.memoria_sram})`);
				} else {
					scores[key] += 8;
				}
			} else if (answers.memory === "minimal_cost") {
				if (key === "ESP32-C2" || key === "ESP32-C3" || key === "ESP32-H2") {
					scores[key] += 25;
					reasons[key].push("Memória enxuta e silício compacto para menor custo unitário");
				} else {
					scores[key] += 5;
				}
			}

			// 6. INTELIGÊNCIA ARTIFICIAL (ai)
			if (answers.ai === "ai_vector") {
				if (serie.aceleradores_ia) {
					scores[key] += 45;
					reasons[key].push("Acelerador neural de silício e instruções vetoriais para inferência veloz");
				} else {
					scores[key] -= 180;
					alerts[key].push("Incompatível: Sem aceleração vetorial por hardware para IA na borda");
				}
			} else if (answers.ai === "standard") {
				scores[key] += 5;
			}

			// 7. SEGURANÇA (security)
			const temECDSA = String(seg.ecdsa).startsWith("Sim");
			const temECC = String(seg.ecc).startsWith("Sim");
			const temAES = String(seg.aes).startsWith("AES");
			const temKeyManager = seg.key_manager === "Sim";
			const temDPA = seg.protecao_dpa === "Sim";

			if (answers.security === "key_manager_dpa") {
				if (temKeyManager && temDPA) {
					scores[key] += 45;
					reasons[key].push("Key Manager em silício (chaves isoladas da CPU) e proteção contra análise de consumo DPA");
				} else if (temKeyManager) {
					scores[key] += 35;
					reasons[key].push("Periférico Key Manager integrado para isolamento total de chaves privadas");
				} else if (temDPA) {
					scores[key] += 20;
					reasons[key].push("Proteção física DPA em hardware contra ataques de canal lateral");
				} else {
					scores[key] -= 160;
					alerts[key].push("Incompatível: Sem Key Manager nem proteção física contra DPA");
				}
			} else if (answers.security === "hardware_ecc_ecdsa") {
				if (temECDSA) {
					scores[key] += 40;
					reasons[key].push(`Acelerador de assinatura digital ECDSA determinístico em hardware (${seg.ecc})`);
				} else if (temECC) {
					scores[key] += 30;
					reasons[key].push(`Coprocessador de curvas elípticas ECC em hardware (${seg.ecc})`);
				} else {
					scores[key] -= 220;
					alerts[key].push("Incompatível: Não possui acelerador de hardware para curvas elípticas (ECC/ECDSA)");
				}
			} else if (answers.security === "secure_boot") {
				if (String(seg.secure_boot).includes("V2")) {
					scores[key] += 25;
					reasons[key].push(`Secure Boot ${seg.secure_boot} com criptografia de flash ${seg.criptografia_flash}`);
				} else if (String(seg.secure_boot).includes("V1")) {
					scores[key] += 5;
					alerts[key].push("Secure Boot em esquema V1 (legado com limitações de segurança)");
				} else {
					scores[key] -= 80;
					alerts[key].push("Sem Secure Boot V2 estável");
				}
			} else if (answers.security === "standard_tls") {
				if (temAES) {
					scores[key] += 15;
					reasons[key].push(`Criptografia de tráfego TLS acelerada por hardware (${seg.aes})`);
				} else {
					scores[key] += 5;
				}
			}

			// 8. ECOSSISTEMA (ecosystem)
			if (answers.ecosystem === "arduino_ready") {
				if (String(serie.arduino_core).startsWith("Sim")) {
					const countMatch = serie.arduino_core.match(/(\d+)\s*definições/);
					const count = countMatch ? parseInt(countMatch[1]) : 1;
					if (count >= 20) {
						scores[key] += 25;
						reasons[key].push(`Excelente maturidade no core oficial Arduino (${count} variantes de placas)`);
					} else {
						scores[key] += 15;
						reasons[key].push(`Suporte no core oficial Arduino (${count} placa registrada)`);
					}
				} else {
					scores[key] -= 200;
					alerts[key].push("Incompatível: Ainda não suportado no core oficial do Arduino (desenvolvimento restrito ao ESP-IDF)");
				}
			} else if (answers.ecosystem === "advanced_idf") {
				scores[key] += 15;
			}
		});

		return { scores, reasons, alerts };
	};

	// Parametric Direct Filter Matcher
	const filteredChips = useMemo(() => {
		if (mode !== "filter") return [];

		return Object.entries(seriesData).filter(([key, serie]) => {
			const seg = serie.seguranca || {};

			if (filters.wifi6 && !String(serie.wifi).includes("Wi-Fi 6") && !String(serie.wifi).includes("802.11ax")) return false;
			if (filters.wifi5ghz && (!serie.wifi || !String(serie.wifi).includes("5 GHz"))) return false;
			if (filters.bluetoothClassic && (!serie.bluetooth || (!String(serie.bluetooth).includes("Classic") && !String(serie.bluetooth).includes("Clássico")))) return false;
			if (filters.leAudio && (!serie.bluetooth || !String(serie.bluetooth).includes("LE Audio"))) return false;
			if (filters.matter && serie.matter !== "Sim") return false;
			if (filters.ethernet && !serie.ethernet && !serie.ethernet_mac) return false;
			if (filters.aiAccel && !serie.aceleradores_ia) return false;
			if (filters.psram && (!serie.psram_externa || serie.psram_externa === "Não")) return false;
			if (filters.mipiDisplayCamera && !serie.mipi_dsi && !serie.mipi_csi && !serie.lcd && !serie.camera) return false;
			if (filters.usbOTG && (!serie.usb || !String(serie.usb).includes("OTG"))) return false;
			if (filters.canBus && !serie.can) return false;
			if (filters.dac && (!serie.dac || serie.dac === "Não")) return false;
			if (filters.touch && (!serie.touch || serie.touch === "Não")) return false;
			if (filters.arduinoReady && (!serie.arduino_core || !String(serie.arduino_core).startsWith("Sim"))) return false;
			if (filters.keyManager && seg.key_manager !== "Sim") return false;
			if (filters.eccHardware && (!seg.ecc || seg.ecc === "Não")) return false;
			if (filters.ecdsaHardware && (!seg.ecdsa || !String(seg.ecdsa).startsWith("Sim"))) return false;
			if (filters.secureBootV2 && (!seg.secure_boot || !String(seg.secure_boot).includes("V2"))) return false;

			return true;
		});
	}, [mode, filters]);

	const { scores: allScores, reasons: allReasons, alerts: allAlerts } = useMemo(() => {
		if (showResults && Object.values(answers).every(a => a !== null)) {
			return calculateRecommendations();
		}
		return { scores: {}, reasons: {}, alerts: {} };
	}, [showResults, answers]);

	const recommendations = useMemo(() => {
		const entries = Object.entries(allScores)
			.filter(([_, score]) => score > 0)
			.sort(([, a], [, b]) => b - a);

		const maxScore = entries.length > 0 ? entries[0][1] : 1;

		return entries.map(([key, score]) => ({
			key,
			score,
			percentage: Math.min(100, Math.round((score / maxScore) * 100)),
		}));
	}, [allScores]);

	const topThree = recommendations.slice(0, 3);
	const otherRecommendations = recommendations.slice(3);

	// Rearrange podium for premium visual styling: 2nd Place | 1st Place | 3rd Place
	const desktopPodium = useMemo(() => {
		if (topThree.length < 2) return topThree;
		if (topThree.length === 2) return [topThree[1], topThree[0]];
		return [topThree[1], topThree[0], topThree[2]];
	}, [topThree]);

	const progress = ((currentStep + 1) / questions.length) * 100;

	return (
		<div className="bg-gradient-to-br from-slate-100 via-slate-50 to-purple-100/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<Header />

			<main id="conteudo" className="px-4 sm:px-6 pt-12 pb-24 max-w-7xl mx-auto">

				{/* Top Hero Section */}
				<section className="text-center mb-10 max-w-4xl mx-auto">
					<div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-4 py-1.5 rounded-full mb-4 border border-purple-500/20 text-xs font-bold tracking-widest uppercase select-none shadow-xs">
						🎯 Seletor IoT Inteligente Espressif
					</div>

					<h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
						Qual ESP32 Escolher?
					</h1>

					<p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
						Descubra o modelo ideal de ESP32 para o seu projeto com base em conectividade (Wi-Fi 6, Dual-Band, Thread/Matter), periféricos, segurança e consumo elétrico.
					</p>

					{/* Mode Switcher: Wizard vs Direct Parametric Filter */}
					<div className="inline-flex p-1 bg-slate-200/80 dark:bg-slate-900 rounded-2xl mt-6 border border-slate-300 dark:border-slate-800 shadow-inner">
						<button
							onClick={() => { setMode("wizard"); }}
							className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
								mode === "wizard"
									? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-350 shadow-md scale-[1.02]"
									: "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
							}`}
						>
							<Sparkles className="w-4 h-4" />
							<span>Assistente Guiado</span>
						</button>

						<button
							onClick={() => { setMode("filter"); }}
							className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
								mode === "filter"
									? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-350 shadow-md scale-[1.02]"
									: "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
							}`}
						>
							<Filter className="w-4 h-4" />
							<span>Filtro Paramétrico</span>
						</button>
					</div>
				</section>

				{/* 1-CLICK PRESETS BAR */}
				{mode === "wizard" && !showResults && (
					<section className="mb-10 max-w-5xl mx-auto">
						<div className="flex items-center gap-2 mb-3">
							<Lightbulb className="w-4 h-4 text-amber-500" />
							<h2 className="text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
								Atalhos Rápidos por Aplicação (1 Clique)
							</h2>
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
							{PRESETS.map((preset) => {
								const isSelected = activePreset === preset.id;
								return (
									<button
										key={preset.id}
										onClick={() => applyPreset(preset)}
										className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer hover:shadow-md active:scale-95 flex flex-col justify-between ${
											isSelected
												? "bg-purple-500/15 border-purple-500 shadow-sm"
												: "bg-white/80 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/80 border-slate-200 dark:border-slate-800/80"
										}`}
									>
										<div>
											<div className="text-2xl mb-1.5">{preset.icon}</div>
											<h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 line-clamp-1 leading-snug">
												{preset.title}
											</h3>
											<p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-tight">
												{preset.badge}
											</p>
										</div>
										<div className="mt-2 flex items-center text-[9px] font-bold text-purple-600 dark:text-purple-400">
											<span>Aplicar</span>
											<ArrowRight className="w-2.5 h-2.5 ml-0.5" />
										</div>
									</button>
								);
							})}
						</div>
					</section>
				)}

				{/* WIZARD MODE: PROGRESS BAR */}
				{mode === "wizard" && !showResults && !showSummary && (
					<div className="max-w-2xl mx-auto mb-8">
						<div className="flex justify-between items-center mb-2">
							<span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
								Etapa {currentStep + 1} de {questions.length} • {questions[currentStep].id.toUpperCase()}
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
									boxShadow: "0 0 10px rgba(139, 92, 246, 0.4)"
								}}
							></div>
						</div>
					</div>
				)}

				{/* WIZARD STEP 1: Question Card */}
				{mode === "wizard" && currentStep < questions.length && !showResults && !showSummary && (
					<div className="bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-300 dark:border-slate-800/80 p-6 md:p-10 max-w-2xl mx-auto shadow-2xl transition-all duration-300">
						<div className="text-center mb-8">
							<h2 className="text-xl md:text-2xl font-display font-extrabold text-slate-900 dark:text-slate-100 mb-3 leading-snug">
								{questions[currentStep].question}
							</h2>
							<p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
								{questions[currentStep].description}
							</p>
						</div>

						<div className="grid grid-cols-1 gap-2.5 max-w-xl mx-auto">
							{questions[currentStep].options.map((option) => {
								const isSelected = currentAnswer === option.value;
								return (
									<button
										key={option.value}
										onClick={() => handleAnswer(questions[currentStep].id, option.value)}
										className={`group flex items-center gap-3.5 text-left border rounded-2xl p-3.5 sm:p-4 transition-all duration-300 cursor-pointer hover:shadow-md active:scale-[0.99] ${
											isSelected
												? "bg-purple-500/10 dark:bg-purple-400/10 border-purple-500 dark:border-purple-400 shadow-sm"
												: "bg-slate-50/70 dark:bg-slate-900/30 hover:bg-purple-500/5 dark:hover:bg-purple-400/5 border-slate-300 dark:border-slate-800/80 hover:border-purple-400/50"
										}`}
									>
										{/* Icon Badge */}
										<div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105 ${
											isSelected ? "bg-purple-500/20" : "bg-slate-100 dark:bg-slate-800"
										}`}>
											{getOptionIcon(questions[currentStep].id, option.value)}
										</div>

										{/* Label */}
										<span className={`text-xs md:text-sm font-bold transition-colors grow leading-snug ${
											isSelected
												? "text-purple-700 dark:text-purple-350"
												: "text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400"
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
						<div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/60">
							<button
								onClick={goBack}
								disabled={currentStep === 0}
								className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
									currentStep === 0
										? "bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-450 cursor-not-allowed border border-transparent"
										: "bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
								}`}
							>
								<ChevronLeft className="w-4 h-4" />
								<span>Voltar</span>
							</button>

							<button
								onClick={resetQuiz}
								className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold transition-colors text-xs py-2.5 cursor-pointer flex items-center gap-1.5 justify-center"
							>
								<RotateCcw className="w-3.5 h-3.5" />
								<span>Reiniciar</span>
							</button>

							<button
								onClick={handleNext}
								disabled={currentAnswer === null}
								className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
									currentAnswer === null
										? "bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-450 cursor-not-allowed border border-transparent"
										: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
								}`}
							>
								<span>{currentStep === questions.length - 1 ? "Revisar" : "Avançar"}</span>
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					</div>
				)}

				{/* WIZARD STEP 2: Review Summary */}
				{mode === "wizard" && showSummary && !showResults && (
					<div className="bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-300 dark:border-slate-800/80 p-4 sm:p-6 md:p-10 max-w-3xl mx-auto shadow-2xl transition-all duration-300 w-full min-w-0">
						<div className="text-center mb-6 sm:mb-8">
							<div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full mb-3 sm:mb-4 border border-purple-500/20">
								<Award className="w-6 h-6" />
							</div>
							<h2 className="text-lg sm:text-xl md:text-2xl font-display font-extrabold text-slate-900 dark:text-slate-100 mb-2">
								Resumo das Especificações do Projeto
							</h2>
							<p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed px-2">
								Revise suas escolhas abaixo antes de calcular o ranking de compatibilidade com os dados do catálogo de silício.
							</p>
						</div>

						{/* Double Column summary cards */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 sm:mb-8 max-w-2xl mx-auto w-full min-w-0">
							{questions.map((question) => {
								const answer = answers[question.id];
								const selectedOption = question.options.find(opt => opt.value === answer);

								return (
									<div key={question.id} className="bg-slate-50/80 dark:bg-slate-900/30 rounded-xl p-3 sm:p-3.5 border border-slate-300 dark:border-slate-800/80 flex justify-between items-center gap-2.5 sm:gap-3 w-full min-w-0 overflow-hidden">
										<div className="flex-1 min-w-0">
											<h3 className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 truncate select-none">
												{question.id.toUpperCase()}
											</h3>
											{selectedOption && (
												<div className="flex items-center gap-2 min-w-0">
													<div className="w-7 h-7 rounded-lg bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center shrink-0">
														{getOptionIcon(question.id, answer)}
													</div>
													<span className="text-xs font-bold text-purple-700 dark:text-purple-300 leading-snug break-words line-clamp-2 min-w-0">
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
											className="p-2 border border-slate-300 dark:border-slate-800 hover:border-purple-500 bg-white dark:bg-slate-900 rounded-lg text-slate-400 hover:text-purple-600 transition-all cursor-pointer shrink-0"
											title="Editar esta resposta"
										>
											<Edit2 className="w-3.5 h-3.5" />
										</button>
									</div>
								);
							})}
						</div>

						<div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center border-t border-slate-200 dark:border-slate-800/60 pt-6 w-full">
							<button
								onClick={() => {
									setCurrentStep(questions.length - 1);
									setCurrentAnswer(answers[questions[questions.length - 1].id]);
									setShowSummary(false);
								}}
								className="inline-flex items-center justify-center gap-2 bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-300 transition-all duration-300 cursor-pointer"
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

				{/* WIZARD STEP 3: Results Podium & Detailed Cards */}
				{mode === "wizard" && showResults && recommendations.length > 0 && (
					<div className="space-y-12 animate-fadeIn">

						{/* Top Banner with Reset / Re-edit Action */}
						<div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/70 dark:bg-slate-900/40 p-4 sm:px-6 rounded-2xl border border-slate-300 dark:border-slate-800/80 max-w-6xl mx-auto backdrop-blur-md">
							<div className="flex items-center gap-3">
								<div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
									<CheckCircle className="w-5 h-5" />
								</div>
								<div>
									<h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
										Recomendações Geradas com Sucesso
									</h2>
									<p className="text-xs text-slate-500 dark:text-slate-400">
										{recommendations.length} modelos compatíveis encontrados no catálogo
									</p>
								</div>
							</div>

							<div className="flex items-center gap-2 w-full sm:w-auto">
								<button
									onClick={() => {
										setShowResults(false);
										setShowSummary(true);
									}}
									className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
								>
									<Edit2 className="w-3.5 h-3.5" />
									<span>Ajustar Respostas</span>
								</button>

								<button
									onClick={resetQuiz}
									className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors cursor-pointer"
								>
									<RotateCcw className="w-3.5 h-3.5" />
									<span>Novo Quiz</span>
								</button>
							</div>
						</div>

						{/* Desktop Podium Layout */}
						<div className="hidden lg:block">
							<div className="grid grid-cols-3 gap-6 items-end max-w-6xl mx-auto pt-6 pb-6">

								{desktopPodium.map((rec) => {
									const seriesKey = rec.key;
									const serie = seriesData[seriesKey];
									const matchReasons = allReasons[seriesKey] || [];
									const chipAlerts = allAlerts[seriesKey] || [];
									const rankIdx = topThree.findIndex(item => item.key === seriesKey);

									const rankConfig = [
										{
											badge: "🥇 1º Recomendado",
											cardClass: "border-amber-500/80 dark:border-amber-400 bg-linear-to-b from-amber-500/10 via-white dark:via-slate-900 to-transparent shadow-[0_0_40px_rgba(245,158,11,0.2)] min-h-[620px] z-10 scale-[1.03]",
											badgeClass: "text-amber-800 bg-amber-500/15 border-amber-500/30 dark:text-amber-300 dark:bg-amber-500/20",
											scoreClass: "text-amber-600 dark:text-amber-400"
										},
										{
											badge: "🥈 2º Recomendado",
											cardClass: "border-slate-300 dark:border-slate-800 bg-linear-to-b from-slate-500/10 via-white dark:via-slate-900 to-transparent min-h-[580px] opacity-95 hover:opacity-100",
											badgeClass: "text-slate-700 bg-slate-500/15 border-slate-500/30 dark:text-slate-300 dark:bg-slate-800",
											scoreClass: "text-slate-600 dark:text-slate-300"
										},
										{
											badge: "🥉 3º Recomendado",
											cardClass: "border-amber-800/30 dark:border-slate-800 bg-linear-to-b from-amber-800/10 via-white dark:via-slate-900 to-transparent min-h-[580px] opacity-95 hover:opacity-100",
											badgeClass: "text-amber-900 bg-amber-800/15 border-amber-800/30 dark:text-amber-400 dark:bg-slate-800",
											scoreClass: "text-amber-700 dark:text-amber-450"
										}
									][rankIdx];

									return (
										<div
											key={seriesKey}
											className={`relative flex flex-col bg-white dark:bg-slate-900/60 backdrop-blur-xl border rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.04] hover:shadow-2xl hover:z-20 ${rankConfig.cardClass}`}
										>
											{/* Top Color Accent Line */}
											<div className="h-1.5 w-full shrink-0" style={{ backgroundColor: serie.cor }} />

											<div className="p-6 pb-0 flex-1 flex flex-col justify-between">
												<div>
													<div className="text-center mb-3 select-none">
														<span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${rankConfig.badgeClass}`}>
															{rankConfig.badge}
														</span>
													</div>

													<div className="text-center mb-5">
														<div className="text-5xl mb-2.5 transform hover:rotate-6 transition-transform select-none">{serie.icone}</div>
														<h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-slate-100 mb-0.5 leading-none">
															{seriesKey}
														</h3>
														<p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider truncate">
															{serie.nome_completo}
														</p>

														<div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xs">
															<span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Afinidade:</span>
															<span className={`text-xs font-black ${rankConfig.scoreClass}`}>
																{rec.percentage}% ({rec.score} pts)
															</span>
														</div>
													</div>

													{/* Match Advantages */}
													<div className="space-y-2 border-t border-slate-200 dark:border-slate-800/60 pt-4 mb-4 select-none">
														<h4 className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-1">
															<Check className="w-3 h-3" />
															<span>Vantagens para seu Projeto</span>
														</h4>
														<ul className="space-y-1.5">
															{matchReasons.slice(0, 3).map((reason, idx) => (
																<li key={idx} className="flex items-start gap-1.5 text-xs leading-normal text-slate-700 dark:text-slate-300">
																	<CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
																	<span>{reason}</span>
																</li>
															))}
														</ul>
													</div>

													{/* Alerts / Limitations */}
													{chipAlerts.length > 0 && (
														<div className="space-y-1 border-t border-slate-100 dark:border-slate-800/40 pt-3 mb-4 select-none">
															<h4 className="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
																<AlertTriangle className="w-3 h-3" />
																<span>Pontos de Atenção</span>
															</h4>
															<ul className="space-y-1">
																{chipAlerts.slice(0, 2).map((alert, idx) => (
																	<li key={idx} className="flex items-start gap-1.5 text-[11px] leading-snug text-slate-500 dark:text-slate-400">
																		<span className="text-amber-500 shrink-0">•</span>
																		<span>{alert}</span>
																	</li>
																))}
															</ul>
														</div>
													)}
												</div>

												{/* Quick Spec Badges */}
												<div className="grid grid-cols-2 gap-1.5 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800/60 mb-4 select-none text-[10px]">
													<div>
														<span className="text-[8px] font-bold uppercase text-slate-400 block">Arquitetura</span>
														<span className="font-bold text-slate-800 dark:text-slate-200 truncate block">{serie.arquitetura.split(" ")[0]} ({serie.nucleos})</span>
													</div>
													<div>
														<span className="text-[8px] font-bold uppercase text-slate-400 block">Clock Máximo</span>
														<span className="font-bold text-slate-800 dark:text-slate-200 truncate block">{serie.frequencia}</span>
													</div>
													<div>
														<span className="text-[8px] font-bold uppercase text-slate-400 block">GPIOs</span>
														<span className="font-bold text-slate-800 dark:text-slate-200 truncate block">{serie.gpio} pinos</span>
													</div>
													<div>
														<span className="text-[8px] font-bold uppercase text-slate-400 block">Memória SRAM</span>
														<span className="font-bold text-slate-800 dark:text-slate-200 truncate block">{serie.memoria_sram}</span>
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
													<span>Ver Documentação Completa</span>
													<ExternalLink className="w-3.5 h-3.5" />
												</Link>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						{/* Mobile Stacked Podium Layout */}
						<div className="lg:hidden space-y-5 max-w-xl mx-auto">
							<h3 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center select-none">
								Ranking dos Modelos Recomendados
							</h3>

							{topThree.map((rec, index) => {
								const seriesKey = rec.key;
								const serie = seriesData[seriesKey];
								const matchReasons = allReasons[seriesKey] || [];
								const chipAlerts = allAlerts[seriesKey] || [];
								const mobileBadges = ["🥇 1ª Recomendação", "🥈 2ª Recomendação", "🥉 3ª Recomendação"];
								const isFirst = index === 0;

								return (
									<div
										key={seriesKey}
										className={`bg-white dark:bg-slate-900/60 backdrop-blur-xl border rounded-3xl overflow-hidden shadow-xl flex flex-col ${
											isFirst ? "border-amber-500 dark:border-amber-400 ring-2 ring-amber-500/20" : "border-slate-300 dark:border-slate-800"
										}`}
									>
										<div className="h-1.5 w-full shrink-0" style={{ backgroundColor: serie.cor }} />

										<div className="p-5 flex-1">
											<div className="flex justify-between items-center mb-3">
												<span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
													isFirst
														? "text-amber-800 bg-amber-500/15 dark:text-amber-300 border border-amber-500/30"
														: "text-slate-700 bg-slate-500/15 dark:text-slate-300 dark:bg-slate-800 border border-transparent"
												}`}>
													{mobileBadges[index]}
												</span>
												<span className="text-[10px] font-bold text-slate-500">
													Afinidade: <strong className="text-xs text-purple-600 dark:text-purple-400 font-extrabold">{rec.percentage}%</strong>
												</span>
											</div>

											<div className="flex gap-3.5 items-start mb-4">
												<span className="text-4xl select-none shrink-0">{serie.icone}</span>
												<div>
													<h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">{seriesKey}</h4>
													<p className="text-xs text-slate-500 dark:text-slate-400 leading-snug line-clamp-2 mt-0.5">{serie.descricao}</p>
												</div>
											</div>

											<div className="space-y-1.5 border-t border-slate-200 dark:border-slate-800/60 pt-3 select-none">
												{matchReasons.slice(0, 3).map((reason, idx) => (
													<div key={idx} className="flex gap-2 items-start text-xs text-slate-700 dark:text-slate-300">
														<CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
														<span>{reason}</span>
													</div>
												))}
											</div>

											{chipAlerts.length > 0 && (
												<div className="space-y-1 border-t border-slate-100 dark:border-slate-800/40 pt-2.5 mt-2.5 select-none">
													{chipAlerts.slice(0, 2).map((alert, idx) => (
														<div key={idx} className="flex gap-1.5 items-start text-[11px] text-slate-500">
															<AlertTriangle className="w-3 h-3 text-amber-500 mt-0.5 shrink-0" />
															<span>{alert}</span>
														</div>
													))}
												</div>
											)}
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

						{/* Side-by-Side Comparison of Top Recommendations */}
						<div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-300 dark:border-slate-800/80 max-w-6xl mx-auto shadow-xl">
							<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
								<div>
									<h3 className="text-lg font-display font-extrabold text-slate-900 dark:text-slate-100">
										Comparativo Rápido dos Finalistas
									</h3>
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Compare as principais especificações técnicas lado a lado
									</p>
								</div>

								<Link
									href={`/comparacao?chips=${topThree.map(t => t.key).join(",")}`}
									className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 underline"
								>
									<span>Abrir Comparador Completo</span>
									<ArrowRight className="w-3.5 h-3.5" />
								</Link>
							</div>

							<div className="overflow-x-auto">
								<table className="w-full text-xs text-left border-collapse">
									<thead>
										<tr className="border-b border-slate-200 dark:border-slate-800">
											<th className="py-3 px-3 font-bold text-slate-400 uppercase text-[10px]">Parâmetro</th>
											{topThree.map(rec => (
												<th key={rec.key} className="py-3 px-3 font-bold text-slate-900 dark:text-slate-100 text-sm">
													{rec.key}
												</th>
											))}
										</tr>
									</thead>
									<tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
										<tr>
											<td className="py-2.5 px-3 font-semibold text-slate-400">Arquitetura</td>
											{topThree.map(rec => (
												<td key={rec.key} className="py-2.5 px-3">{seriesData[rec.key].arquitetura}</td>
											))}
										</tr>
										<tr>
											<td className="py-2.5 px-3 font-semibold text-slate-400">Clock</td>
											{topThree.map(rec => (
												<td key={rec.key} className="py-2.5 px-3 font-bold">{seriesData[rec.key].frequencia}</td>
											))}
										</tr>
										<tr>
											<td className="py-2.5 px-3 font-semibold text-slate-400">Wi-Fi</td>
											{topThree.map(rec => (
												<td key={rec.key} className="py-2.5 px-3">{seriesData[rec.key].wifi}</td>
											))}
										</tr>
										<tr>
											<td className="py-2.5 px-3 font-semibold text-slate-400">Bluetooth</td>
											{topThree.map(rec => (
												<td key={rec.key} className="py-2.5 px-3">{seriesData[rec.key].bluetooth}</td>
											))}
										</tr>
										<tr>
											<td className="py-2.5 px-3 font-semibold text-slate-400">Matter / 802.15.4</td>
											{topThree.map(rec => (
												<td key={rec.key} className="py-2.5 px-3">{seriesData[rec.key].matter === "Sim" ? "✅ Sim" : "❌ Não"}</td>
											))}
										</tr>
										<tr>
											<td className="py-2.5 px-3 font-semibold text-slate-400">Aceleração IA</td>
											{topThree.map(rec => (
												<td key={rec.key} className="py-2.5 px-3">{seriesData[rec.key].aceleradores_ia ? "⚡ Vetorial" : "—"}</td>
											))}
										</tr>
										<tr>
											<td className="py-2.5 px-3 font-semibold text-slate-400">PSRAM Externa</td>
											{topThree.map(rec => (
												<td key={rec.key} className="py-2.5 px-3">{seriesData[rec.key].psram_externa || "Não"}</td>
											))}
										</tr>
										<tr>
											<td className="py-2.5 px-3 font-semibold text-slate-400">Arduino Core</td>
											{topThree.map(rec => (
												<td key={rec.key} className="py-2.5 px-3">{String(seriesData[rec.key].arduino_core).startsWith("Sim") ? "✅ Suportado" : "⚠️ Apenas ESP-IDF"}</td>
											))}
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						{/* Other Options Grid */}
						{otherRecommendations.length > 0 && (
							<div className="bg-slate-50/70 dark:bg-slate-900/20 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-300 dark:border-slate-800/60 max-w-6xl mx-auto shadow-inner">
								<h3 className="text-base font-display font-extrabold text-slate-900 dark:text-slate-100 mb-6 text-center select-none">
									Outras Alternativas Avaliadas
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{otherRecommendations.map((rec) => {
										const seriesKey = rec.key;
										const serie = seriesData[seriesKey];
										return (
											<div
												key={seriesKey}
												className="bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800/80 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
											>
												<div className="text-center mb-4">
													<div className="text-3xl mb-2 select-none">{serie.icone}</div>
													<h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate leading-none mb-1">{seriesKey}</h4>
													<span className="text-[10px] text-slate-500 font-semibold">Afinidade: {rec.percentage}%</span>
												</div>
												<Link
													href={`/series/${seriesKey}`}
													className="block w-full text-center py-2 rounded-xl font-bold text-white text-[10px] uppercase tracking-wider transition-all duration-300 hover:shadow-xs active:scale-95"
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

						{/* Navigation Actions */}
						<div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-2xl mx-auto border-t border-slate-300 dark:border-slate-800/60 pt-8 select-none">
							<Link
								href="/comparacao"
								className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs border border-slate-300 dark:border-slate-800 hover:border-purple-500 hover:text-purple-600 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer w-full sm:w-auto"
							>
								<SlidersHorizontal className="w-3.5 h-3.5" />
								<span>Comparador Completo</span>
							</Link>

							<button
								onClick={resetQuiz}
								className="inline-flex items-center justify-center gap-2 bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-300 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer active:scale-95 w-full sm:w-auto"
							>
								<RotateCcw className="w-3.5 h-3.5" />
								<span>Refazer com Outros Critérios</span>
							</button>
						</div>
					</div>
				)}

				{/* WIZARD NO MATCH */}
				{mode === "wizard" && showResults && recommendations.length === 0 && (
					<div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-300 dark:border-slate-800/80 p-8 md:p-10 max-w-2xl mx-auto shadow-2xl text-center">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 text-amber-600 rounded-full mb-4 border border-amber-500/20">
							<HelpCircle className="w-8 h-8" />
						</div>
						<h2 className="text-xl md:text-2xl font-display font-extrabold text-slate-900 dark:text-slate-100 mb-3">
							Combinação Extremamente Específica
						</h2>
						<p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-6 leading-relaxed">
							Não foi possível encontrar um único microcontrolador ESP32 que atenda simultaneamente a todos os requisitos conflitantes. Tente flexibilizar um dos parâmetros ou refazer a seleção.
						</p>

						<button
							onClick={resetQuiz}
							className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95"
						>
							<RotateCcw className="w-4 h-4" />
							<span>Refazer Quiz</span>
						</button>
					</div>
				)}

				{/* DIRECT PARAMETRIC FILTER MODE */}
				{mode === "filter" && (
					<div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
						{/* Filter Controls Box */}
						<div className="bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-300 dark:border-slate-800/80 shadow-xl">
							<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
								<div>
									<h2 className="text-lg font-display font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
										<Filter className="w-5 h-5 text-purple-500" />
										<span>Filtro Direto por Recursos de Hardware</span>
									</h2>
									<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
										Marque os blocos de silício obrigatórios para visualizar instantaneamente os modelos compatíveis.
									</p>
								</div>

								<button
									onClick={() => {
										setFilters({
											wifi6: false,
											wifi5ghz: false,
											bluetoothClassic: false,
											leAudio: false,
											matter: false,
											ethernet: false,
											aiAccel: false,
											psram: false,
											mipiDisplayCamera: false,
											usbOTG: false,
											canBus: false,
											dac: false,
											touch: false,
											arduinoReady: false,
											keyManager: false,
											eccHardware: false,
											ecdsaHardware: false,
											secureBootV2: false,
										});
									}}
									className="text-xs font-bold text-slate-500 hover:text-purple-600 flex items-center gap-1 cursor-pointer"
								>
									<RotateCcw className="w-3.5 h-3.5" />
									<span>Limpar Filtros</span>
								</button>
							</div>

							{/* Filter Chips Grid */}
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
								{[
									{ key: "wifi6", label: "Wi-Fi 6 (802.11ax)", icon: <Wifi className="w-4 h-4 text-teal-500" /> },
									{ key: "wifi5ghz", label: "Wi-Fi Dual-Band (5 GHz)", icon: <Wifi className="w-4 h-4 text-indigo-500" /> },
									{ key: "bluetoothClassic", label: "Bluetooth Clássico (A2DP)", icon: <Volume2 className="w-4 h-4 text-pink-500" /> },
									{ key: "leAudio", label: "Bluetooth LE Audio", icon: <Volume2 className="w-4 h-4 text-purple-500" /> },
									{ key: "matter", label: "Matter / 802.15.4", icon: <Network className="w-4 h-4 text-amber-500" /> },
									{ key: "ethernet", label: "Ethernet MAC", icon: <Cable className="w-4 h-4 text-emerald-500" /> },
									{ key: "aiAccel", label: "Aceleração Vetorial IA", icon: <Bot className="w-4 h-4 text-pink-500" /> },
									{ key: "psram", label: "Suporte a PSRAM", icon: <HardDrive className="w-4 h-4 text-blue-500" /> },
									{ key: "mipiDisplayCamera", label: "Telas / Câmeras (MIPI/RGB)", icon: <Monitor className="w-4 h-4 text-cyan-500" /> },
									{ key: "usbOTG", label: "USB Nativo OTG", icon: <Cable className="w-4 h-4 text-teal-500" /> },
									{ key: "canBus", label: "Barramento CAN / TWAI", icon: <Sliders className="w-4 h-4 text-orange-500" /> },
									{ key: "dac", label: "Conversor DAC", icon: <Volume2 className="w-4 h-4 text-pink-500" /> },
									{ key: "touch", label: "Touch Capacitivo", icon: <Activity className="w-4 h-4 text-sky-500" /> },
									{ key: "arduinoReady", label: "Suporte Arduino Core", icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> },
									{ key: "eccHardware", label: "Curvas Elípticas ECC", icon: <ShieldCheck className="w-4 h-4 text-teal-500" /> },
									{ key: "ecdsaHardware", label: "Assinatura ECDSA Hardware", icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
									{ key: "keyManager", label: "Key Manager Hardware", icon: <KeyRound className="w-4 h-4 text-red-500" /> },
									{ key: "secureBootV2", label: "Secure Boot V2", icon: <Lock className="w-4 h-4 text-amber-500" /> },
								].map(({ key, label, icon }) => {
									const isActive = filters[key];
									return (
										<button
											key={key}
											onClick={() => setFilters(prev => ({ ...prev, [key]: !prev[key] }))}
											className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-bold transition-all duration-200 cursor-pointer ${
												isActive
													? "bg-purple-500/15 border-purple-500 text-purple-700 dark:text-purple-300 shadow-xs"
													: "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400"
											}`}
										>
											{icon}
											<span className="truncate">{label}</span>
											{isActive && <Check className="w-3.5 h-3.5 ml-auto text-purple-600 shrink-0" />}
										</button>
									);
								})}
							</div>
						</div>

						{/* Results Grid */}
						<div>
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-sm font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
									Modelos Compatíveis ({filteredChips.length} de {Object.keys(seriesData).length})
								</h3>
							</div>

							{filteredChips.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{filteredChips.map(([seriesKey, serie]) => (
										<div
											key={seriesKey}
											className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-300 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
										>
											<div className="h-1.5 w-full shrink-0" style={{ backgroundColor: serie.cor }} />

											<div className="p-6">
												<div className="flex items-start justify-between gap-4 mb-4">
													<div className="flex items-center gap-3">
														<span className="text-4xl select-none">{serie.icone}</span>
														<div>
															<h4 className="text-lg font-display font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
																{seriesKey}
															</h4>
															<p className="text-[10px] text-slate-500 uppercase font-semibold">
																{serie.nome_completo}
															</p>
														</div>
													</div>
												</div>

												<p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed line-clamp-2">
													{serie.descricao}
												</p>

												{/* Badges */}
												<div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800/60 pt-3">
													<div className="flex justify-between py-0.5">
														<span className="text-slate-400 text-[11px]">Wi-Fi / BT:</span>
														<span className="font-semibold text-right truncate max-w-[180px]">{serie.wifi}</span>
													</div>
													<div className="flex justify-between py-0.5">
														<span className="text-slate-400 text-[11px]">Matter/Thread:</span>
														<span className="font-semibold">{serie.matter === "Sim" ? "✅ Sim" : "❌ Não"}</span>
													</div>
													<div className="flex justify-between py-0.5">
														<span className="text-slate-400 text-[11px]">Clock:</span>
														<span className="font-semibold">{serie.frequencia}</span>
													</div>
													<div className="flex justify-between py-0.5">
														<span className="text-slate-400 text-[11px]">GPIOs:</span>
														<span className="font-semibold">{serie.gpio} pinos</span>
													</div>
													<div className="flex justify-between py-0.5">
														<span className="text-slate-400 text-[11px]">PSRAM:</span>
														<span className="font-semibold truncate max-w-[180px]">{serie.psram_externa || "Não"}</span>
													</div>
												</div>
											</div>

											<div className="px-6 pb-6">
												<Link
													href={`/series/${seriesKey}`}
													className="flex items-center justify-center gap-1.5 w-full text-center py-2.5 rounded-xl font-bold text-white text-xs uppercase tracking-wider hover:shadow-lg transition-all duration-300"
													style={{ backgroundColor: serie.cor }}
												>
													<span>Ver Detalhes do Chip</span>
													<ExternalLink className="w-3.5 h-3.5" />
												</Link>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-10 border border-slate-300 dark:border-slate-800/80 text-center">
									<div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/10 text-amber-600 rounded-full mb-3">
										<HelpCircle className="w-6 h-6" />
									</div>
									<h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
										Nenhum modelo atende a todos os filtros selecionados
									</h4>
									<p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
										Experimente desmarcar alguns dos filtros mais restritivos (ex: Wi-Fi 5 GHz + Ethernet MAC ao mesmo tempo).
									</p>
								</div>
							)}
						</div>
					</div>
				)}

				{/* FOOTER LINKS / NEXT STEPS */}
				<section className="mt-16 bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-300 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 max-w-6xl mx-auto shadow-2xl">
					<h3 className="text-lg font-display font-extrabold text-slate-900 dark:text-slate-100 mb-6 text-center select-none">
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
							<h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
								Catálogo de Placas
							</h4>
							<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
								Explore placas de desenvolvimento oficiais (DevKit, NodeMCU) e módulos com links seguros e pinouts.
							</p>
						</Link>

						<Link
							href="/comparacao"
							className="group bg-purple-500/5 dark:bg-purple-950/10 border border-purple-500/10 dark:border-purple-500/20 hover:border-purple-500/40 dark:hover:border-purple-400/40 rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
						>
							<div className="w-9 h-9 rounded-xl bg-purple-500/10 dark:bg-purple-400/15 text-purple-500 dark:text-purple-400 flex items-center justify-center mb-4 shrink-0 shadow-xs select-none">
								<SlidersHorizontal className="w-4 h-4" />
							</div>
							<h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-1.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
								Comparador Lado a Lado
							</h4>
							<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
								Compare lado a lado matrizes completas de frequência, GPIOs, canais ADC/DAC, consumos e pinouts.
							</p>
						</Link>

						<Link
							href="/glossario"
							className="group bg-pink-500/5 dark:bg-pink-950/10 border border-pink-500/10 dark:border-pink-500/20 hover:border-pink-500/40 dark:hover:border-pink-400/40 rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
						>
							<div className="w-9 h-9 rounded-xl bg-pink-500/10 dark:bg-pink-400/15 text-pink-500 dark:text-pink-400 flex items-center justify-center mb-4 shrink-0 shadow-xs select-none">
								<BookOpen className="w-4 h-4" />
							</div>
							<h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-1.5 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
								Glossário de Parâmetros
							</h4>
							<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
								Ficou em dúvida sobre termos de hardware como ULP, SRAM RTC, JTAG ou Matter? Consulte definições rápidas.
							</p>
						</Link>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
