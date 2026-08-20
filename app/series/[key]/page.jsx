import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import seriesData from "@/public/series.json";
import ConnectionsDiagram from "@/components/ConnectionsDiagram";
import SeriesTabMenu from "@/components/SeriesTabMenu";
import { 
	Cpu, 
	Activity, 
	Database, 
	Wifi, 
	Bluetooth, 
	Battery, 
	Sparkles, 
	Home, 
	ArrowRight,
	ArrowLeft,
	ExternalLink,
	Scale,
	FileText,
	Code,
	BookOpen,
	AlertTriangle,
	Moon,
	Plug,
	Compass,
	Sliders,
	MapPin,
	Volume2,
	Fingerprint,
	MessageSquare,
	Repeat,
	Share2,
	Music,
	Clock,
	HardDrive,
	Folder,
	Thermometer,
	ChevronRight,
	Lightbulb,
	ShieldCheck,
	KeyRound
} from "lucide-react";

export default async function SerieDetail({ params }) {
	const { key } = await params;
	const serie = seriesData[key];

	if (!serie) {
		notFound();
	}

	let conexoes = [];
	try {
		conexoes = require(`@/public/conexoes/${key}.json`);
	} catch (error) {
		console.log(`Arquivo de conexões não encontrado para ${key}`);
	}

	const seriesKeys = Object.keys(seriesData);
	const currentIndex = seriesKeys.indexOf(key);
	const previousKey = currentIndex > 0 ? seriesKeys[currentIndex - 1] : null;
	const nextKey = currentIndex < seriesKeys.length - 1 ? seriesKeys[currentIndex + 1] : null;

	const processadorSpecs = [
		{ label: "Arquitetura", value: serie.arquitetura, icon: <Cpu className="w-5 h-5 text-blue-500" /> },
		{ label: "Núcleos", value: serie.nucleos, icon: <Sliders className="w-5 h-5 text-blue-500" /> },
		{ label: "Frequência", value: serie.frequencia, icon: <Activity className="w-5 h-5 text-blue-500" /> },
		{ label: "Coprocessador ULP", value: serie.coprocessador_ulp || "Não", icon: <Moon className="w-5 h-5 text-blue-500" /> },
		{ label: "Aceleradores IA", value: serie.aceleradores_ia || "Não", icon: <Sparkles className="w-5 h-5 text-purple-500" /> },
	];

	const segurancaSpecs = [
		{ label: "Aceleradores Criptográficos", value: serie.aceleradores_cripto || "Não", icon: <ShieldCheck className="w-5 h-5 text-teal-500" /> },
		{ label: "Gerador de Números Aleatórios", value: serie.aceleradores_cripto ? "Sim (RNG por hardware)" : "Não", icon: <KeyRound className="w-5 h-5 text-teal-500" /> },
	];

	const conectividadeSpecs = [
		{ label: "Wi-Fi", value: serie.wifi || "Não", icon: <Wifi className="w-5 h-5 text-indigo-500" /> },
		{ label: "Bluetooth", value: serie.bluetooth || "Não", icon: <Bluetooth className="w-5 h-5 text-indigo-500" /> },
		{ label: "Zigbee/Thread", value: serie.zigbee_thread || "Não", icon: <Compass className="w-5 h-5 text-indigo-500" /> },
		{ label: "Matter", value: serie.matter || "Não", icon: <Home className="w-5 h-5 text-indigo-500" /> },
		{ label: "Ethernet", value: serie.ethernet || serie.ethernet_mac || "Não", icon: <Plug className="w-5 h-5 text-indigo-500" /> },
		{ label: "CAN", value: serie.can || "Não", icon: <Activity className="w-5 h-5 text-indigo-500" /> },
	];

	const memoriaSpecs = [
		{ label: "SRAM", value: serie.memoria_sram, icon: <Database className="w-5 h-5 text-pink-500" /> },
		{ label: "SRAM RTC", value: serie.memoria_sram_rtc, icon: <Clock className="w-5 h-5 text-pink-500" /> },
		{ label: "ROM", value: serie.memoria_rom, icon: <Folder className="w-5 h-5 text-pink-500" /> },
		{ label: "Flash Externa", value: serie.flash_externa, icon: <HardDrive className="w-5 h-5 text-pink-500" /> },
		{ label: "PSRAM Externa", value: serie.psram_externa || "Não", icon: <Sliders className="w-5 h-5 text-pink-500" /> },
	];

	const perifericos = [
		{ label: "GPIO", value: serie.gpio, icon: <MapPin className="w-5 h-5 text-emerald-500" /> },
		{ label: "ADC", value: serie.adc, icon: <Activity className="w-5 h-5 text-emerald-500" /> },
		{ label: "DAC", value: serie.dac || "Não", icon: <Volume2 className="w-5 h-5 text-emerald-500" /> },
		{ label: "Touch", value: serie.touch || "Não", icon: <Fingerprint className="w-5 h-5 text-emerald-500" /> },
		{ label: "UART", value: serie.uart, icon: <MessageSquare className="w-5 h-5 text-emerald-500" /> },
		{ label: "SPI", value: serie.spi, icon: <Repeat className="w-5 h-5 text-emerald-500" /> },
		{ label: "I2C", value: serie.i2c, icon: <Share2 className="w-5 h-5 text-emerald-500" /> },
		{ label: "I2S", value: serie.i2s, icon: <Music className="w-5 h-5 text-emerald-500" /> },
		{ label: "PWM", value: serie.pwm, icon: <Sliders className="w-5 h-5 text-emerald-500" /> },
		{ label: "USB", value: serie.usb || "Não", icon: <Plug className="w-5 h-5 text-emerald-500" /> },
	];

	const interfacesEspeciais = [];
	if (serie.lcd) interfacesEspeciais.push({ label: "LCD", value: serie.lcd, icon: <Sliders className="w-5 h-5 text-cyan-500" /> });
	if (serie.camera) interfacesEspeciais.push({ label: "Câmera", value: serie.camera, icon: <Sliders className="w-5 h-5 text-cyan-500" /> });
	if (serie.mipi_csi) interfacesEspeciais.push({ label: "MIPI CSI", value: serie.mipi_csi, icon: <Sliders className="w-5 h-5 text-cyan-500" /> });
	if (serie.mipi_dsi) interfacesEspeciais.push({ label: "MIPI DSI", value: serie.mipi_dsi, icon: <Sliders className="w-5 h-5 text-cyan-500" /> });
	if (serie.sdio) interfacesEspeciais.push({ label: "SDIO", value: serie.sdio, icon: <Sliders className="w-5 h-5 text-cyan-500" /> });
	if (serie.sensor_hall) interfacesEspeciais.push({ label: "Sensor Hall", value: serie.sensor_hall, icon: <Sliders className="w-5 h-5 text-cyan-500" /> });
	if (serie.sensor_temperatura) interfacesEspeciais.push({ label: "Sensor Temperatura", value: serie.sensor_temperatura, icon: <Thermometer className="w-5 h-5 text-cyan-500" /> });

	// Consumo de Energia
	const consumoEnergia = [];
	if (serie.consumo_energia) {
		Object.entries(serie.consumo_energia).forEach(([modo, consumo]) => {
			const modoLabels = {
				'active': 'Modo Ativo',
				'active_cpu_240mhz': 'Ativo (CPU 240MHz)',
				'active_cpu_160mhz': 'Ativo (CPU 160MHz)',
				'active_wifi_tx': 'Ativo (Wi-Fi TX)',
				'active_wifi_tx_peak': 'Ativo (Wi-Fi TX Pico)',
				'active_wifi': 'Ativo (Wi-Fi)',
				'active_wifi6': 'Ativo (Wi-Fi 6)',
				'modem_sleep': 'Modem Sleep',
				'modem_sleep_cpu_160mhz': 'Modem Sleep (CPU 160MHz)',
				'light_sleep': 'Light Sleep',
				'deep_sleep': 'Deep Sleep',
				'hibernation': 'Hibernação'
			};
			
			consumoEnergia.push({
				label: modoLabels[modo] || modo.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
				value: consumo,
				icon: <Battery className="w-5 h-5 text-teal-500" />
			});
		});
	}

	const tabs = [
		{
			id: 'devboard',
			label: 'Placa de Desenvolvimento',
			available: serie.placa,
			content: (
				<div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl">
					<h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 pb-3 border-b border-slate-200/65 dark:border-slate-800/65 flex items-center gap-3">
						<Sliders className="w-5 h-5" style={{ color: serie.cor }} />
						<span>Kit de Desenvolvimento Oficial</span>
					</h2>
					<div className="flex justify-center">
						<div className="relative w-full max-w-3xl bg-white dark:bg-white overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-850/50 shadow-lg p-4">
							<Image
								src={serie.placa}
								alt={`${key} DevKit - Placa de Desenvolvimento`}
								width={1200}
								height={800}
								className="rounded-xl object-contain w-full h-auto max-h-[450px]"
								priority
							/>
							<p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4 select-none">
								Placa de desenvolvimento padrão da Espressif Systems para a série {key}
							</p>
						</div>
					</div>
				</div>
			)
		},
		{
			id: 'connections',
			label: 'Diagrama de Conexões',
			available: conexoes.length > 0,
			content: (
				<div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl">
					<div className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 p-5 mb-8 rounded-2xl">
						<div className="flex items-start gap-3">
							<AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
							<div>
								<h4 className="font-bold text-sm text-amber-850 dark:text-amber-300 mb-1 select-none">Diagrama do SoC (System on Chip)</h4>
								<p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
									Este mapa refere-se exclusivamente às portas e conexões do silício bruto do microcontrolador <strong>{key}</strong>. As placas de desenvolvimento podem expor apenas uma parcela destas conexões, ou roteá-las de formas diferentes dependendo do circuito impresso.
								</p>
							</div>
						</div>
					</div>

					<ConnectionsDiagram connections={conexoes} serie={serie} />

					<div className="bg-slate-100/50 dark:bg-slate-950/40 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 mt-8">
						<h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2 select-none">
							<Lightbulb className="w-4 h-4 text-purple-500" />
							<span>Flexibilidade das Portas GPIO</span>
						</h3>
						<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
							O {key} integra uma matriz IO multiplexada e de baixa latência (IO MUX) que permite reconfigurar a grande maioria dos pinos digitais para assumir funções de SPI, I2C, UART, LEDC PWM ou barramentos de câmera e display. 
							Para mais detalhes sobre as restrições físicas de GPIOs strapping ou analógicas, consulte o&nbsp;
							<a 
								href={`https://docs.espressif.com/projects/esp-idf/en/latest/${String(key).toLowerCase().replace("-", "")}/api-reference/peripherals/gpio.html`} 
								target="_blank" 
								rel="noopener noreferrer" 
								className="text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-0.5"
							>
								<span>Guia Oficial de GPIO</span>
								<ExternalLink className="w-2.5 h-2.5" />
							</a>.
						</p>
					</div>
				</div>
			)
		}
	];

	return (
		<div className="bg-gradient-to-br from-slate-50 via-white to-purple-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<Header />

			<main className="px-6 pt-16 pb-24 max-w-7xl mx-auto">
				
				{/* Breadcrumb Navigation */}
				<div className="mb-8">
					<Link 
						href="/series" 
						className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors uppercase tracking-wider mb-6"
					>
						<ArrowLeft className="w-3.5 h-3.5" /> 
						<span>Voltar para Séries</span>
					</Link>
					
					{/* Top Info Banner Card */}
					<div 
						className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border relative overflow-hidden"
						style={{ borderColor: `${serie.cor}40` }}
					>
						<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
							<div className="flex items-center gap-5">
								<span className="text-6xl select-none filter drop-shadow-md">{serie.icone}</span>
								<div>
									<h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-850 dark:text-slate-100 tracking-tight leading-none mb-3">
										{key}
									</h1>
									<p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mb-4">{serie.nome_completo}</p>
									<span 
										className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
										style={{ backgroundColor: `${serie.cor}18`, color: serie.cor, border: `1px solid ${serie.cor}30` }}
									>
										{serie.arquitetura}
									</span>
								</div>
							</div>
							
							{/* Links Block */}
							<div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3 w-full lg:w-auto">
								{serie.datasheet ? (
									<a
										href={serie.datasheet}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg"
									>
										<FileText className="w-4 h-4" />
										<span>Datasheet Oficial</span>
									</a>
								) : (
									<span className="inline-flex items-center justify-center gap-2 bg-slate-200/60 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-slate-300/60 dark:border-slate-700/60 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider select-none cursor-not-allowed">
										<FileText className="w-4 h-4" />
										<span>Datasheet ainda não publicado</span>
									</span>
								)}

								<a
									href={serie.guia_de_programacao}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-500/20 transition-all shadow-xs"
								>
									<Code className="w-4 h-4" />
									<span>Guia de Programação</span>
								</a>
								
								{serie.manual_tecnico && (
									<a
										href={serie.manual_tecnico}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-purple-500/20 transition-all shadow-xs"
									>
										<BookOpen className="w-4 h-4" />
										<span>Manual Técnico</span>
									</a>
								)}
							</div>
						</div>
						
						<p className="text-sm text-slate-500 dark:text-slate-400 mt-6 leading-relaxed max-w-4xl">
							{serie.descricao}
						</p>

						{serie.status_documentacao && (
							<div className="mt-6 max-w-4xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 p-5 rounded-2xl">
								<div className="flex items-start gap-3">
									<AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
									<div>
										<p className="text-xs font-bold uppercase tracking-wider mb-1">Documentação preliminar</p>
										<p className="text-xs leading-relaxed">{serie.status_documentacao}</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Primary Features Highlight Grid */}
				<div className="grid md:grid-cols-3 gap-6 mb-8">
					<div 
						className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-lg p-6 border-l-4" 
						style={{ borderColor: serie.cor }}
					>
						<h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 select-none">PROCESSADOR</h3>
						<p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{serie.nucleos.includes("2") ? "Dual-Core" : "Single-Core"}</p>
						<p className="text-xs text-slate-400 mt-1">{serie.frequencia}</p>
					</div>
					
					<div 
						className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-lg p-6 border-l-4" 
						style={{ borderColor: serie.cor }}
					>
						<h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 select-none">MEMÓRIA SRAM</h3>
						<p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{serie.memoria_sram}</p>
						<p className="text-xs text-slate-400 mt-1">+ {serie.memoria_sram_rtc} RTC SRAM</p>
					</div>
					
					<div 
						className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-lg p-6 border-l-4" 
						style={{ borderColor: serie.cor }}
					>
						<h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 select-none">GPIO DISPONÍVEIS</h3>
						<p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{serie.gpio}</p>
						<p className="text-xs text-slate-400 mt-1">Pinos I/O programáveis</p>
					</div>
				</div>

				{/* DevBoard and Connections Tabs */}
				<SeriesTabMenu tabs={tabs} color={serie.cor} />

				{/* Specs List Cards */}
				<div className="space-y-6 mt-12">
					<SpecSection title="Processador" specs={processadorSpecs} cor={serie.cor} icon={<Cpu className="w-5 h-5" style={{ color: serie.cor }} />} />
					<SpecSection title="Conectividade RF" specs={conectividadeSpecs} cor={serie.cor} icon={<Wifi className="w-5 h-5" style={{ color: serie.cor }} />} />
					<SpecSection title="Segurança e Criptografia" specs={segurancaSpecs} cor={serie.cor} icon={<ShieldCheck className="w-5 h-5" style={{ color: serie.cor }} />} />
					<SpecSection title="Estrutura de Memória" specs={memoriaSpecs} cor={serie.cor} icon={<Database className="w-5 h-5" style={{ color: serie.cor }} />} />
					
					{/* Power Consumption section */}
					{consumoEnergia.length > 0 && (
						<div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl">
							<h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 pb-3 border-b border-slate-200/65 dark:border-slate-800/65 flex items-center gap-3 select-none">
								<Battery className="w-5 h-5" style={{ color: serie.cor }} />
								<span>Consumo de Energia</span>
							</h2>
							
							<div className="bg-blue-500/10 border border-blue-500/20 p-4 mb-6 rounded-xl">
								<div className="flex items-start gap-3 text-blue-650 dark:text-blue-400">
									<Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
									<p className="text-xs leading-relaxed">
										<strong>Especificações típicas medidas sob 3.3V com 25°C de temperatura ambiente.</strong> O consumo absoluto depende ativamente do ciclo de trabalho (duty cycle) das interfaces Wi-Fi/Bluetooth e da frequência de clock configurada via software.
									</p>
								</div>
							</div>
							
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
								{consumoEnergia.map((spec, index) => (
									<div key={index} className="flex items-center gap-3.5 p-3.5 bg-slate-50/50 dark:bg-slate-950/20 rounded-xl hover:bg-purple-500/5 dark:hover:bg-purple-400/5 border border-slate-150/40 dark:border-slate-850/40 transition-colors">
										<div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-xs border border-slate-200/30 dark:border-slate-850/30 shrink-0">
											{spec.icon}
										</div>
										<div className="min-w-0">
											<p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{spec.label}</p>
											<p className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{spec.value}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
					
					<SpecSection title="Periféricos Disponíveis" specs={perifericos} cor={serie.cor} icon={<Sliders className="w-5 h-5" style={{ color: serie.cor }} />} />
					
					{interfacesEspeciais.length > 0 && (
						<SpecSection title="Interfaces de Hardware Especiais" specs={interfacesEspeciais} cor={serie.cor} icon={<Sparkles className="w-5 h-5" style={{ color: serie.cor }} />} />
					)}
					
					<SpecSection
						title="Limites Operacionais de Temperatura"
						icon={<Thermometer className="w-5 h-5" style={{ color: serie.cor }} />}
						specs={[
							{ label: "Operação", value: serie.temperatura_operacao, icon: <Thermometer className="w-5 h-5 text-red-500" /> },
							{ label: "Armazenamento", value: serie.temperatura_armazenamento, icon: <Folder className="w-5 h-5 text-red-500" /> },
						]}
						cor={serie.cor}
					/>
				</div>

				{/* DevBoard CTA Panel */}
				<div className="my-20 bg-gradient-to-br from-slate-900 to-indigo-950 dark:from-slate-950 dark:to-purple-950/20 border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
					<div className="absolute right-0 bottom-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

					<div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
						<div className="flex-1 max-w-2xl text-center md:text-left">
							<div className="inline-flex items-center gap-2 bg-white/10 text-slate-350 px-3 py-1 rounded-full mb-4 text-xs font-semibold select-none">
								<Home className="w-3.5 h-3.5" />
								<span>Hardware Fisico</span>
							</div>
							<h3 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-4">
								Pronto para começar a prototipar?
							</h3>
							<p className="text-sm text-slate-400 leading-relaxed">
								Explore toda a nossa grade de placas de desenvolvimento de parceiros oficiais para a série {key}. Compare dimensões, conversores USB-serial e pinagens prontas para protoboards.
							</p>
						</div>
						
						<Link
							href="/catalogo"
							className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all duration-300 shrink-0 shadow-md active:scale-95"
						>
							<span>Ver Placas Disponíveis</span>
							<ArrowRight className="w-4 h-4" />
						</Link>
					</div>
				</div>

				{/* Previous / Next Nav bars */}
				<div className="grid sm:flex sm:justify-between items-center gap-4 mt-12 px-2 select-none">
					{previousKey ? (
						<Link
							href={`/series/${previousKey}`}
							className="flex items-center gap-3 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl px-5 py-3.5 rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-800/80 hover:border-purple-500/55 dark:hover:border-purple-400/55 transition-all group shrink-0"
						>
							<ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1.5 transition-transform" />
							<div className="text-left">
								<p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Anterior</p>
								<p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{previousKey}</p>
							</div>
						</Link>
					) : (
						<div className="hidden sm:block w-36" />
					)}

					<Link
						href="/comparacao"
						className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-md"
					>
						<Scale className="w-4 h-4" />
						<span>Comparar Séries</span>
					</Link>
					
					{nextKey ? (
						<Link
							href={`/series/${nextKey}`}
							className="flex items-center gap-3 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl px-5 py-3.5 rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-800/80 hover:border-purple-500/55 dark:hover:border-purple-400/55 transition-all group shrink-0"
						>
							<div className="text-right">
								<p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Próximo</p>
								<p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{nextKey}</p>
							</div>
							<ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1.5 transition-transform" />
						</Link>
					) : (
						<div className="hidden sm:block w-36" />
					)}
				</div>
			</main>

			<Footer />
		</div>
	);
}

function SpecSection({ title, specs, cor, icon }) {
	return (
		<div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl">
			<h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 pb-3 border-b border-slate-200/65 dark:border-slate-800/65 flex items-center gap-3 select-none">
				{icon}
				<span>{title}</span>
			</h2>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				{specs.map((spec, index) => (
					<div key={index} className="flex items-center gap-3.5 p-3.5 bg-slate-50/50 dark:bg-slate-950/20 rounded-xl hover:bg-purple-500/5 dark:hover:bg-purple-400/5 border border-slate-150/40 dark:border-slate-850/40 transition-colors">
						<div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-xs border border-slate-200/30 dark:border-slate-850/30 shrink-0">
							{spec.icon}
						</div>
						<div className="min-w-0">
							<p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{spec.label}</p>
							<p className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{spec.value}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export async function generateMetadata({ params }) {
	const { key } = await params;
	const serie = seriesData[key];

	if (!serie) {
		return {
			title: "Série não encontrada",
		};
	}

	return {
		title: `ESPDocs - ${serie.nome_completo}`,
		description: serie.descricao,
	};
}

export async function generateStaticParams() {
	return Object.keys(seriesData).map((key) => ({
		key: key,
	}));
}