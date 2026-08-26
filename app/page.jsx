import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { 
	SlidersHorizontal, 
	ShoppingBag, 
	Cpu, 
	Layers, 
	Scale, 
	BookOpen,
	AlertTriangle,
	Terminal, 
	Compass,
	ArrowRight,
	Sparkles,
	CheckCircle2,
	Zap,
	ExternalLink,
	Info,
	Radio,
	ShieldCheck,
	Code,
	HelpCircle,
	Box
} from "lucide-react";

export default function Home() {
	// Estatísticas da Plataforma
	const stats = [
		{ value: "12", label: "Séries Documentadas", desc: "Do ESP32 clássico ao P4 e C61" },
		{ value: "14", label: "Frameworks & SDKs", desc: "ESP-IDF, RainMaker, Rust, Matter, etc." },
		{ value: "20+", label: "Componentes Curados", desc: "ESP Component Registry & idf_component.yml" },
		{ value: "30+", label: "Guias de Diagnóstico", desc: "Soluções para bootloops, brownouts e WDT" },
	];

	// Ferramentas da Plataforma (100% Clicáveis)
	const tools = [
		{
			title: "Seletor Inteligente",
			badge: "Recomendado",
			badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
			description: "Responda algumas perguntas sobre seu projeto e descubra o chip ESP32 ideal com análise técnica e justificativa.",
			href: "/seletor",
			icon: <SlidersHorizontal className="w-6 h-6" />,
			iconBg: "text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400",
			ctaText: "Iniciar Quiz de Seleção",
		},
		{
			title: "ESP Component Registry",
			badge: "Oficial & Modular",
			badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
			description: "Explore o catálogo oficial de pacotes modulares da Espressif (LVGL, RainMaker, ESP-SR, BSPs) e gere manifestos idf_component.yml.",
			href: "/componentes",
			icon: <Box className="w-6 h-6" />,
			iconBg: "text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400",
			ctaText: "Explorar Componentes",
		},
		{
			title: "Diagnóstico de Falhas",
			badge: "30+ Soluções",
			badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
			description: "Encontre a causa e o passo a passo para corrigir erros frequentes como Brownout, Guru Meditation, Bootloops e falhas de Flash.",
			href: "/diagnostico",
			icon: <AlertTriangle className="w-6 h-6" />,
			iconBg: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400",
			ctaText: "Resolver Erro no Código",
		},
		{
			title: "Comparador de Séries",
			badge: "Lado a Lado",
			badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300",
			description: "Compare especificações de até 4 séries simultaneamente: núcleos, clock, memória SRAM/PSRAM, interfaces e conexões.",
			href: "/comparacao",
			icon: <Scale className="w-6 h-6" />,
			iconBg: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400",
			ctaText: "Comparar Modelos",
		},
		{
			title: "Explorador de Séries & Pinouts",
			badge: "12 Chips",
			badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
			description: "Consulte diagramas interativos de conexões, mapas de periféricos, datasheets oficiais e restrições de pinos (strapping, ADC2).",
			href: "/series",
			icon: <Cpu className="w-6 h-6" />,
			iconBg: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400",
			ctaText: "Ver Todas as Séries",
		},
		{
			title: "Catálogo de Placas",
			badge: "Hardware Real",
			badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
			description: "Filtre placas de desenvolvimento (DevKit, Xiao, Wemos, LilyGO) por série, interface USB, sensores integrados e links de compra.",
			href: "/catalogo",
			icon: <ShoppingBag className="w-6 h-6" />,
			iconBg: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400",
			ctaText: "Explorar Placas Físicas",
		},
		{
			title: "Frameworks & SDKs",
			badge: "14 Frameworks",
			badgeColor: "bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300",
			description: "Documentação completa de frameworks oficiais: ESP-IDF, RainMaker, Rust, Matter, ESP-SR, Arduino, MicroPython e mais.",
			href: "/frameworks",
			icon: <Terminal className="w-6 h-6" />,
			iconBg: "text-teal-600 bg-teal-50 dark:bg-teal-950/40 dark:text-teal-400",
			ctaText: "Acessar Guias de SDK",
		},
		{
			title: "Glossário Técnico",
			badge: "60+ Conceitos",
			badgeColor: "bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300",
			description: "Dicionário de termos técnicos essenciais: entenda RTOS, NVS, Partições OTA, eFuse, Brownout, RISC-V e protocolos industriais.",
			href: "/glossario",
			icon: <BookOpen className="w-6 h-6" />,
			iconBg: "text-pink-600 bg-pink-50 dark:bg-pink-950/40 dark:text-pink-400",
			ctaText: "Consultar Termos",
		},
		{
			title: "Sobre a Plataforma",
			badge: "Comunidade",
			badgeColor: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
			description: "Conheça a missão da ESPDocs, a autoria de Lucas Rayan Guerra e a parceria educacional com o blog Ciência Embarcada.",
			href: "/sobre",
			icon: <Info className="w-6 h-6" />,
			iconBg: "text-slate-650 bg-slate-100 dark:bg-slate-800 dark:text-slate-350",
			ctaText: "Conhecer o Projeto",
		},
	];

	// Chips em Destaque
	const featuredChips = [
		{
			name: "ESP32",
			slug: "ESP32",
			badge: "Padrão da Indústria",
			arch: "Xtensa LX6 Dual-Core @ 240 MHz",
			wireless: "Wi-Fi 4 (802.11 b/g/n) + BLE 4.2 / Clássico",
			highlights: "Suporte maduro, 36 pinos GPIO, ADC duplo, DAC de 8 bits",
			cor: "#007bff",
		},
		{
			name: "ESP32-S3",
			slug: "ESP32-S3",
			badge: "IA & USB Nativo",
			arch: "Xtensa LX7 Dual-Core @ 240 MHz",
			wireless: "Wi-Fi 4 + BLE 5.0 (Long Range)",
			highlights: "Instruções vetoriais para IA, USB OTG nativo, até 45 GPIOs",
			cor: "#fd7e14",
		},
		{
			name: "ESP32-C6",
			slug: "ESP32-C6",
			badge: "Wi-Fi 6 + Zigbee/Matter",
			arch: "RISC-V 32-bit Single-Core @ 160 MHz + LP Core",
			wireless: "Wi-Fi 6 (ax) + BLE 5.3 + Zigbee 3.0 & Thread (802.15.4)",
			highlights: "Protocolo Matter, Target Wake Time (TWT), segurança de hardware",
			cor: "#17a2b8",
		},
		{
			name: "ESP32-C3",
			slug: "ESP32-C3",
			badge: "Custo-Benefício RISC-V",
			arch: "RISC-V 32-bit Single-Core @ 160 MHz",
			wireless: "Wi-Fi 4 + BLE 5.0 (Mesh & Long Range)",
			highlights: "Substituto direto do ESP8266, pinout compacto, baixo consumo",
			cor: "#20c997",
		},
		{
			name: "ESP32-P4",
			slug: "ESP32-P4",
			badge: "Superprocessador 400MHz",
			arch: "Dual-Core RISC-V HP @ 400 MHz + LP Core @ 40 MHz",
			wireless: "Sem rádio interno (Focado em processamento multimídia)",
			highlights: "MIPI-CSI/DSI, codificador H.264, Ethernet 100M, 50+ GPIOs",
			cor: "#ffc107",
		},
		{
			name: "ESP32-H2",
			slug: "ESP32-H2",
			badge: "Zigbee & Thread",
			arch: "RISC-V 32-bit Single-Core @ 96 MHz",
			wireless: "IEEE 802.15.4 (Zigbee 3.0, Thread) + BLE 5.3",
			highlights: "Automação residencial ultrabaixo consumo, nós finais de rede",
			cor: "#6c757d",
		},
	];

	// Problemas Comuns do Diagnóstico
	const commonErrors = [
		{
			title: "Brownout detector was triggered",
			cause: "Queda de tensão súbita na alimentação ao inicializar o Wi-Fi",
			solution: "Adicionar capacitor de desacoplamento de 10µF–100µF e usar fonte externa de 5V 1A+",
		},
		{
			title: "Guru Meditation Error: IllegalInstruction",
			cause: "Acesso a ponteiro nulo, estouro de pilha (stack overflow) ou interrupção incorreta",
			solution: "Inspecione o Backtrace usando o addr2line e aumente o tamanho da stack da task FreeRTOS",
		},
		{
			title: "ADC2 leitura inválida com Wi-Fi",
			cause: "O rádio Wi-Fi bloqueia o conversor analógico-digital ADC2 enquanto está ativo",
			solution: "Utilize exclusivamente pinos do ADC1 (GPIOs 32 a 39 no ESP32) para sensores analógicos",
		},
		{
			title: "Flash Read err / Bootloader falhou",
			cause: "Tensão de Flash incorreta (1.8V vs 3.3V) ou pino de strapping (GPIO 0, 2, 12, 15) travado",
			solution: "Verifique resistores pull-up/pull-down nos pinos de boot e confirme a frequência de Flash no esptool",
		},
	];

	return (
		<div className="bg-gradient-to-br from-slate-100 via-slate-50 to-purple-100/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100">
			<Header />

			<main className="px-4 sm:px-6 pt-10 md:pt-16 pb-24 max-w-7xl mx-auto">
				{/* Hero Section */}
				<section className="text-center mb-20 max-w-5xl mx-auto">
					{/* Pill Tag */}
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-purple-700 dark:text-purple-300 text-xs md:text-sm font-bold mb-6 shadow-xs">
						<Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
						<span>O Maior Hub Técnico de ESP32 em Português</span>
					</div>

					<h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 tracking-tight leading-[1.1] select-none">
						ESPDocs
					</h1>
					
					<h2 className="text-xl sm:text-2xl md:text-3xl text-slate-850 dark:text-slate-100 font-extrabold mb-6 max-w-3xl mx-auto leading-snug">
						Tudo o que você precisa para dominar o ecossistema ESP32
					</h2>
					
					<p className="text-sm sm:text-base md:text-lg text-slate-650 dark:text-slate-350 max-w-3xl mx-auto leading-relaxed mb-10">
						Chega de perder tempo traduzindo datasheets dispersos ou decifrando bootloops no escuro. 
						Compare 12 séries de chips, diagnostique erros comuns de firmware, descubra o ESP32 ideal 
						para o seu projeto e consulte pinouts interativos 100% em português brasileiro.
					</p>

					{/* Botões de Ação Hero */}
					<div className="flex flex-wrap gap-3.5 justify-center items-center mb-16">
						<Link
							className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:scale-95"
							href="/seletor"
						>
							<Compass className="w-4 h-4" />
							<span>Encontrar ESP32 Ideal</span>
							<ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
						</Link>

						<Link
							className="group inline-flex items-center gap-2.5 bg-amber-700 hover:bg-amber-800 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:scale-95"
							href="/diagnostico"
						>
							<AlertTriangle className="w-4 h-4" />
							<span>Diagnosticar Falhas</span>
						</Link>

						<Link
							className="group inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:scale-95"
							href="/series"
						>
							<Cpu className="w-4 h-4" />
							<span>Explorar 12 Séries</span>
						</Link>

						<Link
							className="group inline-flex items-center gap-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-7 py-3.5 rounded-xl font-bold text-sm shadow-xs border border-slate-300 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:scale-95"
							href="/comparacao"
						>
							<Scale className="w-4 h-4" />
							<span>Comparar Chips</span>
						</Link>
					</div>

					{/* Faixa de Estatísticas */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
						{stats.map((stat) => (
							<div 
								key={stat.label}
								className="bg-white dark:bg-slate-900/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-300 dark:border-slate-800/80 shadow-xs text-center"
							>
								<div className="text-2xl sm:text-3xl font-display font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-1">
									{stat.value}
								</div>
								<div className="text-xs sm:text-sm font-bold text-slate-850 dark:text-slate-100 mb-0.5">
									{stat.label}
								</div>
								<div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
									{stat.desc}
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Seção 2: Central de Ferramentas & Recursos (Cards 100% Clicáveis) */}
				<section className="mb-24">
					<div className="text-center mb-12">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-850 dark:text-slate-100 mb-3">
							Central de Ferramentas e Guias
						</h2>
						<p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed">
							Escolha o que você deseja fazer hoje. Cada ferramenta foi desenvolvida para acelerar seu desenvolvimento e eliminar gargalos.
						</p>
					</div>
					
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
						{tools.map((tool) => (
							<Link 
								key={tool.title} 
								href={tool.href}
								className="group flex flex-col justify-between bg-white dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-300 dark:border-slate-800/80 hover:border-purple-500 dark:hover:border-purple-400 shadow-xs hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
							>
								<div>
									{/* Top Bar: Icon + Badge */}
									<div className="flex items-center justify-between gap-2 mb-4">
										<div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transform group-hover:scale-105 transition-transform duration-300 shadow-xs ${tool.iconBg}`}>
											{tool.icon}
										</div>
										<span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${tool.badgeColor}`}>
											{tool.badge}
										</span>
									</div>

									{/* Content */}
									<h3 className="text-base font-bold text-slate-850 dark:text-slate-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
										{tool.title}
									</h3>
									<p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed mb-6">
										{tool.description}
									</p>
								</div>

								{/* Bottom Action Link */}
								<div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
									<span>{tool.ctaText}</span>
									<ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
								</div>
							</Link>
						))}
					</div>
				</section>

				{/* Seção 3: Explore as Séries em Destaque */}
				<section className="mb-24">
					<div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
						<div>
							<div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
								<Cpu className="w-4 h-4" />
								<span>Hardware & Silício</span>
							</div>
							<h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-850 dark:text-slate-100">
								Séries Populares de ESP32
							</h2>
							<p className="text-sm text-slate-650 dark:text-slate-350 mt-1">
								Conheça as principais famílias de chips da Espressif, da arquitetura aos protocolos sem fio.
							</p>
						</div>

						<Link
							href="/series"
							className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 shrink-0"
						>
							<span>Ver todas as 12 Séries</span>
							<ArrowRight className="w-4 h-4" />
						</Link>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{featuredChips.map((chip) => (
							<Link
								key={chip.slug}
								href={`/series/${chip.slug}`}
								prefetch={false}
								className="group bg-white dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-300 dark:border-slate-800/80 hover:border-purple-500 dark:hover:border-purple-400 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
							>
								<div>
									<div className="flex items-center justify-between mb-3">
										<h3 className="text-xl font-display font-extrabold text-slate-850 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
											{chip.name}
										</h3>
										<span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
											{chip.badge}
										</span>
									</div>

									<div className="space-y-2 mb-5">
										<div className="flex items-start gap-2 text-xs text-slate-650 dark:text-slate-350">
											<Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
											<span className="font-semibold">{chip.arch}</span>
										</div>

										<div className="flex items-start gap-2 text-xs text-slate-650 dark:text-slate-350">
											<Radio className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
											<span>{chip.wireless}</span>
										</div>

										<div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
											<CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
											<span>{chip.highlights}</span>
										</div>
									</div>
								</div>

								<div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
									<span>Ver Pinout e Especificações</span>
									<ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
								</div>
							</Link>
						))}
					</div>
				</section>

				{/* Seção 4: Problemas Comuns & Diagnóstico Rápido */}
				<section className="mb-24">
					<div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-white dark:from-slate-900/60 dark:via-slate-900/40 dark:to-purple-950/20 rounded-3xl p-6 sm:p-10 border border-indigo-200/80 dark:border-slate-800 shadow-xs">
						<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
							<div>
								<div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
									<AlertTriangle className="w-4 h-4" />
									<span>Resolução Imediata</span>
								</div>
								<h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-850 dark:text-slate-100">
									Enfrentando Erros ou Travamentos?
								</h2>
								<p className="text-sm text-slate-650 dark:text-slate-350 mt-1 max-w-xl">
									Acesse guias práticos com causas comprovadas e soluções passo a passo para as falhas mais comuns de hardware e firmware.
								</p>
							</div>

							<Link
								href="/diagnostico"
								className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all duration-200 shrink-0 self-start lg:self-auto cursor-pointer"
							>
								<AlertTriangle className="w-4 h-4" />
								<span>Abrir Guia de 30+ Erros</span>
							</Link>
						</div>

						<div className="grid md:grid-cols-2 gap-4">
							{commonErrors.map((err) => (
								<Link
									key={err.title}
									href="/diagnostico"
									prefetch={false}
									className="group bg-white dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-400 transition-all duration-200 flex flex-col justify-between"
								>
									<div>
										<div className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 mb-2 group-hover:underline">
											{err.title}
										</div>
										<p className="text-xs text-slate-650 dark:text-slate-350 mb-3">
											<strong className="text-slate-800 dark:text-slate-200">Causa provável: </strong>
											{err.cause}
										</p>
										<p className="text-xs text-slate-500 dark:text-slate-400">
											<strong className="text-emerald-700 dark:text-emerald-400">Solução rápida: </strong>
											{err.solution}
										</p>
									</div>

									<div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-bold text-amber-600 dark:text-amber-400">
										<span>Ver diagnóstico completo</span>
										<ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>

				{/* Seção 5: Ciência Embarcada & Curadoria */}
				<section className="mb-8">
					<div className="bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-900/40 dark:to-purple-950/10 rounded-3xl shadow-xs border border-slate-300 dark:border-slate-800/80 p-8 md:p-12 relative overflow-hidden">
						{/* Background soft glow decoration */}
						<div className="absolute right-0 bottom-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

						<div className="flex flex-col items-center text-center relative z-10 max-w-3xl mx-auto">
							<a 
								href="https://cienciaembarcada.com.br" 
								target="_blank" 
								rel="noopener noreferrer"
								className="group mb-6"
							>
								<Image 
									src="/logo.png" 
									alt="Ciência Embarcada Logo" 
									width={80}
									height={80}
									className="h-16 w-16 md:h-20 md:w-20 mb-2 transition-transform duration-300 group-hover:scale-105 object-contain"
								/>
							</a>
							
							<h2 className="text-xl sm:text-2xl font-bold text-slate-850 dark:text-slate-100 mb-3">
								Conteúdo e Curadoria por{' '}
								<a 
									href="https://cienciaembarcada.com.br" 
									target="_blank" 
									rel="noopener noreferrer"
									className="text-purple-600 dark:text-purple-400 hover:underline transition-colors font-extrabold"
								>
									Ciência Embarcada
								</a>
							</h2>
							
							<p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed mb-8 max-w-xl">
								Acesse artigos profundos sobre programação de microcontroladores, design de hardware, Internet das Coisas (IoT), laboratórios práticos e projetos reais em nosso blog parceiro oficial.
							</p>

							<a
								href="https://cienciaembarcada.com.br"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-purple-500/10 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:scale-95"
							>
								<span>Visitar Blog Ciência Embarcada</span>
								<ExternalLink className="w-4 h-4" />
							</a>
						</div>

						{/* Disclaimer Oficial */}
						<div className="border-t border-slate-300 dark:border-slate-800/80 pt-8 mt-10">
							<div className="bg-slate-100/60 dark:bg-slate-900/60 border-l-4 border-purple-500 p-5 rounded-r-2xl">
								<div className="flex gap-4">
									<Info className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
									<p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
										<strong className="font-bold text-slate-700 dark:text-slate-200">Plataforma independente e não oficial:</strong> O ESPDocs é um projeto educativo que compila, filtra e expõe dados públicos e links de documentações oficiais fornecidas pela fabricante Espressif Systems. Para projetos industriais ou decisões de engenharia críticas, sempre consulte a documentação técnica nativa do fabricante.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section> 
			</main>

			<Footer />
		</div>
	);
}