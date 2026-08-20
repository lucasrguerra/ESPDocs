import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
    title: "ESPDocs - Glossário Técnico",
    description: "Glossário técnico em português com termos e conceitos do ecossistema ESP32",
};

export default function Glossario() {
    const categorias = [
        {
            nome: "Processamento",
            icone: "🧠",
            cor: "blue",
            termos: [
                {
                    termo: "Arquitetura",
                    definicao: "Conjunto de instruções e design do processador. O ESP32 usa principalmente Xtensa (32-bit) ou RISC-V.",
                    exemplo: "ESP32 clássico usa Xtensa LX6, enquanto ESP32-C3 usa RISC-V.",
                },
                {
                    termo: "Núcleos (Cores)",
                    definicao: "Unidades de processamento independentes. Dual-core permite executar duas tarefas simultaneamente.",
                    exemplo: "ESP32 tem 2 núcleos (dual-core), ESP32-S2 tem 1 núcleo (single-core).",
                },
                {
                    termo: "Frequência (Clock)",
                    definicao: "Velocidade de processamento medida em MHz ou GHz. Quanto maior, mais rápido o processamento.",
                    exemplo: "ESP32 opera de 80 MHz até 240 MHz.",
                },
                {
                    termo: "ULP (Ultra Low Power) Coprocessador",
                    definicao: "Processador secundário de baixíssimo consumo que pode operar enquanto o processador principal está em deep sleep.",
                    exemplo: "Usado para ler sensores periodicamente sem despertar o CPU principal.",
                },
                {
                    termo: "Aceleradores de IA",
                    definicao: "Hardware dedicado para acelerar operações de inteligência artificial e redes neurais.",
                    exemplo: "ESP32-P4 possui Vector Extension para processamento de IA.",
                },
                {
                    termo: "Aceleradores Criptográficos",
                    definicao: "Blocos de hardware dedicados que executam algoritmos de criptografia muito mais rápido e com menor consumo do que a CPU. Praticamente toda série tem algum, mas o conjunto varia bastante, por isso vale olhar item por item.",
                    exemplo: "ESP32-C2 e ESP32-C61 não têm acelerador AES: só SHA e curvas elípticas.",
                },
                {
                    termo: "ECC (Criptografia de Curvas Elípticas)",
                    definicao: "Família de algoritmos de chave pública que atinge a mesma segurança do RSA com chaves muito menores, o que economiza memória e tempo em microcontrolador. As curvas usadas são identificadas por nome, como P-256.",
                    exemplo: "ESP32, ESP32-S2, ESP32-S3 e ESP32-C3 não têm ECC em hardware; ESP32-C5, P4, S31 e H4 chegam à curva P-384.",
                },
                {
                    termo: "ECDSA",
                    definicao: "Algoritmo de assinatura digital baseado em curvas elípticas. Ter o periférico ECDSA no silício significa assinar e verificar sem carregar a CPU. É o que o Matter exige para o atestado de dispositivo.",
                    exemplo: "Só ESP32-S31, C5, C61, P4, H2 e H4 têm ECDSA em hardware.",
                },
                {
                    termo: "Key Manager",
                    definicao: "Periférico que provisiona e usa chaves criptográficas sem que elas fiquem legíveis para o firmware. Mesmo que alguém extraia a imagem do firmware, a chave privada não está lá.",
                    exemplo: "Disponível apenas no ESP32-S31, ESP32-C5 e ESP32-P4.",
                },
                {
                    termo: "Secure Boot",
                    definicao: "Verificação da assinatura do firmware durante o boot: o chip se recusa a executar código que não tenha sido assinado pela sua chave. A versão V2 usa RSA-3072 ou ECDSA; a V1, do ESP32 original, é um esquema mais antigo.",
                    exemplo: "ESP32 tem apenas o Secure Boot V1; do ESP32-S2 em diante todos têm V2.",
                },
                {
                    termo: "Criptografia de Flash",
                    definicao: "Cifra o conteúdo da memória flash externa, impedindo que alguém leia o firmware soldando um gravador no chip de memória. O esquema atual usa XTS-AES.",
                    exemplo: "XTS-AES-128 na maioria das séries; ESP32-S2, S3, S31, C5, P4 e H4 também suportam XTS-AES-256.",
                },
                {
                    termo: "Assinatura Digital (DS)",
                    definicao: "Periférico que assina dados usando uma chave RSA guardada em eFuse de forma que o firmware nunca a enxerga. É o antecessor mais simples do Key Manager.",
                    exemplo: "Ausente no ESP32 original, no C2, no C61 e no H4.",
                },
                {
                    termo: "Proteção contra DPA",
                    definicao: "Defesa contra Differential Power Analysis, ataque que deduz a chave secreta medindo variações no consumo de energia do chip durante a operação criptográfica. Exige acesso físico ao dispositivo.",
                    exemplo: "Presente no ESP32-C5, C6, C61 e H2.",
                },
            ],
        },
        {
            nome: "Memória",
            icone: "💾",
            cor: "purple",
            termos: [
                {
                    termo: "SRAM (Static RAM)",
                    definicao: "Memória volátil rápida usada para armazenar variáveis e stack do programa durante execução. Perde dados ao desligar.",
                    exemplo: "ESP32 tem 520 KB de SRAM interna.",
                },
                {
                    termo: "ROM (Read-Only Memory)",
                    definicao: "Memória não-volátil com bootloader e funções básicas gravadas pela Espressif. Não pode ser alterada.",
                    exemplo: "ESP32 tem 448 KB de ROM com código de boot.",
                },
                {
                    termo: "Flash",
                    definicao: "Memória não-volátil externa onde o firmware é armazenado. Mantém dados mesmo sem energia.",
                    exemplo: "Placas comuns vêm com 4 MB ou 16 MB de Flash.",
                },
                {
                    termo: "PSRAM (Pseudo-Static RAM)",
                    definicao: "Memória RAM externa adicional para aplicações que precisam de mais memória (imagens, buffers grandes).",
                    exemplo: "ESP32-CAM usa PSRAM de 4 MB ou 8 MB para armazenar frames de câmera.",
                },
                {
                    termo: "RTC Memory",
                    definicao: "Pequena quantidade de SRAM que mantém dados durante deep sleep, alimentada pelo RTC.",
                    exemplo: "Usar RTC memory para guardar contador entre deep sleeps.",
                },
            ],
        },
        {
            nome: "Conectividade",
            icone: "📡",
            cor: "green",
            termos: [
                {
                    termo: "Wi-Fi",
                    definicao: "Comunicação sem fio padrão IEEE 802.11. ESP32 suporta 2.4 GHz (b/g/n), algumas séries suportam 5 GHz.",
                    exemplo: "Conectar ESP32 à rede doméstica para IoT.",
                },
                {
                    termo: "Bluetooth Classic",
                    definicao: "Protocolo Bluetooth para transmissão de áudio e dados. Maior consumo que BLE.",
                    exemplo: "Caixas de som Bluetooth, transmissão de áudio.",
                },
                {
                    termo: "BLE (Bluetooth Low Energy)",
                    definicao: "Versão de baixo consumo do Bluetooth, ideal para sensores e wearables.",
                    exemplo: "Rastreadores, sensores de temperatura, smartwatches.",
                },
                {
                    termo: "Zigbee",
                    definicao: "Protocolo de mesh network de baixo consumo para automação residencial (IEEE 802.15.4).",
                    exemplo: "Redes de sensores domésticos, lâmpadas inteligentes.",
                },
                {
                    termo: "Thread",
                    definicao: "Protocolo de mesh network baseado em IPv6 para dispositivos IoT.",
                    exemplo: "Smart home devices com Matter.",
                },
                {
                    termo: "Matter",
                    definicao: "Padrão universal de smart home que funciona sobre Thread ou Wi-Fi, compatível com Alexa, Google Home, Apple Home.",
                    exemplo: "Tomadas, lâmpadas e sensores compatíveis com todos os assistentes.",
                },
            ],
        },
        {
            nome: "Periféricos",
            icone: "🔌",
            cor: "orange",
            termos: [
                {
                    termo: "GPIO (General Purpose Input/Output)",
                    definicao: "Pinos configuráveis como entrada ou saída digital para conectar LEDs, botões, sensores.",
                    exemplo: "GPIO2 geralmente é usado para LED onboard.",
                },
                {
                    termo: "ADC (Analog-to-Digital Converter)",
                    definicao: "Converte sinais analógicos (0-3.3V) em valores digitais para leitura de sensores analógicos.",
                    exemplo: "Ler potenciômetro, sensor de luz LDR, tensão de bateria.",
                },
                {
                    termo: "DAC (Digital-to-Analog Converter)",
                    definicao: "Converte valores digitais em voltagem analógica (0-3.3V).",
                    exemplo: "Gerar ondas de áudio, controle analógico de motores.",
                },
                {
                    termo: "PWM (Pulse Width Modulation)",
                    definicao: "Técnica para simular saída analógica variando a largura de pulsos digitais. Controla brilho, velocidade, etc.",
                    exemplo: "Controlar brilho de LED, velocidade de motor DC.",
                },
                {
                    termo: "Touch Capacitivo",
                    definicao: "Sensores que detectam toque humano por mudança de capacitância, sem necessidade de botões físicos.",
                    exemplo: "Botões touch, sliders, controles sensíveis ao toque.",
                },
                {
                    termo: "UART (Universal Asynchronous Receiver/Transmitter)",
                    definicao: "Comunicação serial assíncrona para trocar dados com módulos GPS, sensores, debug serial.",
                    exemplo: "Monitor Serial da Arduino IDE usa UART.",
                },
                {
                    termo: "SPI (Serial Peripheral Interface)",
                    definicao: "Barramento serial síncrono de alta velocidade para displays, cartões SD, sensores.",
                    exemplo: "Display TFT, módulo SD Card, sensor BME280.",
                },
                {
                    termo: "I²C (Inter-Integrated Circuit)",
                    definicao: "Barramento serial de 2 fios para conectar múltiplos dispositivos com endereços únicos.",
                    exemplo: "Sensores BME280, displays OLED, RTC DS3231.",
                },
                {
                    termo: "I²S (Inter-IC Sound)",
                    definicao: "Interface para transmissão de áudio digital entre circuitos integrados.",
                    exemplo: "Módulos de áudio MAX98357, microfones MEMS.",
                },
            ],
        },
        {
            nome: "Interfaces Especiais",
            icone: "✨",
            cor: "pink",
            termos: [
                {
                    termo: "USB OTG (On-The-Go)",
                    definicao: "Permite que ESP32 funcione como dispositivo USB (teclado, mouse, pen drive) ou host USB.",
                    exemplo: "ESP32-S3 pode emular teclado USB ou ler pen drive.",
                },
                {
                    termo: "JTAG",
                    definicao: "Interface de debug e programação de baixo nível para desenvolvimento profissional.",
                    exemplo: "Debug passo-a-passo com ESP-Prog ou J-Link.",
                },
                {
                    termo: "SDIO (Secure Digital Input Output)",
                    definicao: "Interface para cartões SD em modo de 4 bits de alta velocidade.",
                    exemplo: "Gravar logs, armazenar fotos de câmera.",
                },
                {
                    termo: "Ethernet MAC",
                    definicao: "Controlador de rede Ethernet embutido. Requer PHY externo (chip LAN8720).",
                    exemplo: "ESP32 com conexão Ethernet cabeada para IoT industrial.",
                },
                {
                    termo: "Camera Interface",
                    definicao: "Interface paralela para conectar câmeras (geralmente OV2640, OV5640).",
                    exemplo: "ESP32-CAM, projetos de visão computacional.",
                },
                {
                    termo: "LCD Interface",
                    definicao: "Interface paralela RGB para displays LCD de alta resolução.",
                    exemplo: "ESP32-S3 com display TFT 480x320 RGB.",
                },
                {
                    termo: "MIPI CSI/DSI",
                    definicao: "Interfaces de alta velocidade para câmeras (CSI) e displays (DSI) em aplicações avançadas.",
                    exemplo: "ESP32-P4 com câmera MIPI de alta resolução.",
                },
            ],
        },
        {
            nome: "Gerenciamento de Energia",
            icone: "🔋",
            cor: "yellow",
            termos: [
                {
                    termo: "Active Mode",
                    definicao: "Modo de operação normal com CPU e periféricos funcionando. Maior consumo de energia.",
                    exemplo: "ESP32 processando dados Wi-Fi: ~160-260 mA.",
                },
                {
                    termo: "Modem Sleep",
                    definicao: "CPU ativo mas Wi-Fi/Bluetooth desligados quando não há transmissão. Economia moderada.",
                    exemplo: "Aplicações com comunicação intermitente.",
                },
                {
                    termo: "Light Sleep",
                    definicao: "CPU pausado mas RAM e RTC mantidos. Acorda rapidamente por timer ou GPIO.",
                    exemplo: "Sensor que verifica dados a cada 1 segundo: ~0.8 mA.",
                },
                {
                    termo: "Deep Sleep",
                    definicao: "Tudo desligado exceto RTC e ULP. Consumo ultra baixo (~10 μA). Perde variáveis da RAM.",
                    exemplo: "Sensor que envia dados a cada 1 hora e dorme entre envios.",
                },
                {
                    termo: "Hibernation",
                    definicao: "Modo mais profundo que deep sleep, desliga até RTC. Apenas timer ou reset externo acordam.",
                    exemplo: "Dispositivo sazonal que acorda 1x por dia: ~5 μA.",
                },
                {
                    termo: "Brownout Detector",
                    definicao: "Circuito que reseta o ESP32 se a tensão cair abaixo de nível seguro (~2.8V) para evitar corrupção.",
                    exemplo: "Proteção contra queda de tensão da fonte/bateria.",
                },
            ],
        },
        {
            nome: "Boot e Programação",
            icone: "🚀",
            cor: "red",
            termos: [
                {
                    termo: "Bootloader",
                    definicao: "Programa na ROM que inicia ao ligar e carrega o firmware da Flash para execução.",
                    exemplo: "Primeiro código que roda ao dar power-on no ESP32.",
                },
                {
                    termo: "Strapping Pins",
                    definicao: "GPIOs lidos durante boot para definir modo de operação (flash, boot normal, etc). Cuidado ao usar!",
                    exemplo: "GPIO0=LOW entra em modo flash. GPIO2, GPIO12, GPIO15 também são strapping pins.",
                },
                {
                    termo: "Flash Mode",
                    definicao: "Modo especial onde ESP32 aguarda upload de firmware via UART. Ativado por GPIO0=LOW + Reset.",
                    exemplo: "Pressionar botão BOOT durante upload na Arduino IDE.",
                },
                {
                    termo: "OTA (Over-The-Air)",
                    definicao: "Atualização de firmware sem fio via Wi-Fi, sem necessidade de cabo USB.",
                    exemplo: "Atualizar firmware de dispositivo instalado no teto.",
                },
                {
                    termo: "Partições",
                    definicao: "Divisões da Flash para armazenar bootloader, app, OTA, SPIFFS, NVS.",
                    exemplo: "Partição de 3 MB para app, 1 MB para SPIFFS (sistema de arquivos).",
                },
                {
                    termo: "NVS (Non-Volatile Storage)",
                    definicao: "Área da Flash para armazenar configurações persistentes em formato chave-valor.",
                    exemplo: "Salvar SSID e senha do Wi-Fi para reconectar após reboot.",
                },
                {
                    termo: "SPIFFS / LittleFS",
                    definicao: "Sistemas de arquivos para Flash, permitem armazenar arquivos (HTML, configs, logs).",
                    exemplo: "Armazenar páginas HTML de servidor web no ESP32.",
                },
            ],
        },
        {
            nome: "Conceitos de Hardware",
            icone: "⚙️",
            cor: "gray",
            termos: [
                {
                    termo: "Module vs Chip",
                    definicao: "Chip é o processador ESP32 puro. Module inclui chip + Flash + antena em PCB certificado (ESP32-WROOM-32).",
                    exemplo: "Comprar módulo WROOM é mais fácil que soldar chip ESP32 bruto.",
                },
                {
                    termo: "DevKit / Development Board",
                    definicao: "Placa com módulo ESP32 + conversor USB-Serial + regulador de tensão + pinos expostos para prototipagem.",
                    exemplo: "ESP32-DevKitC, NodeMCU-32S.",
                },
                {
                    termo: "Pinout",
                    definicao: "Diagrama mostrando função de cada pino físico do chip/módulo.",
                    exemplo: "Ver pinout para saber qual GPIO suporta ADC.",
                },
                {
                    termo: "Pull-up / Pull-down",
                    definicao: "Resistores internos que mantém GPIO em nível HIGH (pull-up) ou LOW (pull-down) quando não conectado.",
                    exemplo: "GPIO com pull-up para botão que conecta ao GND.",
                },
                {
                    termo: "Input-Only GPIO",
                    definicao: "Alguns GPIOs (34-39 no ESP32 clássico) só funcionam como entrada, não como saída.",
                    exemplo: "GPIO36 (VP) pode ler ADC mas não controlar LED.",
                },
                {
                    termo: "Certificação (FCC/CE)",
                    definicao: "Aprovação regulatória para vender produtos com rádio. Módulos pré-certificados simplificam o processo.",
                    exemplo: "Usar ESP32-WROOM-32 (certificado) facilita venda comercial.",
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-purple-50 to-pink-50">
            <Header />

            <main id="conteudo" className="px-4 pt-16 pb-20 max-w-7xl mx-auto">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-purple-200 shadow-sm">
                        <span className="text-xl">📖</span>
                        <span className="text-sm font-semibold text-gray-700">Aprenda os Conceitos</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 leading-tight tracking-tight">
                        Glossário Técnico
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Entenda termos e conceitos do ecossistema ESP32 explicados em português,
                        do básico ao avançado.
                    </p>
                </section>

                {/* Navegação Rápida */}
                <section className="mb-12">
                    <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            Navegação Rápida
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {categorias.map((cat) => (
                                <a
                                    key={cat.nome}
                                    href={`#${cat.nome.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-linear-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-purple-300 hover:shadow-md transition-all"
                                >
                                    <span className="text-4xl">{cat.icone}</span>
                                    <span className="text-sm font-bold text-gray-800 text-center">
                                        {cat.nome}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Categorias de Termos */}
                <div className="space-y-12">
                    {categorias.map((categoria) => (
                        <section
                            key={categoria.nome}
                            id={categoria.nome.toLowerCase().replace(/\s+/g, '-')}
                            className="scroll-mt-20"
                        >
                            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">
                                {/* Header da Categoria */}
                                <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-gray-100">
                                    <div className={`w-16 h-16 bg-linear-to-br from-${categoria.cor}-500 to-${categoria.cor}-600 rounded-2xl flex items-center justify-center shadow-lg`}>
                                        <span className="text-3xl">{categoria.icone}</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-gray-900">
                                        {categoria.nome}
                                    </h2>
                                </div>

                                {/* Lista de Termos */}
                                <div className="space-y-6">
                                    {categoria.termos.map((item, idx) => (
                                        <article
                                            key={idx}
                                            className="bg-linear-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-100 hover:border-purple-200 transition-colors"
                                        >
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                {item.termo}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed mb-4">
                                                {item.definicao}
                                            </p>
                                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                                                <div className="flex items-start gap-2">
                                                    <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">
                                                        💡 Exemplo:
                                                    </span>
                                                    <p className="text-blue-900 text-sm leading-relaxed">
                                                        {item.exemplo}
                                                    </p>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </section>
                    ))}
                </div>

                {/* Call to Action */}
                <section className="mt-16 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-10 text-white border-2 border-purple-400">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/30">
                            <span className="text-xl">🎯</span>
                            <span className="text-sm font-semibold">Próximo Passo</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black mb-4">
                            Pronto para Explorar?
                        </h3>
                        <p className="text-lg text-white/90 leading-relaxed mb-8">
                            Agora que você conhece os conceitos, explore as séries ESP32 e compare
                            especificações para encontrar a ideal para seu projeto.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/series"
                                className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <span className="text-xl">⚡</span>
                                <span>Ver Séries ESP32</span>
                                <svg 
                                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>

                            <Link
                                href="/frameworks"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 group"
                            >
                                <span className="text-xl">🛠️</span>
                                <span>Ver Frameworks</span>
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
                </section>
            </main>

            <Footer />
        </div>
    );
}