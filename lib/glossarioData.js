/**
 * Base de dados estruturada e abrangente de termos técnicos do Glossário ESP32.
 * Abrange todas as séries de chips da Espressif (ESP32, S2, S3, S31, C2, C3, C5, C6, C61, H2, H4, P4)
 * e seus recursos de hardware, periféricos, rádio, segurança e software.
 */

export const categoriasGlossario = [
	{
		id: "processamento",
		nome: "Processamento, CPU & Silício",
		icone: "Cpu",
		emoji: "🧠",
		cor: "blue",
		descricao: "Arquiteturas Xtensa e RISC-V, núcleos, coprocessadores ULP, aceleradores vetoriais de IA e unidades de ponto flutuante.",
		termos: [
			{
				termo: "Arquitetura Xtensa vs RISC-V",
				definicao: "Conjunto de instruções base do processador. O ESP32 clássico, S2 e S3 usam núcleos proprietários Tensilica Xtensa (LX6/LX7). As séries modernas C (C2, C3, C5, C6, C61), H (H2, H4) e P (P4) adotam a arquitetura aberta, modular e eficiente RISC-V (32-bit).",
				exemplo: "ESP32-S3 usa Xtensa LX7 dual-core, enquanto ESP32-C6 usa RISC-V single-core e ESP32-P4 usa RISC-V dual-core a 400 MHz.",
			},
			{
				termo: "Núcleos de CPU (Dual-Core vs Single-Core)",
				definicao: "Unidades centrais de processamento independentes. Chips dual-core permitem dedicar um núcleo (Core 0) exclusivamente ao rádio Wi-Fi/Bluetooth e escalonamento do FreeRTOS, deixando o segundo núcleo (Core 1) 100% livre para a aplicação e cálculos do usuário.",
				exemplo: "ESP32, ESP32-S3 e ESP32-P4 são dual-core; ESP32-S2, C2, C3, C6 e H2 são single-core.",
			},
			{
				termo: "Frequência de Clock (MHz)",
				definicao: "Velocidade de processamento medida em Megahertz (MHz). O ESP-IDF ajusta dinamicamente a frequência (Dynamic Frequency Scaling - DFS) para economizar energia em momentos ociosos.",
				exemplo: "O ESP32-C2 opera a até 120 MHz; ESP32, S2, S3 e C6 chegam a 160/240 MHz; e o ESP32-P4 atinge 400 MHz.",
			},
			{
				termo: "ULP (Ultra Low Power Coprocessor)",
				definicao: "Processador secundário independente de consumo ultra baixo que continua rodando instruções, lendo sensores analógicos (ADC), I2C e pinos GPIO enquanto os núcleos principais permanecem desligados em Deep Sleep.",
				exemplo: "O ESP32 original tem ULP FSM; ESP32-S2, S3 e C6 possuem ULP RISC-V programável em C; ESP32-P4 possui ULP de baixa potência dedicado.",
			},
			{
				termo: "Extensões Vetoriais de IA (Vector Extension / ESP-NN)",
				definicao: "Instruções especializadas de silício que executam operações matemáticas vetoriais e matriciais com inteiros (int8/int16) em paralelo, acelerando redes neurais convolucionais (CNNs) e processamento de sinal.",
				exemplo: "ESP32-S3 e ESP32-P4 aceleram inferências de reconhecimento facial, detecção de voz e modelos TensorFlow Lite for Microcontrollers.",
			},
			{
				termo: "FPU (Floating Point Unit)",
				definicao: "Unidade de processamento de ponto flutuante por hardware que realiza somas, multiplicações e divisões com números decimais (`float`) em um único ciclo de clock, sem sobrecarga de software.",
				exemplo: "Presente nos núcleos Xtensa do ESP32 e ESP32-S3, e nos núcleos RISC-V de alto desempenho do ESP32-P4.",
			},
			{
				termo: "PPA (Pixel Processing Accelerator)",
				definicao: "Acelerador gráfico 2D por hardware exclusivo do ESP32-P4 para manipulação acelerada de imagens: rotação de frames, redimensionamento (scaling), mistura de canais alfa (alpha blending) e conversão de cores (RGB565, ARGB8888, YUV420).",
				exemplo: "Renderização de interfaces gráficas complexas (LVGL) a 60 FPS sem ocupar tempo dos núcleos de CPU principais.",
			},
		],
	},
	{
		id: "seguranca",
		nome: "Segurança, Criptografia & eFuses",
		icone: "ShieldCheck",
		emoji: "🔒",
		cor: "red",
		descricao: "eFuses invioláveis, Secure Boot V2, Criptografia de Flash XTS-AES, Key Manager, ECC e proteção contra DPA.",
		termos: [
			{
				termo: "eFuse (Electronic Fuses)",
				definicao: "Conjunto de fusíveis microscópicos de silício de gravação única e irreversível (One-Time Programmable - OTP). Armazenam chaves secretas de criptografia, o endereço MAC de fábrica e bloqueiam interfaces de debug em produtos comerciais.",
				exemplo: "Usado com a ferramenta `espefuse.py` para gravar chaves de Secure Boot e desativar portas JTAG antes do envio ao consumidor.",
			},
			{
				termo: "Secure Boot (V1 e V2)",
				definicao: "Protocolo de inicialização segura em que o código da ROM verifica criptograficamente a assinatura RSA-3072 ou ECDSA do bootloader e firmware antes de permitir sua execução, impedindo injeção de código adulterado.",
				exemplo: "ESP32 clássico usa Secure Boot V1; do ESP32-S2 em diante todos adotam o Secure Boot V2 com múltiplas chaves de assinatura.",
			},
			{
				termo: "Criptografia de Flash (Flash Encryption)",
				definicao: "Mecanismo de hardware que cifra e decifra em tempo real o conteúdo da memória Flash SPI externa usando o algoritmo XTS-AES. Impede a leitura física do firmware caso a placa seja roubada ou a memória dessoldada.",
				exemplo: "XTS-AES-128 na maioria dos chips; ESP32-S3, C5, P4 e H4 também suportam XTS-AES-256.",
			},
			{
				termo: "Key Manager",
				definicao: "Módulo de segurança avançado que provisiona, armazena e opera chaves criptográficas em silício sem nunca expô-las à memória SRAM ou ao firmware, impedindo extração de chaves mesmo sob vulnerabilidades de software.",
				exemplo: "Presente nas séries de alta segurança como ESP32-S31, ESP32-C5 e ESP32-P4.",
			},
			{
				termo: "ECC & ECDSA em Hardware",
				definicao: "Aceleradores de curvas elípticas (como P-256 e P-384) e algoritmos de assinatura digital ECDSA em silício, fundamentais para conexão rápida e segura com a nuvem e requisitos de atestação do padrão Matter.",
				exemplo: "ESP32-S31, C5, C61, P4, H2 e H4 possuem acelerador de hardware para ECDSA.",
			},
			{
				termo: "HMAC & Assinatura Digital (DS)",
				definicao: "Periféricos de autenticação criptográfica que calculam códigos HMAC e assinam mensagens com chaves secretas gravadas em eFuses de forma invisível para o firmware.",
				exemplo: "Permite autenticação segura e rápida com AWS IoT Core e Microsoft Azure IoT sem armazenar certificados em texto plano.",
			},
			{
				termo: "TRNG (True Random Number Generator)",
				definicao: "Gerador de números aleatórios verdadeiros baseado no ruído térmico analógico dos circuitos de rádio e silício, essencial para geração de chaves de sessão em handshakes TLS/HTTPS.",
				exemplo: "Disponível em todas as séries do ESP32 para garantir entropia segura em conexões HTTPS/MbedTLS.",
			},
			{
				termo: "Proteção contra DPA (Differential Power Analysis)",
				definicao: "Mecanismo físico de hardware que adiciona ruído e balanceamento no consumo de corrente elétrica do chip para impedir que invasores descubram chaves criptográficas medindo o consumo com osciloscópios.",
				exemplo: "Presente nas séries ESP32-C5, C6, C61 e H2.",
			},
		],
	},
	{
		id: "memoria",
		nome: "Memória, Barramentos & Armazenamento",
		icone: "Database",
		emoji: "💾",
		cor: "purple",
		descricao: "SRAM interna, ROM de boot, memórias Flash SPI, PSRAM QSPI/Octal, RTC Memory e alocações de DMA.",
		termos: [
			{
				termo: "SRAM Interna",
				definicao: "Memória volátil ultrarrápida integrada diretamente no silício da CPU. Utilizada para variáveis do programa, estruturas do FreeRTOS, buffers de drivers e pilha de execução. Perde os dados ao desligar a alimentação.",
				exemplo: "O ESP32 clássico possui 520 KB de SRAM; ESP32-S3 tem 512 KB; ESP32-C3 tem 400 KB; ESP32-C6 tem 512 KB; ESP32-P4 tem 768 KB.",
			},
			{
				termo: "ROM de Boot",
				definicao: "Memória somente-leitura gravada permanentemente na fábrica da Espressif contendo o First-Stage Bootloader, tabelas matemáticas e rotinas básicas de inicialização que nunca podem ser alteradas.",
				exemplo: "Ao ligar, a ROM executa primeiro, verifica os Strapping Pins e carrega o bootloader do usuário da Flash.",
			},
			{
				termo: "Flash SPI (Quad-SPI vs Octal-SPI)",
				definicao: "Memória não-volátil externa onde reside o firmware da aplicação. Conectada via 4 vias (Quad SPI / QSPI) ou 8 vias de dados (Octal SPI / OPI / OSPI) com o dobro de largura de banda e taxas de transferência.",
				exemplo: "ESP32-S3 e ESP32-P4 suportam memórias Flash e PSRAM em modo Octal SPI de até 120 MHz para máxima velocidade de carregamento de texturas e código.",
			},
			{
				termo: "PSRAM (Pseudo-Static RAM Externa)",
				definicao: "Memória RAM externa de alta densidade conectada via SPI/QSPI/OPI que estende a memória do microcontrolador em até dezenas de Megabytes para aplicações que demandam buffers gigantescos.",
				exemplo: "ESP32-WROVER e ESP32-S3-WROOM-1 com 8 MB de PSRAM externa para decodificação JPEG de câmeras e buffers gráficos de displays TFT.",
			},
			{
				termo: "RTC Fast & Slow SRAM",
				definicao: "Blocos de memória SRAM dedicados ao domínio de energia do Real-Time Clock (RTC). Permanecem alimentados durante o modo Deep Sleep para armazenar código do ULP e variáveis marcadas com `RTC_DATA_ATTR`.",
				exemplo: "Manter contadores de leituras ou dados de calibração intactos enquanto o ESP32 dorme em Deep Sleep consumindo 10 µA.",
			},
			{
				termo: "Alocação DMA (MALLOC_CAP_DMA)",
				definicao: "Memória compatível com Direct Memory Access (DMA), permitindo que periféricos (SPI, I2S, LCD, SDMMC) transfiram dados diretamente para a RAM sem consumir tempo da CPU.",
				exemplo: "Na maioria dos chips ESP32, o DMA exige alocação exclusiva na SRAM interna através da flag `MALLOC_CAP_DMA | MALLOC_CAP_INTERNAL`.",
			},
			{
				termo: "Fragmentação de Heap",
				definicao: "Fenômeno em que a memória dinâmica fica dividida em blocos pequenos dispersos após múltiplas alocações e desalocações (muito comum ao usar objetos `String` do Arduino), impedindo alocações contíguas grandes para TLS/Wi-Fi.",
				exemplo: "Monitorado no ESP-IDF através de `heap_caps_get_largest_free_block()` para prevenir falhas de conexão HTTPS.",
			},
		],
	},
	{
		id: "conectividade",
		nome: "Conectividade Sem Fio & Protocolos",
		icone: "Wifi",
		emoji: "📡",
		cor: "emerald",
		descricao: "Wi-Fi 4/6, Dual-Band 5 GHz, OFDMA, TWT, Bluetooth Classic, BLE 5.x, LE Audio, Zigbee 3.0, Thread e Matter.",
		termos: [
			{
				termo: "Wi-Fi 6 (802.11ax)",
				definicao: "Padrão moderno de rede sem fio que traz suporte a OFDMA (comunicação paralela com menor latência), modulação 1024-QAM e o recurso TWT (Target Wake Time) para economizar drasticamente a bateria de sensores IoT.",
				exemplo: "Presente no ESP32-C6, ESP32-C61 e ESP32-C5.",
			},
			{
				termo: "Wi-Fi Dual-Band (2.4 GHz e 5 GHz)",
				definicao: "Capacidade de operar tanto na faixa tradicional de 2.4 GHz quanto na faixa de 5 GHz com menor congestionamento eletromagnético, canais de 20 MHz / 40 MHz e maior estabilidade de conexão.",
				exemplo: "O ESP32-C5 é o primeiro chip da Espressif com rádio Wi-Fi 6 Dual-Band integrado.",
			},
			{
				termo: "OFDMA (Orthogonal Frequency Division Multiple Access)",
				definicao: "Tecnologia do Wi-Fi 6 que divide um único canal de rádio em dezenas de subportadoras menores (Resource Units), permitindo que o roteador atenda múltiplos dispositivos ESP32 simultaneamente sem colisões.",
				exemplo: "Reduz a latência de resposta em ambientes residenciais ou industriais densos com dezenas de nós conectados.",
			},
			{
				termo: "TWT (Target Wake Time)",
				definicao: "Protocolo do Wi-Fi 6 onde o ESP32 e o roteador combinam horários exatos para troca de pacotes, permitindo que o microcontrolador mantenha seu rádio totalmente desligado por longos períodos sem se desconectar da rede.",
				exemplo: "Sensores alimentados por bateria com ESP32-C6 operando por anos conectados ao Wi-Fi 6 sem perder sincronismo.",
			},
			{
				termo: "Bluetooth Classic (BR/EDR)",
				definicao: "Protocolo Bluetooth tradicional para transmissão contínua de áudio estéreo (A2DP), portas seriais virtuais (SPP) e dispositivos que exigem alta taxa de transferência sustentada.",
				exemplo: "Implementação de caixas de som Bluetooth, receptores de áudio e teclados HID no ESP32 clássico.",
			},
			{
				termo: "Bluetooth Low Energy (BLE 5.0 a 5.4)",
				definicao: "Versão de baixo consumo elétrico do Bluetooth com suporte a taxas de 2 Mbps (2M PHY), longo alcance de centenas de metros (Coded PHY / Long Range), extensões de publicidade e redes mesh Bluetooth.",
				exemplo: "ESP32-S3 suporta BLE 5.0; ESP32-C6 e ESP32-H2 suportam Bluetooth 5.4 LE.",
			},
			{
				termo: "Bluetooth LE Audio & Auracast",
				definicao: "Nova geração de áudio Bluetooth de alta fidelidade e baixíssimo consumo com o codec LC3 e suporte a transmissões de áudio para múltiplos ouvintes simultâneos (Broadcast Audio / Auracast).",
				exemplo: "Disponível na série ESP32-H4 para novos ecossistemas de áudio e fones inteligentes.",
			},
			{
				termo: "IEEE 802.15.4 (Zigbee 3.0 & Thread)",
				definicao: "Padrão de rádio em 2.4 GHz de baixo consumo e baixa taxa de dados que forma a base física das redes em malha (Mesh) industriais e residenciais Zigbee 3.0 e Thread 1.3.",
				exemplo: "ESP32-C6, ESP32-H2 e ESP32-H4 possuem transceptor IEEE 802.15.4 integrado no silício.",
			},
			{
				termo: "Matter Protocol",
				definicao: "Padrão universal e aberto de conectividade para automação residencial mantido pela CSA, funcionando sobre redes Wi-Fi, Ethernet e Thread, compatível nativamente com Apple Home, Google Home, Alexa e Home Assistant.",
				exemplo: "Lâmpadas e tomadas inteligentes desenvolvidas com ESP-Matter no ESP32-C6 ou ESP32-H2 sem depender de nuvens proprietárias.",
			},
		],
	},
	{
		id: "perifericos",
		nome: "Entradas, Saídas & Periféricos",
		icone: "Sliders",
		emoji: "🔌",
		cor: "amber",
		descricao: "Pinos GPIO, strapping pins, conversores ADC/DAC, PWM/LEDC, MCPWM, RMT, PCNT, TWAI®/CAN, I2C, SPI e I2S.",
		termos: [
			{
				termo: "GPIO (General Purpose Input/Output)",
				definicao: "Pinos multifuncionais configuráveis como entradas ou saídas digitais, com resistores de pull-up/pull-down internos selecionáveis e suporte a interrupções externas em qualquer pino.",
				exemplo: "Leitura de botões, chaveamento de relés e controle de LEDs com `gpio_set_level()` ou `digitalWrite()`.",
			},
			{
				termo: "Strapping Pins",
				definicao: "Pinos GPIO específicos amostrados por hardware no milissegundo em que o chip sai do reset para determinar o modo de boot (Download UART vs SPI Flash) e níveis de tensão.",
				exemplo: "GPIO 0 no ESP32 clássico/S3 ou GPIO 9 no ESP32-C3: se puxados para LOW durante o reset, colocam o chip em modo de gravação de firmware.",
			},
			{
				termo: "ADC (Analog-to-Digital Converter)",
				definicao: "Conversor que transforma níveis contínuos de tensão analógica (0 a 3.3V) em valores numéricos digitais de 12 ou 13 bits através de atenuadores configuráveis (0dB, 2.5dB, 6dB, 11dB/12dB).",
				exemplo: "Leitura de sensores LDR, potenciômetros, termistores e medição do nível de carga de baterias de lítio.",
			},
			{
				termo: "DAC (Digital-to-Analog Converter)",
				definicao: "Conversor que gera tensões analógicas contínuas proporcionais a valores digitais gerados por software sem necessidade de circuitos externos.",
				exemplo: "Disponível no ESP32 clássico e ESP32-S2 para sintetizar áudio analógico ou sinais de controle direto.",
			},
			{
				termo: "LEDC (LED PWM Controller)",
				definicao: "Periférico dedicado a gerar múltiplos canais de modulação por largura de pulso (PWM) com controle de frequência, resolução de até 14-20 bits e transições graduais (fade por hardware) sem ocupar a CPU.",
				exemplo: "Controle suave de brilho de fitas de LED RGBW e posicionamento de servomotores.",
			},
			{
				termo: "MCPWM (Motor Control PWM)",
				definicao: "Controlador PWM avançado projetado para acionamento de motores elétricos, inversores de frequência trifásicos, pontes H com tempo morto (dead-time) configurável e captura de encoders em quadratura.",
				exemplo: "Controle preciso de motores sem escovas (BLDC) e robôs móveis no ESP32 clássico, S3 e P4.",
			},
			{
				termo: "RMT (Remote Control Peripheral)",
				definicao: "Transceptor e gerador de pulsos de temporização precisa em microssegundos projetado originalmente para controles remotos infravermelhos (NEC, RC5, Sony) e amplamente usado para controlar fitas de LED digitais WS2812B / NeoPixel.",
				exemplo: "Atualização de centenas de LEDs NeoPixel sem desativar interrupções do sistema.",
			},
			{
				termo: "PCNT (Pulse Counter)",
				definicao: "Contador de pulsos de hardware que mede a contagem de bordas de subida/descida de sinais externos em alta frequência sem gerar interrupções por software para a CPU.",
				exemplo: "Leitura de encoders rotativos industriais, tacômetros de velocidade e medidores de vazão de água.",
			},
			{
				termo: "TWAI® (Two-Wire Automotive Interface / CAN Bus)",
				definicao: "Controlador de barramento veicular e industrial CAN 2.0B compatível com a norma ISO 11898-1 integrado no silício, necessitando apenas de um transceptor físico externo (como SN65HVD230).",
				exemplo: "Diagnóstico automotivo OBD-II, telemetria de veículos elétricos e automação industrial robusta.",
			},
			{
				termo: "Touch Capacitivo",
				definicao: "Pinos especializados que medem a variação da capacitância eletrostática quando um dedo se aproxima, permitindo criar botões e sliders sensíveis ao toque através de vidro ou acrílico.",
				exemplo: "Painéis de comando touch modernos com até 14 canais no ESP32-S2 e S3.",
			},
			{
				termo: "PARLIO (Parallel IO Controller)",
				definicao: "Barramento paralelo configurável de alta velocidade presente nas séries mais novas (C6, H2, P4) para transferir dados síncronos com clock customizado para displays LCD, câmeras e sensores externos.",
				exemplo: "Comunicação paralela eficiente com chips periféricos sem recorrer a bit-banging na CPU.",
			},
		],
	},
	{
		id: "multimidia",
		nome: "Multimídia, USB & Interfaces Avançadas",
		icone: "Sparkles",
		emoji: "✨",
		cor: "pink",
		descricao: "USB OTG nativo, USB Serial/JTAG, USB High-Speed 480Mbps, MIPI CSI/DSI, codificador H.264 e Ethernet MAC.",
		termos: [
			{
				termo: "USB OTG (On-The-Go) Nativo",
				definicao: "Controlador USB Full-Speed (12 Mbps) embutido no chip que permite ao ESP32 operar como dispositivo periférico (teclado HID, mouse, pendrive Mass Storage) ou como USB Host (lendo pen drives ou periféricos).",
				exemplo: "Nativamente disponível no ESP32-S2 e ESP32-S3 para criação de teclados customizados e emuladores.",
			},
			{
				termo: "USB Serial/JTAG Nativo",
				definicao: "Interface USB integrada no silício que fornece simultaneamente uma porta serial de comunicação para o console e uma sonda de depuração JTAG completa sem a necessidade de chips conversores externos (CH340/CP2102).",
				exemplo: "Permite gravar firmware e debugar com breakpoints no VS Code no ESP32-C3, S3, C6 e H2 apenas com o cabo USB conectado aos pinos D+/D-.",
			},
			{
				termo: "USB 2.0 High-Speed (480 Mbps)",
				definicao: "Controlador USB 2.0 de alta velocidade capaz de transferir até 480 Mbps com PHY integrado, proporcionando largura de banda 40x superior ao USB Full-Speed.",
				exemplo: "Exclusivo do ESP32-P4 para streaming de vídeo em alta definição e transferência em massa de dados.",
			},
			{
				termo: "MIPI CSI & MIPI DSI",
				definicao: "Interfaces seriais diferenciais de alta velocidade padrão da indústria de smartphones: MIPI-CSI (Camera Serial Interface) para sensores de câmera de alta resolução e MIPI-DSI (Display Serial Interface) para telas sensíveis ao toque.",
				exemplo: "Conexão de telas de 1080p e câmeras de alta taxa de quadros no SoC ESP32-P4.",
			},
			{
				termo: "Codificador de Vídeo H.264 por Hardware",
				definicao: "Bloco acelerador dedicado que comprime fluxos de vídeo brutos de câmeras no formato padrão H.264 (AVC) em tempo real em resoluções de até 1080p a 30 FPS sem sobrecarregar a CPU.",
				exemplo: "Câmeras de segurança inteligentes e porteiros eletrônicos com compressão eficiente no ESP32-P4.",
			},
			{
				termo: "Ethernet MAC 10/100 Mbps",
				definicao: "Controlador de camada de enlace de dados (Media Access Control) de rede cabeada integrado no silício, que exige apenas um chip transceptor físico externo (PHY como LAN8720 ou IP101) via interface RMII.",
				exemplo: "Conexão Ethernet RJ45 estável imune a ruídos de rádio para automação predial no ESP32 clássico e ESP32-P4.",
			},
			{
				termo: "Interface de Câmera DVP (8-bit / 16-bit)",
				definicao: "Barramento paralelo com sinais VSYNC, HREF, PCLK e barramento de dados com suporte a DMA para captura direta de frames de módulos de câmera populares (OV2640, OV5640).",
				exemplo: "Usado em placas ESP32-CAM e ESP32-S3-CAM para captura de fotos e streaming de vídeo MJPEG.",
			},
		],
	},
	{
		id: "energia",
		nome: "Gerenciamento de Energia & Sleep Modes",
		icone: "BatteryCharging",
		emoji: "🔋",
		cor: "teal",
		descricao: "Active Mode, Modem Sleep, Light Sleep, Deep Sleep, Hibernation, Brownout Detector e fontes de despertar.",
		termos: [
			{
				termo: "Active Mode",
				definicao: "Modo de operação normal onde a CPU executa instruções na frequência máxima e todos os periféricos e rádios estão prontos para uso, com consumo elétrico variando de 30 mA a ~240 mA (durante transmissões Wi-Fi).",
				exemplo: "ESP32 processando áudio, atualizando displays ou transmitindo dados de sensores em tempo real.",
			},
			{
				termo: "Modem Sleep",
				definicao: "Modo em que os circuitos de rádio Wi-Fi e Bluetooth são desligados temporariamente nos intervalos entre transmissões enquanto a CPU continua rodando seu código normalmente, reduzindo o consumo para ~20 a 40 mA.",
				exemplo: "Modo padrão em aplicações conectadas ao Wi-Fi que aguardam eventos de rede sem perder a associação ao roteador.",
			},
			{
				termo: "Light Sleep",
				definicao: "Modo de economia intermediário: a CPU tem seu clock pausado e os rádios são desligados, mas a memória SRAM interna, os periféricos e o estado das tarefas são preservados intactos. O chip acorda em menos de 1 ms.",
				exemplo: "Consumo de ~0.8 mA em dispositivos que precisam acordar rapidamente por interrupção de botão ou timer.",
			},
			{
				termo: "Deep Sleep",
				definicao: "Modo de sono profundo em que todos os domínios digitais e a CPU são desligados, mantendo alimentado apenas o domínio RTC (e opcionalmente a RTC Memory e o ULP). O consumo cai para 5 a 15 µA e o chip reinicia a execução ao acordar.",
				exemplo: "Estações meteorológicas remotas alimentadas por bateria e painel solar que realizam leituras a cada hora.",
			},
			{
				termo: "Hibernation Mode",
				definicao: "O estado de menor consumo elétrico do silício: desliga inclusive o oscilador de cristal do RTC e domínios lentos, mantendo apenas um circuito analógico de recuperação que acorda por botão externo ou reset.",
				exemplo: "Consumo residual de ~5 µA em dispositivos que operam por anos com bateria botão tipo moeda (CR2032).",
			},
			{
				termo: "Fontes de Despertar (Wakeup Sources)",
				definicao: "Eventos de hardware configurados para tirar o ESP32 do modo Deep Sleep ou Light Sleep: temporizadores RTC, pinos GPIO externos (EXT0 / EXT1), toque capacitivo ou sinal do coprocessador ULP.",
				exemplo: "`esp_sleep_enable_timer_wakeup(60 * 1000000)` para acordar exatamente a cada 60 segundos.",
			},
			{
				termo: "Brownout Detector",
				definicao: "Circuito comparador analógico interno de hardware que monitora a tensão de alimentação no pino 3V3 e força um reset de emergência seguro caso a tensão caia abaixo de ~2.8V para prevenir corrupção da memória Flash.",
				exemplo: "Protege o microcontrolador contra resets parciais causados por fontes fracas durante picos de transmissão de rádio.",
			},
		],
	},
	{
		id: "desenvolvimento",
		nome: "Firmware, Boot & Sistema Operacional",
		icone: "Code2",
		emoji: "🚀",
		cor: "rose",
		descricao: "Bootloader, FreeRTOS, macros IRAM_ATTR, partições da Flash, atualização OTA com Rollback e armazenamento NVS.",
		termos: [
			{
				termo: "Bootloader (First & Second Stage)",
				definicao: "Código que executa logo após o reset elétrico. O primeiro estágio reside na ROM do chip; o segundo estágio reside na Flash, valida a tabela de partições, checa as assinaturas de segurança e carrega o firmware do usuário.",
				exemplo: "Controla a alternância entre partições OTA e inicializa a memória PSRAM antes do `app_main`.",
			},
			{
				termo: "FreeRTOS (Sistema Operacional de Tempo Real)",
				definicao: "Kernel multitarefa preemptivo padrão do ESP-IDF que divide a CPU entre múltiplas tarefas (Tasks), filas de mensagens (Queues), semáforos, mutexes e timers de software com controle de prioridades.",
				exemplo: "`xTaskCreatePinnedToCore()` para alocar tarefas pesadas em núcleos específicos da CPU.",
			},
			{
				termo: "IRAM_ATTR & DRAM_ATTR",
				definicao: "Atributos especiais do compilador GCC para o ESP32 que forçam funções e variáveis a residirem na memória interna ultrarrápida IRAM/DRAM em vez da Flash externa, obrigatório para rotinas de interrupção (ISRs).",
				exemplo: "Evita que uma interrupção cause travamento (*Cache Error*) enquanto a Flash estiver ocupada gravando dados.",
			},
			{
				termo: "Tabela de Partições (partitions.csv)",
				definicao: "Arquivo de configuração que mapeia o espaço de armazenamento da memória Flash em blocos lógicos dedicados ao bootloader, dados NVS, arquivos LittleFS e múltiplas imagens de firmware (Factory, OTA_0, OTA_1).",
				exemplo: "Personalizado para acomodar firmwares grandes com bibliotecas de Bluetooth, Wi-Fi e criptografia.",
			},
			{
				termo: "OTA (Over-The-Air Update) com Rollback",
				definicao: "Atualização sem fio de firmware onde a nova versão é gravada em uma partição secundária. Se o novo firmware falhar ao inicializar, o sistema reverte automaticamente (*Rollback*) para a versão funcional anterior.",
				exemplo: "`esp_ota_mark_app_valid_cancel_rollback()` confirma que a nova atualização está saudável em campo.",
			},
			{
				termo: "NVS (Non-Volatile Storage) & NVS Encryption",
				definicao: "Mecanismo estruturado de chave-valor na memória Flash para persistir credenciais de rede, parâmetros de calibração e contadores, com suporte a criptografia em hardware via chave AES nos eFuses.",
				exemplo: "Salvar nome de rede Wi-Fi e senhas criptografadas para reconexão automática após desligamento.",
			},
			{
				termo: "LittleFS & SPIFFS",
				definicao: "Sistemas de arquivos desenvolvidos para memórias Flash com nivelamento de desgaste (*wear leveling*), permitindo que a aplicação leia e grave arquivos como páginas HTML, certificados SSL e logs.",
				exemplo: "Armazenar páginas HTML/CSS do servidor web embutido do ESP32 para configuração de rede via navegador.",
			},
			{
				termo: "JTAG & OpenOCD",
				definicao: "Padrão de depuração em nível de hardware que permite pausar a CPU, colocar breakpoints e inspecionar registradores e variáveis em tempo real no VS Code ou Eclipse via sondas USB-JTAG.",
				exemplo: "Depuração de crashes complexos e ponteiros nulos sem depender apenas de comandos `Serial.println()`.",
			},
		],
	},
];
