"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import Link from "next/link";
import seriesData from "@/public/series.json";

export default function Comparacao() {
    const [selectedSeries, setSelectedSeries] = useState(["ESP32", "ESP32-S3"]);
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

    const compareFields = [
        { category: "Geral", fields: [
            { key: "nome_completo", label: "Nome Completo" },
            { key: "descricao", label: "Descrição" },
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
            { key: "sdio", label: "SDIO" },
        ]},
        { category: "Periféricos Analógicos", fields: [
            { key: "adc", label: "ADC" },
            { key: "dac", label: "DAC" },
            { key: "touch", label: "Touch Capacitivo" },
            { key: "sensor_hall", label: "Sensor Hall" },
            { key: "sensor_temperatura", label: "Sensor de Temperatura" },
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
            return <span className="text-slate-400 font-medium">—</span>;
        }
        if (value === "Sim") {
            return <span className="text-slate-700 font-semibold">✓</span>;
        }
        return <span className="text-slate-800 font-medium">{value}</span>;
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            <main id="conteudo" className="px-4 pt-16 pb-20 max-w-7xl mx-auto">
                <section className="mb-16">
                    <div className="border-l-4 border-slate-700 pl-6 mb-8">
                        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-2">
                            Análise Técnica Comparativa
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Comparação de Séries ESP32
                        </h1>
                        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
                            Análise detalhada de especificações técnicas para seleção de microcontroladores ESP32
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold text-slate-900 mb-2">
                            Seleção de Modelos
                        </h2>
                        <p className="text-sm text-slate-600 mb-6">
                            Selecione de 2 a 4 séries para análise comparativa
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                            {series.map(([key, seriesItem]) => (
                                <button
                                    key={key}
                                    onClick={() => toggleSeries(key)}
                                    className={`p-4 border rounded-lg transition-all duration-200 ${
                                        selectedSeries.includes(key)
                                            ? 'border-slate-700 bg-slate-50 shadow-sm'
                                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="text-3xl mb-2">{seriesItem.icone}</div>
                                    <div className="text-xs font-semibold text-slate-800">{key}</div>
                                    {selectedSeries.includes(key) && (
                                        <div className="mt-2 flex justify-center">
                                            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded border border-slate-200">
                            <span className="text-slate-700 font-medium text-sm">
                                {selectedSeries.length} / 4 modelos selecionados
                            </span>
                        </div>
                    </div>
                </section>

                <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-800 border-b border-slate-700">
                                    <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider sticky left-0 bg-slate-800 z-10">
                                        Especificação
                                    </th>
                                    {selectedSeries.map(seriesKey => {
                                        const seriesItem = seriesData[seriesKey];
                                        return (
                                            <th key={seriesKey} className="px-6 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider min-w-48">
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-2xl">{seriesItem.icone}</span>
                                                    <span>{seriesKey}</span>
                                                </div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {compareFields.map(({ category, fields }) => (
                                    <>
                                        <tr key={category} className="bg-slate-100 border-y border-slate-200">
                                            <td colSpan={selectedSeries.length + 1} className="px-6 py-3 font-semibold text-slate-800 text-sm uppercase tracking-wide">
                                                {category}
                                            </td>
                                        </tr>
                                        {fields.map(({ key, label }) => (
                                            <tr key={key} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-3 font-medium text-slate-700 text-sm bg-white sticky left-0 border-r border-slate-100">
                                                    {label}
                                                </td>
                                                {selectedSeries.map(seriesKey => {
                                                    const seriesItem = seriesData[seriesKey];
                                                    const value = seriesItem[key];
                                                    return (
                                                        <td key={seriesKey} className="px-6 py-3 text-center text-sm">
                                                            {renderValue(value)}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Call-to-Action para Catálogo de Placas */}
                <div className="my-16 bg-slate-800 border border-slate-700 p-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                Recursos Adicionais
                            </p>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Catálogo de Placas de Desenvolvimento
                            </h3>
                            <p className="text-base text-slate-300 leading-relaxed">
                                Acesse nossa base de placas de desenvolvimento verificadas com referências diretas para fornecedores oficiais.
                            </p>
                        </div>
                        <Link
                            href="/catalogo"
                            className="inline-flex items-center justify-center gap-3 bg-white text-slate-800 px-6 py-3 font-semibold text-sm hover:bg-slate-100 transition-colors duration-200 whitespace-nowrap border border-slate-200"
                        >
                            <span>Acessar Catálogo</span>
                            <svg 
                                className="w-4 h-4" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="mt-12">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6 border-l-4 border-slate-700 pl-4">
                        Documentação Técnica
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {selectedSeries.map(seriesKey => {
                            const seriesItem = seriesData[seriesKey];
                            return (
                                <div
                                    key={seriesKey}
                                    className="bg-white border border-slate-200 p-5 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl">{seriesItem.icone}</div>
                                        <div className="flex-1 min-w-0">
                                            <Link href={`/series/${seriesKey}`} className="no-underline">
                                                <h4 className="text-base font-semibold text-slate-900 mb-1">{seriesKey}</h4>
                                            </Link>
                                            <p className="text-xs text-slate-600 mb-3">Documentação oficial</p>
                                            <a
                                                href={seriesItem.datasheet}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-slate-900"
                                            >
                                                <span>Datasheet</span>
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
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