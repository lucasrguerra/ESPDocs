"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, Fragment } from "react";
import Link from "next/link";
import seriesData from "@/public/series.json";
import { 
	Scale, 
	GitCompare, 
	Check, 
	ChevronDown, 
	ChevronUp, 
	ArrowRight, 
	FileText, 
	ExternalLink, 
	ShoppingBag, 
	Cpu, 
	Network, 
	Database, 
	Sliders, 
	Activity,
	HelpCircle,
	Thermometer,
	ShieldCheck,
	Package
} from "lucide-react";

// Category to Icon mapping
const categoryIcons = {
	"Geral": <HelpCircle className="w-4 h-4 text-purple-500" />,
	"Processador": <Cpu className="w-4 h-4 text-blue-500" />,
	"Conectividade": <Network className="w-4 h-4 text-indigo-500" />,
	"Memória": <Database className="w-4 h-4 text-pink-500" />,
	"Periféricos Digitais": <Sliders className="w-4 h-4 text-sky-500" />,
	"Periféricos Analógicos": <Activity className="w-4 h-4 text-emerald-500" />,
	"Segurança": <ShieldCheck className="w-4 h-4 text-teal-500" />,
	"Disponibilidade e Ferramentas": <Package className="w-4 h-4 text-amber-500" />,
	"Interfaces Especiais": <Activity className="w-4 h-4 text-cyan-500" />,
	"Especificações Ambientais": <Thermometer className="w-4 h-4 text-red-500" />,
};

/* Lê "seguranca.ecc" além de chaves simples. */
function valorDe(objeto, caminho) {
	return caminho.split(".").reduce((atual, parte) => atual?.[parte], objeto);
}

export default function Comparacao() {
	const [selectedSeries, setSelectedSeries] = useState(["ESP32", "ESP32-S3"]);
	const [collapsedCategories, setCollapsedCategories] = useState({
		"Interfaces Especiais": true,
		"Especificações Ambientais": true,
	});

	const series = Object.entries(seriesData);

	const toggleSeries = (seriesKey) => {
		if (selectedSeries.includes(seriesKey)) {
			if (selectedSeries.length > 2) {
				setSelectedSeries(selectedSeries.filter(s => s !== seriesKey));
			}
		} else {
			if (selectedSeries.length < 4) {
				setSelectedSeries([...selectedSeries, seriesKey]);
			}
		}
	};

	const toggleCategory = (category) => {
		setCollapsedCategories({
			...collapsedCategories,
			[category]: !collapsedCategories[category]
		});
	};

	const compareFields = [
		{ category: "Geral", fields: [
			{ key: "nome_completo", label: "Nome Completo" },
			{ key: "descricao", label: "Descrição" },
		]},
		{ category: "Disponibilidade e Ferramentas", fields: [
			{ key: "esp_idf_minimo", label: "ESP-IDF mínimo" },
			{ key: "arduino_core", label: "Core Arduino" },
			{ key: "depuracao", label: "Depuração / JTAG" },
			{ key: "encapsulamento", label: "Encapsulamento" },
			{ key: "modulos", label: "Módulos disponíveis" },
		]},
		{ category: "Processador", fields: [
			{ key: "arquitetura", label: "Arquitetura" },
			{ key: "nucleos", label: "Núcleos" },
			{ key: "frequencia", label: "Frequência" },
			{ key: "coprocessador_ulp", label: "Coprocessador ULP" },
			{ key: "aceleradores_ia", label: "Aceleradores de IA" },
		]},
		{ category: "Conectividade", fields: [
			{ key: "wifi", label: "Wi-Fi" },
			{ key: "bluetooth", label: "Bluetooth" },
			{ key: "zigbee_thread", label: "Zigbee/Thread" },
			{ key: "matter", label: "Matter" },
			{ key: "ethernet", label: "Ethernet" },
		]},
		{ category: "Memória", fields: [
			{ key: "memoria_sram", label: "SRAM" },
			{ key: "memoria_sram_rtc", label: "SRAM RTC" },
			{ key: "memoria_rom", label: "ROM" },
			{ key: "flash_externa", label: "Flash Externa" },
			{ key: "psram_externa", label: "PSRAM Externa" },
		]},
		{ category: "Periféricos Digitais", fields: [
			{ key: "gpio", label: "GPIO" },
			{ key: "uart", label: "UART" },
			{ key: "spi", label: "SPI" },
			{ key: "i2c", label: "I²C" },
			{ key: "i2s", label: "I²S" },
			{ key: "pwm", label: "PWM" },
			{ key: "can", label: "CAN" },
			{ key: "usb", label: "USB" },
			{ key: "depuracao", label: "Depuração / JTAG" },
			{ key: "sdio", label: "SDIO" },
		]},
		{ category: "Periféricos Analógicos", fields: [
			{ key: "adc", label: "ADC" },
			{ key: "dac", label: "DAC" },
			{ key: "touch", label: "Touch Capacitivo" },
			{ key: "sensor_hall", label: "Sensor Hall" },
			{ key: "sensor_temperatura", label: "Sensor de Temperatura" },
		]},
		{ category: "Segurança", fields: [
			{ key: "seguranca.aes", label: "AES" },
			{ key: "seguranca.sha", label: "SHA" },
			{ key: "seguranca.rsa", label: "RSA / MPI" },
			{ key: "seguranca.ecc", label: "ECC (curvas elípticas)" },
			{ key: "seguranca.ecdsa", label: "ECDSA em hardware" },
			{ key: "seguranca.hmac", label: "HMAC" },
			{ key: "seguranca.assinatura_digital", label: "Assinatura Digital (DS)" },
			{ key: "seguranca.key_manager", label: "Key Manager" },
			{ key: "seguranca.rng", label: "Gerador aleatório (RNG)" },
			{ key: "seguranca.criptografia_flash", label: "Criptografia de flash" },
			{ key: "seguranca.secure_boot", label: "Secure Boot" },
			{ key: "seguranca.protecao_dpa", label: "Proteção contra DPA" },
		]},
		{ category: "Interfaces Especiais", fields: [
			{ key: "lcd", label: "LCD" },
			{ key: "camera", label: "Câmera" },
			{ key: "mipi_csi", label: "MIPI CSI" },
			{ key: "mipi_dsi", label: "MIPI DSI" },
			{ key: "ethernet_mac", label: "Ethernet MAC" },
		]},
		{ category: "Especificações Ambientais", fields: [
			{ key: "temperatura_operacao", label: "Temp. Operação" },
			{ key: "temperatura_armazenamento", label: "Temp. Armazenamento" },
		]},
	];

	const renderValue = (value) => {
		if (!value || value === "Não") {
			return <span className="text-slate-500 dark:text-slate-400 font-medium select-none">Não</span>;
		}
		if (value === "Sim") {
			return (
				<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs">
					<Check className="w-3.5 h-3.5" />
				</span>
			);
		}
		return <span className="text-slate-800 dark:text-slate-200 font-semibold">{value}</span>;
	};

	return (
		<div className="bg-gradient-to-br from-slate-100 via-slate-50 to-purple-100/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
			<Header />

			<main id="conteudo" className="px-6 pt-16 pb-24 max-w-7xl mx-auto">
				
				{/* Top Section */}
				<section className="mb-16">
					<div className="border-l-4 border-purple-500 pl-6 max-w-3xl">
						<p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2 select-none">
							Análise Técnica Comparativa
						</p>
						<h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-800 dark:text-slate-100 mb-4 tracking-tight leading-tight">
							Comparador de Séries ESP32
						</h1>
						<p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
							Coloque lado a lado as especificações completas de clock, memória, interfaces de rádio e periféricos analógicos para validar a engenharia e o custo-benefício de cada microcontrolador.
						</p>
					</div>
				</section>

				{/* Model Selector Card */}
				<section className="mb-12">
					<div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-300 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
							<div>
								<h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
									Escolha as Séries
								</h2>
								<p className="text-xs text-slate-500 dark:text-slate-400">
									Selecione de 2 a até 4 modelos simultâneos para montar sua planilha de comparação.
								</p>
							</div>

							<div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-3.5 py-1.5 rounded-full border border-purple-500/20 text-xs font-bold shadow-xs select-none">
								<GitCompare className="w-3.5 h-3.5" />
								<span>{selectedSeries.length} de 4 selecionados</span>
							</div>
						</div>

						{/* Brand-colored dynamic button selector grid */}
						<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
							{series.map(([key, seriesItem]) => {
								const isSelected = selectedSeries.includes(key);
								return (
									<button
										key={key}
										onClick={() => toggleSeries(key)}
										style={{
											borderColor: isSelected ? seriesItem.cor : undefined
										}}
										className={`p-4 border rounded-2xl transition-all duration-300 cursor-pointer active:scale-95 text-center flex flex-col items-center justify-center shadow-xs ${
											isSelected
												? 'bg-slate-100 dark:bg-slate-950 shadow-md scale-[1.02] border-2'
												: 'border-slate-300 dark:border-slate-800/80 bg-white dark:bg-slate-900/30 hover:border-purple-400/50 hover:bg-purple-500/5'
										}`}
									>
										<div className="text-3xl mb-2 select-none transform hover:scale-110 transition-transform">{seriesItem.icone}</div>
										<div className="text-xs font-bold text-slate-800 dark:text-slate-200">{key}</div>
										
										{isSelected && (
											<div 
												className="mt-2.5 w-2 h-2 rounded-full shrink-0 animate-pulse"
												style={{ backgroundColor: seriesItem.cor }}
											/>
										)}
									</button>
								);
							})}
						</div>
					</div>
				</section>

				{/* Side by side interactive Table */}
				<div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-300 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">
					<div className="overflow-x-auto scrollbar-thin">
						<table className="w-full border-collapse">
							<thead>
								<tr className="bg-slate-850 dark:bg-slate-950 border-b border-slate-750 dark:border-slate-900">
									<th className="px-6 py-5 text-left text-white font-bold text-xs uppercase tracking-widest sticky left-0 bg-slate-850 dark:bg-slate-950 z-20 shadow-xs border-r border-slate-700/30">
										Especificação
									</th>
									{selectedSeries.map(seriesKey => {
										const seriesItem = seriesData[seriesKey];
										return (
											<th key={seriesKey} className="px-6 py-5 text-center text-white font-bold text-xs uppercase tracking-widest min-w-48">
												<div className="flex flex-col items-center gap-2 select-none">
													<span className="text-3xl transform hover:scale-105 transition-transform">{seriesItem.icone}</span>
													<span className="text-sm font-extrabold tracking-wide" style={{ color: seriesItem.cor }}>{seriesKey}</span>
												</div>
											</th>
										);
									})}
								</tr>
							</thead>
							<tbody>
								{compareFields.map(({ category, fields }) => {
									const isCollapsed = collapsedCategories[category];
									return (
										<Fragment key={category}>
											{/* Collapsible Category Accordion Header */}
											<tr 
												onClick={() => toggleCategory(category)}
												className="bg-slate-100/80 dark:bg-slate-950/60 border-y border-slate-250/60 dark:border-slate-800/80 cursor-pointer select-none hover:bg-slate-200/60 dark:hover:bg-slate-900/80 transition-colors"
											>
												<td 
													colSpan={selectedSeries.length + 1} 
													className="px-6 py-3.5 font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider"
												>
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															{categoryIcons[category] || <HelpCircle className="w-4 h-4 text-purple-500" />}
															<span>{category}</span>
														</div>
														{isCollapsed ? (
															<ChevronDown className="w-4 h-4 opacity-60 text-purple-600 dark:text-purple-400" />
														) : (
															<ChevronUp className="w-4 h-4 opacity-60 text-purple-600 dark:text-purple-400" />
														)}
													</div>
												</td>
											</tr>

											{/* Fields list within category (if expanded) */}
											{!isCollapsed && fields.map(({ key, label }) => (
												<tr 
													key={key} 
													className="border-b border-slate-200 dark:border-slate-800/40 hover:bg-purple-500/5 dark:hover:bg-purple-400/5 transition-colors group"
												>
													<td className="px-6 py-4 font-bold text-slate-600 dark:text-slate-400 text-xs bg-white dark:bg-slate-900/10 sticky left-0 border-r border-slate-150/60 dark:border-slate-800/60 shrink-0 z-10">
														{label}
													</td>
													{selectedSeries.map(seriesKey => {
														const seriesItem = seriesData[seriesKey];
														const value = valorDe(seriesItem, key);
														return (
															<td key={seriesKey} className="px-6 py-4 text-center text-xs">
																{renderValue(value)}
															</td>
														);
													})}
												</tr>
											))}
										</Fragment>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>

				{/* Professional CTA Banner for the Catalog */}
				<div className="my-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-950 dark:to-purple-950/20 border border-indigo-200 dark:border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
					<div className="absolute right-0 bottom-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

					<div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
						<div className="flex-1 max-w-2xl text-center md:text-left">
							<div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-700 dark:bg-white/10 dark:text-slate-350 px-3 py-1 rounded-full mb-4 text-xs font-semibold select-none">
								<ShoppingBag className="w-3.5 h-3.5" />
								<span>Hardware Adicional</span>
							</div>
							<h3 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900 dark:text-white mb-4">
								Catálogo de Placas de Desenvolvimento
							</h3>
							<p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
								Quer testar o chip selecionado na bancada? Compare placas de desenvolvimento com layouts de pinos mapeados, conexões de periféricos e links oficiais dos melhores fornecedores.
							</p>
						</div>
						
						<Link
							href="/catalogo"
							className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all duration-300 shrink-0 shadow-md active:scale-95"
						>
							<span>Acessar Catálogo</span>
							<ArrowRight className="w-4 h-4" />
						</Link>
					</div>
				</div>

				{/* Detailed technical datasheets section */}
				<div className="mt-12">
					<h3 className="text-xl font-display font-extrabold text-slate-800 dark:text-slate-100 mb-6 border-l-4 border-purple-500 pl-4 select-none">
						Documentação Técnica Relacionada
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{selectedSeries.map(seriesKey => {
							const seriesItem = seriesData[seriesKey];
							return (
								<div
									key={seriesKey}
									className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-300 dark:border-slate-800/80 p-5 rounded-2xl hover:border-purple-500/50 dark:hover:border-purple-400/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
								>
									<div className="flex gap-4 items-start mb-4">
										<div className="text-4xl select-none">{seriesItem.icone}</div>
										<div className="min-w-0">
											<Link href={`/series/${seriesKey}`} className="no-underline">
												<h4 className="text-sm font-extrabold text-slate-850 dark:text-slate-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
													{seriesKey}
												</h4>
											</Link>
											<p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1">Guia de Hardware</p>
										</div>
									</div>

									{seriesItem.datasheet ? (
										<a
											href={seriesItem.datasheet}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center justify-center gap-1.5 w-full text-center py-2 bg-slate-100 dark:bg-slate-950 hover:bg-purple-500/10 dark:hover:bg-purple-400/10 border border-slate-300 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-650 dark:text-slate-350 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
										>
											<span>Datasheet Oficial</span>
											<ExternalLink className="w-3.5 h-3.5" />
										</a>
									) : (
										<span className="inline-flex items-center justify-center gap-1.5 w-full text-center py-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 select-none">
											<span>Datasheet ainda não publicado</span>
										</span>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}