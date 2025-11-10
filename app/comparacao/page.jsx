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
            return <span className="text-red-500 font-semibold">✗</span>;
        }
        if (value === "Sim") {
            return <span className="text-green-500 font-semibold">✓</span>;
        }
        return <span className="text-gray-700">{value}</span>;
    };

    return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
            <Header />

            <main className="px-4 pt-16 pb-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block mb-6">
                        <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                            📊 Compare Séries
                        </div>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        Comparação de Séries
                    </h1>
                    
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Compare especificações técnicas entre diferentes séries ESP32 para escolher o ideal para seu projeto
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        Selecione as Séries (2-4)
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {series.map(([key, seriesItem]) => (
                            <button
                                key={key}
                                onClick={() => toggleSeries(key)}
                                className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                                    selectedSeries.includes(key)
                                        ? 'border-purple-500 shadow-lg bg-white'
                                        : 'border-gray-200 hover:border-gray-300 bg-white opacity-60'
                                }`}
                                style={{
                                    borderColor: selectedSeries.includes(key) ? seriesItem.cor : undefined
                                }}
                            >
                                <div className="text-4xl mb-2">{seriesItem.icone}</div>
                                <div className="text-sm font-semibold text-gray-800">{key}</div>
                                {selectedSeries.includes(key) && (
                                    <div className="mt-2">
                                        <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: seriesItem.cor }}></span>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        {selectedSeries.length} de 4 séries selecionadas
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-linear-to-r from-blue-600 to-purple-600">
                                    <th className="px-6 py-4 text-left text-white font-bold bg-linear-to-r from-blue-600 to-purple-600 z-10">
                                        Especificação
                                    </th>
                                    {selectedSeries.map(seriesKey => {
                                        const seriesItem = seriesData[seriesKey];
                                        return (
                                            <th key={seriesKey} className="px-6 py-4 text-center text-white font-bold min-w-[200px]">
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-3xl">{seriesItem.icone}</span>
                                                    <span>{seriesKey}</span>
                                                    <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: seriesItem.cor }}></span>
                                                </div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {compareFields.map(({ category, fields }) => (
                                    <>
                                        <tr key={category} className="bg-gray-100">
                                            <td colSpan={selectedSeries.length + 1} className="px-6 py-3 font-bold text-gray-800 bg-gray-100 z-10">
                                                {category}
                                            </td>
                                        </tr>
                                        {fields.map(({ key, label }) => (
                                            <tr key={key} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-700 bg-white z-10 border-r border-gray-200">
                                                    {label}
                                                </td>
                                                {selectedSeries.map(seriesKey => {
                                                    const seriesItem = seriesData[seriesKey];
                                                    const value = seriesItem[key];
                                                    return (
                                                        <td key={seriesKey} className="px-6 py-4 text-center">
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
                <div className="my-12 bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl p-8 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold mb-3 flex items-center gap-2">
                                🛒 Encontrou a série ideal?
                            </h3>
                            <p className="text-lg text-blue-100 leading-relaxed text-justify">
                                Confira nosso catálogo com placas de desenvolvimento verificadas das séries que você comparou.
                                Links diretos para lojas oficiais e confiáveis!
                            </p>
                        </div>
                        <Link
                            href="/catalogo"
                            className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
                        >
                            Ver Placas Disponíveis →
                        </Link>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {selectedSeries.map(seriesKey => {
                        const seriesItem = seriesData[seriesKey];
                        return (
                            <a
                                key={seriesKey}
                                href={seriesItem.datasheet}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2"
                                style={{ borderColor: seriesItem.cor }}
                            >
                                <div className="text-4xl mb-3">{seriesItem.icone}</div>
                                <Link href={`/series/${seriesKey}`} className="no-underline">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{seriesKey}</h3>
                                </Link>
                                <p className="text-sm text-gray-600">Datasheet Oficial</p>
                                <a
                                    className="flex items-center text-purple-600 font-semibold"
                                    href={seriesItem.datasheet}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>Abrir PDF</span>
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </a>
                        );
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
}