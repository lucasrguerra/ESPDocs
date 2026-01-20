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
                icon: "🔋"
            });
        });
    }

    const tabs = [
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
            id: 'connections',
            label: 'Diagrama de Conexões',
            available: conexoes.length > 0,
            content: (
                <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-lg">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">⚠️</span>
                            <div>
                                <h4 className="font-bold text-amber-900 mb-1">Diagrama do SoC (System on Chip)</h4>
                                <p className="text-amber-800 text-sm leading-relaxed">
                                    Este diagrama mostra as conexões e periféricos do chip <strong>{key}</strong> (SoC), 
                                    não da placa de desenvolvimento completa. As placas de desenvolvimento podem ter 
                                    configurações diferentes de pinos expostos e componentes adicionais.
                                </p>
                            </div>
                        </div>
                    </div>

                    <ConnectionsDiagram connections={conexoes} serie={serie} />

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 mt-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Sobre a Matriz de Conexões Flexível
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            O ESP32 possui uma matriz de conexões flexível que permite mapear diversas funções para múltiplos pinos.
                            Isso significa que muitas conexões podem ser configuradas para desempenhar diferentes papéis, dependendo das necessidades do seu projeto.
                            Consulte a documentação oficial para entender como aproveitar ao máximo as GPIOs&nbsp;
                            <a href={`https://docs.espressif.com/projects/esp-idf/en/latest/${String(key).toLowerCase().replace("-", "")}/api-reference/peripherals/gpio.html`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                nesse link.
                            </a>
                        </p>
                    </div>
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
                            
                           <div className="grid gap-3 mx-auto md:mx-0">
                                <a
                                    href={serie.datasheet}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    📄 Datasheet Oficial
                                </a>

                               <a
                                    href={serie.guia_de_programacao}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    💻 Guia de Programação
                                </a>
                                
                                {serie.manual_tecnico && <a
                                    href={serie.manual_tecnico}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    📖 Manual Técnico
                                </a>}
                            </div>
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

                <div className="space-y-6">
                    <SpecSection title="⚙️ Processador" specs={processadorSpecs} cor={serie.cor} />
                    <SpecSection title="📡 Conectividade" specs={conectividadeSpecs} cor={serie.cor} />
                    <SpecSection title="💾 Memória" specs={memoriaSpecs} cor={serie.cor} />
                    {consumoEnergia.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-3 border-b-2 flex items-center gap-3" style={{ borderColor: serie.cor }}>
                                <span>🔋</span>
                                Consumo de Energia
                            </h2>
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">💡</span>
                                    <div>
                                        <p className="text-blue-900 text-sm leading-relaxed">
                                            <strong>Valores típicos @3.3V, 25°C.</strong> O consumo real varia com clock, estado de RF (Wi-Fi/Bluetooth ligado/desligado) e configurações.
                                            Para precisão, consulte o datasheet oficial.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {consumoEnergia.map((spec, index) => (
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
                    )}
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

                {/* Call-to-Action para Catálogo de Placas */}
                <div className="my-16 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-10 text-white border-2 border-purple-400">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/30">
                                <span className="text-xl">🎯</span>
                                <span className="text-sm font-semibold">Próximo Passo</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black mb-4">
                                Pronto para começar?
                            </h3>
                            <p className="text-lg text-white/90 leading-relaxed">
                                Encontre placas de desenvolvimento {key} verificadas no nosso catálogo.
                                Links diretos para lojas oficiais e confiáveis com os melhores preços!
                            </p>
                        </div>
                        <Link
                            href="/catalogo"
                            className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap group"
                        >
                            <span className="text-xl">🛒</span>
                            <span>Ver Placas Disponíveis</span>
                            <svg 
                                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="grid sm:flex sm:justify-between items-center gap-4 mt-12 md:mx-8">
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
                    ) : null}

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
                    ) : null}
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