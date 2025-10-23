import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import seriesData from "@/public/series.json";
import ConnectionsDiagram from "@/components/ConnectionsDiagram";
import SeriesTabMenu from "@/components/SeriesTabMenu";

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
        { label: "Arquitetura", value: serie.arquitetura, icon: "🔧" },
        { label: "Núcleos", value: serie.nucleos, icon: "⚙️" },
        { label: "Frequência", value: serie.frequencia, icon: "🚀" },
        { label: "Coprocessador ULP", value: serie.coprocessador_ulp || "Não", icon: "💤" },
        { label: "Aceleradores IA", value: serie.aceleradores_ia || "Não", icon: "🤖" },
    ];

    const conectividadeSpecs = [
        { label: "Wi-Fi", value: serie.wifi || "Não", icon: "📶" },
        { label: "Bluetooth", value: serie.bluetooth || "Não", icon: "📱" },
        { label: "Zigbee/Thread", value: serie.zigbee_thread || "Não", icon: "🌐" },
        { label: "Matter", value: serie.matter || "Não", icon: "🏠" },
        { label: "Ethernet", value: serie.ethernet || serie.ethernet_mac || "Não", icon: "🔌" },
        { label: "CAN", value: serie.can || "Não", icon: "🚗" },
    ];

    const memoriaSpecs = [
        { label: "SRAM", value: serie.memoria_sram, icon: "💾" },
        { label: "SRAM RTC", value: serie.memoria_sram_rtc, icon: "⏰" },
        { label: "ROM", value: serie.memoria_rom, icon: "📀" },
        { label: "Flash Externa", value: serie.flash_externa, icon: "💿" },
        { label: "PSRAM Externa", value: serie.psram_externa || "Não", icon: "🎯" },
    ];

    const perifericos = [
        { label: "GPIO", value: serie.gpio, icon: "📍" },
        { label: "ADC", value: serie.adc, icon: "📊" },
        { label: "DAC", value: serie.dac || "Não", icon: "🔊" },
        { label: "Touch", value: serie.touch || "Não", icon: "👆" },
        { label: "UART", value: serie.uart, icon: "💬" },
        { label: "SPI", value: serie.spi, icon: "🔄" },
        { label: "I2C", value: serie.i2c, icon: "🔗" },
        { label: "I2S", value: serie.i2s, icon: "🎵" },
        { label: "PWM", value: serie.pwm, icon: "〰️" },
        { label: "USB", value: serie.usb || "Não", icon: "🔌" },
    ];

    const interfacesEspeciais = [];
    if (serie.lcd) interfacesEspeciais.push({ label: "LCD", value: serie.lcd, icon: "🖥️" });
    if (serie.camera) interfacesEspeciais.push({ label: "Camera", value: serie.camera, icon: "📷" });
    if (serie.mipi_csi) interfacesEspeciais.push({ label: "MIPI CSI", value: serie.mipi_csi, icon: "📹" });
    if (serie.mipi_dsi) interfacesEspeciais.push({ label: "MIPI DSI", value: serie.mipi_dsi, icon: "🖼️" });
    if (serie.sdio) interfacesEspeciais.push({ label: "SDIO", value: serie.sdio, icon: "💳" });
    if (serie.sensor_hall) interfacesEspeciais.push({ label: "Sensor Hall", value: serie.sensor_hall, icon: "🧲" });
    if (serie.sensor_temperatura) interfacesEspeciais.push({ label: "Sensor Temperatura", value: serie.sensor_temperatura, icon: "🌡️" });

    const tabs = [
        {
            id: 'connections',
            label: 'Diagrama de Conexões',
            available: conexoes.length > 0,
            content: (
                <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">
                    <ConnectionsDiagram connections={conexoes} color={serie.cor} />
                </div>
            )
        },
        {
            id: 'devboard',
            label: 'Placa de Desenvolvimento',
            available: serie.placa,
            content: (
                <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 flex items-center gap-3" style={{ borderColor: serie.cor }}>
                        <span>🔧</span>
                        Placa de Desenvolvimento Oficial
                    </h2>
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-4xl">
                            <Image
                                src={serie.placa}
                                alt={`${key} DevKit - Placa de Desenvolvimento`}
                                width={1200}
                                height={800}
                                className="rounded-xl shadow-lg w-full h-auto"
                                priority
                            />
                            <p className="text-center text-sm text-gray-600 mt-4">
                                {key} - Placa de desenvolvimento oficial da Espressif
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'specs',
            label: 'Especificações',
            available: true,
            content: (
                <div className="space-y-6">
                    <SpecSection title="⚙️ Processador" specs={processadorSpecs} cor={serie.cor} />
                    <SpecSection title="📡 Conectividade" specs={conectividadeSpecs} cor={serie.cor} />
                    <SpecSection title="💾 Memória" specs={memoriaSpecs} cor={serie.cor} />
                    <SpecSection title="🔌 Periféricos" specs={perifericos} cor={serie.cor} />
                    {interfacesEspeciais.length > 0 && (
                        <SpecSection title="✨ Interfaces Especiais" specs={interfacesEspeciais} cor={serie.cor} />
                    )}
                    <SpecSection
                        title="🌡️ Temperatura"
                        specs={[
                            { label: "Operação", value: serie.temperatura_operacao, icon: "🔧" },
                            { label: "Armazenamento", value: serie.temperatura_armazenamento, icon: "📦" },
                        ]}
                        cor={serie.cor}
                    />
                </div>
            )
        }
    ];

    return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
            <Header />

            <main className="px-4 pt-16 pb-8 max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link href="/series" className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors mb-4">
                        <span className="mr-2">←</span> Voltar para Séries
                    </Link>
                    
                    <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100"
                        style={{ borderColor: serie.cor + '30' }}>
                        <div className="flex items-start justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <span className="text-6xl">{serie.icone}</span>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
                                        {key}
                                    </h1>
                                    <p className="text-xl text-gray-600 mb-2">{serie.nome_completo}</p>
                                    <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white"
                                        style={{ backgroundColor: serie.cor }}>
                                        {serie.arquitetura}
                                    </span>
                                </div>
                            </div>
                            
                            <a
                                href={serie.datasheet}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                📄 Datasheet Oficial
                            </a>
                        </div>
                        
                        <p className="text-lg text-gray-700 mt-6 leading-relaxed">
                            {serie.descricao}
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4" style={{ borderColor: serie.cor }}>
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">PROCESSADOR</h3>
                        <p className="text-3xl font-bold text-gray-800">{serie.nucleos.includes("2") ? "Dual-Core" : "Single-Core"}</p>
                        <p className="text-gray-600 mt-1">{serie.frequencia}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4" style={{ borderColor: serie.cor }}>
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">MEMÓRIA SRAM</h3>
                        <p className="text-3xl font-bold text-gray-800">{serie.memoria_sram}</p>
                        <p className="text-gray-600 mt-1">+ {serie.memoria_sram_rtc} RTC</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4" style={{ borderColor: serie.cor }}>
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">GPIO</h3>
                        <p className="text-3xl font-bold text-gray-800">{serie.gpio}</p>
                        <p className="text-gray-600 mt-1">Pinos disponíveis</p>
                    </div>
                </div>

                <SeriesTabMenu tabs={tabs} color={serie.cor} />

                <div className="grid sm:flex sm:justify-between items-center gap-4 mt-12">
                    {previousKey ? (
                        <Link
                            href={`/series/${previousKey}`}
                            className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-x-1 transition-all duration-300 border-2 border-gray-100 hover:border-purple-300"
                        >
                            <span>←</span>
                            <div className="text-left">
                                <p className="text-xs text-gray-600">Anterior</p>
                                <p className="font-semibold text-gray-800">{previousKey}</p>
                            </div>
                        </Link>
                    ) : (
                        <div />
                    )}
                    
                    <Link
                        href="/comparacao"
                        className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        📊 Comparar Séries
                    </Link>
                    
                    {nextKey ? (
                        <Link
                            href={`/series/${nextKey}`}
                            className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:translate-x-1 transition-all duration-300 border-2 border-gray-100 hover:border-purple-300"
                        >
                            <div className="text-right">
                                <p className="text-xs text-gray-600">Próximo</p>
                                <p className="font-semibold text-gray-800">{nextKey}</p>
                            </div>
                            <span>→</span>
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

function SpecSection({ title, specs, cor }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-3 border-b-2" style={{ borderColor: cor }}>
                {title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {specs.map((spec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-2xl">{spec.icon}</span>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-600">{spec.label}</p>
                            <p className="text-base font-bold text-gray-800 mt-1">{spec.value}</p>
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