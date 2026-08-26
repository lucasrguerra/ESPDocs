/**
 * Base de Dados Oficial Curada: ESP Component Registry & IDF Component Manager
 * 
 * O ESP Component Registry (https://components.espressif.com) é o ecossistema
 * central de distribuição de bibliotecas modulares para o ESP-IDF v4.4+ / v5.x+.
 */

export const CATEGORIAS_COMPONENTES = [
	{
		id: "todos",
		nome: "Todos os Componentes",
		icone: "Layers",
		descricao: "Explore todo o catálogo curado de bibliotecas e drivers"
	},
	{
		id: "ui_display",
		nome: "UI, Displays & Gráficos",
		icone: "Monitor",
		descricao: "Bibliotecas gráficas (LVGL), drivers de display LCD/OLED, touch e decodificadores"
	},
	{
		id: "cloud_conectividade",
		nome: "Cloud & Conectividade",
		icone: "Cloud",
		descricao: "ESP RainMaker, AWS IoT, MQTT, WebSockets, Mesh-Lite e coprocessamento ESP-Hosted"
	},
	{
		id: "audio_voz_ia",
		nome: "Áudio, Voz & IA",
		icone: "Brain",
		descricao: "Reconhecimento de fala ESP-SR, processamento DSP, codecs, câmeras DVP e TinyML"
	},
	{
		id: "smart_home_mesh",
		nome: "Smart Home & Mesh",
		icone: "Home",
		descricao: "Matter SDK, pilhas Zigbee 3.0 (ZBOSS), Thread e redes ESP-NOW"
	},
	{
		id: "drivers_perifericos",
		nome: "Drivers & Sensores",
		icone: "Cpu",
		descricao: "Botões, encoders, LEDs RGB, Ethernet (W5500/CH390), USB nativo e sensores ambientais/IMU"
	},
	{
		id: "bsp_placas",
		nome: "BSPs (Board Support Packages)",
		icone: "CircuitBoard",
		descricao: "Pacotes de suporte direto para placas oficiais como ESP-BOX-3, Korvo, EYE e M5Stack"
	},
	{
		id: "sistema_utilitarios",
		nome: "Sistema & Utilitários",
		icone: "Wrench",
		descricao: "Sistemas de arquivos LittleFS, wrappers C++ modernos, CBOR e utilitários de rede"
	}
];

export const COMPONENTES_REGISTRY = [
	// ==========================================
	// 1. UI, Displays & Gráficos
	// ==========================================
	{
		id: "espressif-esp_lvgl_port",
		namespace: "espressif",
		name: "esp_lvgl_port",
		versao: "^2.4.0",
		categoria: "ui_display",
		oficial: true,
		popular: true,
		titulo: "ESP LVGL Port",
		descricao: "Port oficial e thread-safe do LVGL (Light and Versatile Graphics Library) para ESP-IDF com aceleração por hardware e suporte multi-display.",
		tags: ["LVGL", "GUI", "Display", "Touch", "IHM"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-P4", "ESP32-C3", "ESP32-C6"],
		dependenciasSugeridas: ["lvgl/lvgl^9.1.0"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_lvgl_port",
		urlRepo: "https://github.com/espressif/esp-bsp/tree/master/components/esp_lvgl_port",
		exemploYaml: `dependencies:
  espressif/esp_lvgl_port: "^2.4.0"
  lvgl/lvgl: "^9.1.0"`
	},
	{
		id: "lvgl-lvgl",
		namespace: "lvgl",
		name: "lvgl",
		versao: "^9.1.0",
		categoria: "ui_display",
		oficial: false,
		popular: true,
		titulo: "LVGL Graphics Library Core",
		descricao: "Biblioteca gráfica de código aberto em C mais popular para sistemas embarcados. Fornece widgets ricos, animações fluidas e suporte a layouts modernos.",
		tags: ["LVGL 9", "Graphics", "Widgets", "GUI", "Embedded UI"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-P4", "ESP32-C3", "ESP32-C6"],
		urlRegistry: "https://components.espressif.com/components/lvgl/lvgl",
		urlRepo: "https://github.com/lvgl/lvgl",
		exemploYaml: `dependencies:
  lvgl/lvgl: "^9.1.0"`
	},
	{
		id: "espressif-esp32_display_panel",
		namespace: "espressif",
		name: "esp32_display_panel",
		versao: "^0.2.0",
		categoria: "ui_display",
		oficial: true,
		popular: true,
		titulo: "ESP32 Display Panel Driver",
		descricao: "Driver unificado de controladores LCD (RGB, SPI, QSPI, MIPI-DSI) e touch capacitivo desenhado especialmente para ESP32-S3 e ESP32-P4.",
		tags: ["LCD", "MIPI-DSI", "QSPI", "Touch", "ST7789", "ILI9341"],
		chips: ["ESP32-S3", "ESP32-P4", "ESP32-S2", "ESP32"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp32_display_panel",
		urlRepo: "https://github.com/esp-arduino-libs/ESP32_Display_Panel",
		exemploYaml: `dependencies:
  espressif/esp32_display_panel: "^0.2.0"`
	},
	{
		id: "espressif-esp_lcd_touch",
		namespace: "espressif",
		name: "esp_lcd_touch",
		versao: "^1.1.2",
		categoria: "ui_display",
		oficial: true,
		popular: true,
		titulo: "ESP LCD Touch Framework",
		descricao: "Componente central de abstração de painéis touch para telas LCD. Suporta calibragem de coordenadas, leitura de múltiplos toques e integração direta com LVGL.",
		tags: ["Touchscreen", "Capacitivo", "Resistivo", "I2C Touch", "Coordenadas"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-P4", "ESP32-C3", "ESP32-C6"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_lcd_touch",
		urlRepo: "https://github.com/espressif/esp-iot-solution/tree/master/components/display/touch_panel/esp_lcd_touch",
		exemploYaml: `dependencies:
  espressif/esp_lcd_touch: "^1.1.2"`
	},
	{
		id: "espressif-esp_lcd_touch_gt911",
		namespace: "espressif",
		name: "esp_lcd_touch_gt911",
		versao: "^1.1.2",
		categoria: "ui_display",
		oficial: true,
		popular: true,
		titulo: "Driver Touch Capacitivo GT911",
		descricao: "Driver I2C especializado para o controlador de touch capacitivo Goodix GT911, amplamente utilizado em displays de 4.3\", 5\" e 7\" para ESP32-S3 e P4.",
		tags: ["GT911", "Goodix", "Touch Capacitivo", "Multitouch", "I2C"],
		chips: ["ESP32", "ESP32-S3", "ESP32-P4", "ESP32-S2"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_lcd_touch_gt911",
		urlRepo: "https://github.com/espressif/esp-iot-solution/tree/master/components/display/touch_panel/esp_lcd_touch_gt911",
		exemploYaml: `dependencies:
  espressif/esp_lcd_touch_gt911: "^1.1.2"`
	},
	{
		id: "espressif-esp_lcd_touch_ft5x06",
		namespace: "espressif",
		name: "esp_lcd_touch_ft5x06",
		versao: "^1.1.0",
		categoria: "ui_display",
		oficial: true,
		popular: false,
		titulo: "Driver Touch FocalTech FT5x06 / FT6x36",
		descricao: "Driver de painel touch capacitivo para controladores FocalTech (FT5206, FT5316, FT5436, FT6236, FT6336) com suporte a gestos e interrupções.",
		tags: ["FT6236", "FT5x06", "FocalTech", "Touch", "I2C"],
		chips: ["ESP32", "ESP32-S3", "ESP32-P4", "ESP32-S2", "ESP32-C3"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_lcd_touch_ft5x06",
		urlRepo: "https://github.com/espressif/esp-iot-solution/tree/master/components/display/touch_panel/esp_lcd_touch_ft5x06",
		exemploYaml: `dependencies:
  espressif/esp_lcd_touch_ft5x06: "^1.1.0"`
	},
	{
		id: "espressif-esp_jpeg",
		namespace: "espressif",
		name: "esp_jpeg",
		versao: "^1.3.0",
		categoria: "ui_display",
		oficial: true,
		popular: false,
		titulo: "ESP JPEG Decoder (TJpgDec)",
		descricao: "Decodificador e codificador JPEG de alta velocidade com otimizações SIMD em Assembly para exibir imagens e streams de câmeras em displays sem atrasos.",
		tags: ["JPEG", "TJpgDec", "Câmera", "Imagem", "SIMD"],
		chips: ["ESP32", "ESP32-S3", "ESP32-P4", "ESP32-C3"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_jpeg",
		urlRepo: "https://github.com/espressif/esp-jpeg",
		exemploYaml: `dependencies:
  espressif/esp_jpeg: "^1.3.0"`
	},

	// ==========================================
	// 2. Cloud & Conectividade
	// ==========================================
	{
		id: "espressif-esp_rainmaker",
		namespace: "espressif",
		name: "esp_rainmaker",
		versao: "^1.4.0",
		categoria: "cloud_conectividade",
		oficial: true,
		popular: true,
		titulo: "ESP RainMaker Agent",
		descricao: "Agente oficial de firmware para a plataforma de nuvem AIoT ESP RainMaker. Habilita controle por app móvel, Alexa, Google Home e OTA.",
		tags: ["RainMaker", "AWS Cloud", "App iOS/Android", "Alexa", "Google Home", "OTA"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_rainmaker",
		urlRepo: "https://github.com/espressif/esp-rainmaker",
		exemploYaml: `dependencies:
  espressif/esp_rainmaker: "^1.4.0"`
	},
	{
		id: "espressif-mesh_lite",
		namespace: "espressif",
		name: "mesh_lite",
		versao: "^1.2.0",
		categoria: "cloud_conectividade",
		oficial: true,
		popular: true,
		titulo: "ESP Mesh-Lite Network Stack",
		descricao: "Rede em malha Wi-Fi leve onde cada nó possui conectividade IP independente, permitindo comunicação direta na rede local e acesso à nuvem com múltiplos saltos.",
		tags: ["Mesh", "Wi-Fi Mesh", "Rede em Malha", "IoT Distribuída", "IP Layer"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6"],
		urlRegistry: "https://components.espressif.com/components/espressif/mesh_lite",
		urlRepo: "https://github.com/espressif/esp-mesh-lite",
		exemploYaml: `dependencies:
  espressif/mesh_lite: "^1.2.0"`
	},
	{
		id: "espressif-esp_modbus",
		namespace: "espressif",
		name: "esp_modbus",
		versao: "^1.0.15",
		categoria: "cloud_conectividade",
		oficial: true,
		popular: true,
		titulo: "ESP-Modbus Industrial Stack",
		descricao: "Implementação completa da pilha industrial Modbus (Master/Slave) suportando interfaces RS-485 (RTU/ASCII) e Ethernet/Wi-Fi (Modbus TCP).",
		tags: ["Modbus", "RS-485", "Modbus TCP", "Automação Industrial", "PLC"],
		chips: ["ESP32", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_modbus",
		urlRepo: "https://github.com/espressif/esp-modbus",
		exemploYaml: `dependencies:
  espressif/esp_modbus: "^1.0.15"`
	},
	{
		id: "espressif-net_connect",
		namespace: "espressif",
		name: "net_connect",
		versao: "^1.0.0",
		categoria: "cloud_conectividade",
		oficial: true,
		popular: false,
		titulo: "Unified Network Connect",
		descricao: "Componente unificado de gerenciamento de conexão de rede, alternando e inicializando de forma transparente Wi-Fi, Ethernet, Thread ou PPP móvel.",
		tags: ["Network", "Wi-Fi", "Ethernet", "Fallback", "Conexão Automática"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/net_connect",
		urlRepo: "https://github.com/espressif/esp-idf/tree/master/components",
		exemploYaml: `dependencies:
  espressif/net_connect: "^1.0.0"`
	},
	{
		id: "espressif-esp_hosted",
		namespace: "espressif",
		name: "esp_hosted",
		versao: "^0.0.10",
		categoria: "cloud_conectividade",
		oficial: true,
		popular: false,
		titulo: "ESP-Hosted Coprocessor",
		descricao: "Transforma o ESP32 em um coprocessador de comunicação sem fio (Wi-Fi + BLE) para hosts Linux (Raspberry Pi, i.MX) ou microcontroladores via SPI/SDIO/UART.",
		tags: ["Coprocessador", "SDIO", "SPI", "Linux Wi-Fi", "Raspberry Pi"],
		chips: ["ESP32", "ESP32-S3", "ESP32-C3", "ESP32-C6"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_hosted",
		urlRepo: "https://github.com/espressif/esp-hosted",
		exemploYaml: `dependencies:
  espressif/esp_hosted: "^0.0.10"`
	},
	{
		id: "espressif-esp-now",
		namespace: "espressif",
		name: "esp-now",
		versao: "^2.5.0",
		categoria: "cloud_conectividade",
		oficial: true,
		popular: true,
		titulo: "ESP-NOW Enhanced & Provisioning",
		descricao: "Extensão com recursos avançados de emparelhamento por controle remoto, segurança AES-128 e controle de múltiplos dispositivos com protocolo ESP-NOW.",
		tags: ["ESP-NOW", "Sem Fio", "Baixa Latência", "Broadcast", "Controle Remoto"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp-now",
		urlRepo: "https://github.com/espressif/esp-now",
		exemploYaml: `dependencies:
  espressif/esp-now: "^2.5.0"`
	},

	// ==========================================
	// 3. Áudio, Voz & IA
	// ==========================================
	{
		id: "espressif-esp-sr",
		namespace: "espressif",
		name: "esp-sr",
		versao: "^1.5.0",
		categoria: "audio_voz_ia",
		oficial: true,
		popular: true,
		titulo: "ESP-SR Speech Recognition",
		descricao: "Framework de reconhecimento de fala 100% offline com WakeNet (palavra de ativação), MultiNet (comandos locais) e algoritmos acústicos AFE.",
		tags: ["Voz", "WakeNet", "MultiNet", "Reconhecimento de Fala", "Offline", "AEC"],
		chips: ["ESP32-S3", "ESP32-P4", "ESP32"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp-sr",
		urlRepo: "https://github.com/espressif/esp-sr",
		exemploYaml: `dependencies:
  espressif/esp-sr: "^1.5.0"`
	},
	{
		id: "espressif-esp_codec_dev",
		namespace: "espressif",
		name: "esp_codec_dev",
		versao: "^1.3.0",
		categoria: "audio_voz_ia",
		oficial: true,
		popular: true,
		titulo: "ESP Audio Codec Device HAL",
		descricao: "Camada unificada de abstração de codecs de áudio I2S/I2C (ES8311, ES8388, ES7210, ES7243, TAS5805M) para entrada e saída de som estéreo.",
		tags: ["Audio Codec", "I2S", "ES8311", "ES8388", "Microfone DAC"],
		chips: ["ESP32", "ESP32-S3", "ESP32-P4", "ESP32-C3", "ESP32-C6"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_codec_dev",
		urlRepo: "https://github.com/espressif/esp-codec-dev",
		exemploYaml: `dependencies:
  espressif/esp_codec_dev: "^1.3.0"`
	},
	{
		id: "espressif-es8311",
		namespace: "espressif",
		name: "es8311",
		versao: "^1.0.0",
		categoria: "audio_voz_ia",
		oficial: true,
		popular: true,
		titulo: "Driver Codec de Áudio ES8311",
		descricao: "Driver dedicado de baixo consumo para o codec Everest ES8311 (DAC mono + ADC de microfone) presente no ESP32-S3-BOX e placas de IoT.",
		tags: ["ES8311", "Áudio", "DAC", "Microfone", "I2S"],
		chips: ["ESP32", "ESP32-S3", "ESP32-P4", "ESP32-C3"],
		urlRegistry: "https://components.espressif.com/components/espressif/es8311",
		urlRepo: "https://github.com/espressif/esp-bsp/tree/master/components/es8311",
		exemploYaml: `dependencies:
  espressif/es8311: "^1.0.0"`
	},
	{
		id: "espressif-esp32-camera",
		namespace: "espressif",
		name: "esp32-camera",
		versao: "^2.0.12",
		categoria: "audio_voz_ia",
		oficial: true,
		popular: true,
		titulo: "ESP32 Camera Driver",
		descricao: "Driver oficial de câmeras CMOS (OV2640, OV3660, OV5640, OV7670, GC0308) com suporte a DMA, DMA-2D, captura JPEG e streaming MJPEG por HTTP/RTSP.",
		tags: ["Câmera", "OV2640", "OV5640", "DVP", "MIPI-CSI", "Vídeo"],
		chips: ["ESP32", "ESP32-S3", "ESP32-P4", "ESP32-S2"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp32-camera",
		urlRepo: "https://github.com/espressif/esp32-camera",
		exemploYaml: `dependencies:
  espressif/esp32-camera: "^2.0.12"`
	},
	{
		id: "espressif-esp-dsp",
		namespace: "espressif",
		name: "esp-dsp",
		versao: "^1.5.1",
		categoria: "audio_voz_ia",
		oficial: true,
		popular: true,
		titulo: "ESP-DSP Signal Processing",
		descricao: "Biblioteca oficial de processamento digital de sinais para SoCs ESP32 (FFT, filtros digitais FIR/IIR, matrizes e álgebra linear acelerada).",
		tags: ["DSP", "FFT", "Filtros", "Matemática", "SIMD", "Assembly"],
		chips: ["ESP32", "ESP32-S3", "ESP32-P4", "ESP32-C3", "ESP32-C6"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp-dsp",
		urlRepo: "https://github.com/espressif/esp-dsp",
		exemploYaml: `dependencies:
  espressif/esp-dsp: "^1.5.1"`
	},
	{
		id: "espressif-esp-nn",
		namespace: "espressif",
		name: "esp-nn",
		versao: "^1.2.0",
		categoria: "audio_voz_ia",
		oficial: true,
		popular: true,
		titulo: "ESP-NN Neural Network Kernels",
		descricao: "Kernels otimizados em assembly vetorial para aceleração de redes neurais e modelos TensorFlow Lite Micro em chips ESP32.",
		tags: ["TinyML", "TensorFlow Lite", "Redes Neurais", "Inferência", "Edge AI"],
		chips: ["ESP32-S3", "ESP32-P4", "ESP32"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp-nn",
		urlRepo: "https://github.com/espressif/esp-nn",
		exemploYaml: `dependencies:
  espressif/esp-nn: "^1.2.0"`
	},

	// ==========================================
	// 4. Smart Home & Mesh
	// ==========================================
	{
		id: "espressif-esp-matter",
		namespace: "espressif",
		name: "esp-matter",
		versao: "^1.3.0",
		categoria: "smart_home_mesh",
		oficial: true,
		popular: true,
		titulo: "ESP Matter SDK",
		descricao: "SDK oficial para criar dispositivos interoperáveis com Apple Home, Google Home, Amazon Alexa e Home Assistant sobre Wi-Fi e Thread.",
		tags: ["Matter", "Smart Home", "Apple HomeKit", "Google Home", "Thread", "CHIP"],
		chips: ["ESP32", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-H2"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp-matter",
		urlRepo: "https://github.com/espressif/esp-matter",
		exemploYaml: `dependencies:
  espressif/esp-matter: "^1.3.0"`
	},
	{
		id: "espressif-esp-zigbee-lib",
		namespace: "espressif",
		name: "esp-zigbee-lib",
		versao: "^1.6.0",
		categoria: "smart_home_mesh",
		oficial: true,
		popular: true,
		titulo: "ESP Zigbee 3.0 Library",
		descricao: "Pilha certificada Zigbee 3.0 (ZBOSS) para criação de nós Coordenadores, Roteadores e Dispositivos Finais de baixo consumo em chips 802.15.4.",
		tags: ["Zigbee 3.0", "ZBOSS", "802.15.4", "Home Automation", "Bateria"],
		chips: ["ESP32-H2", "ESP32-C6"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp-zigbee-lib",
		urlRepo: "https://github.com/espressif/esp-zigbee-sdk",
		exemploYaml: `dependencies:
  espressif/esp-zigbee-lib: "^1.6.0"`
	},
	{
		id: "espressif-esp_rcp_update",
		namespace: "espressif",
		name: "esp_rcp_update",
		versao: "^1.0.0",
		categoria: "smart_home_mesh",
		oficial: true,
		popular: false,
		titulo: "ESP RCP Thread/Zigbee Gateway",
		descricao: "Componente para atualização de coprocessador de rádio (RCP) 802.15.4 para construção de Thread Border Routers e gateways Zigbee multiprotocolo.",
		tags: ["Thread Border Router", "OpenThread", "RCP", "Zigbee Gateway"],
		chips: ["ESP32-H2", "ESP32-C6", "ESP32-S3"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_rcp_update",
		urlRepo: "https://github.com/espressif/esp-thread-br",
		exemploYaml: `dependencies:
  espressif/esp_rcp_update: "^1.0.0"`
	},

	// ==========================================
	// 5. Drivers & Sensores
	// ==========================================
	{
		id: "espressif-led_indicator",
		namespace: "espressif",
		name: "led_indicator",
		versao: "^1.2.0",
		categoria: "drivers_perifericos",
		oficial: true,
		popular: true,
		titulo: "LED Indicator Driver",
		descricao: "Driver inteligente para controle de padrões de iluminação de LED (piscar rápido, respiração/fade, códigos de erro e RGB) sem travar o loop principal.",
		tags: ["LED", "PWM", "RGB", "Blink", "Feedback Visual"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C2", "ESP32-C3", "ESP32-C6", "ESP32-H2", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/led_indicator",
		urlRepo: "https://github.com/espressif/esp-iot-solution/tree/master/components/led/led_indicator",
		exemploYaml: `dependencies:
  espressif/led_indicator: "^1.2.0"`
	},
	{
		id: "espressif-button",
		namespace: "espressif",
		name: "button",
		versao: "^3.4.0",
		categoria: "drivers_perifericos",
		oficial: true,
		popular: true,
		titulo: "IoT Button Handler (iot_button)",
		descricao: "Gerenciador completo de botões com debounce, eventos de clique único, duplo, múltiplo, pressionamento longo e matrizes de teclado.",
		tags: ["Botão", "Debounce", "Long Press", "Double Click", "GPIO"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-H2", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/button",
		urlRepo: "https://github.com/espressif/esp-iot-solution/tree/master/components/button",
		exemploYaml: `dependencies:
  espressif/button: "^3.4.0"`
	},
	{
		id: "espressif-led_strip",
		namespace: "espressif",
		name: "led_strip",
		versao: "^2.5.4",
		categoria: "drivers_perifericos",
		oficial: true,
		popular: true,
		titulo: "Addressable LED Strip (WS2812/SK6812)",
		descricao: "Driver de alto desempenho para fitas e matrizes de LED endereçáveis WS2812, WS2813 e SK6812 usando periféricos RMT ou SPI.",
		tags: ["WS2812B", "Neopixel", "SK6812", "RMT", "Fita de LED", "RGB"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/led_strip",
		urlRepo: "https://github.com/espressif/idf-extra-components/tree/master/led_strip",
		exemploYaml: `dependencies:
  espressif/led_strip: "^2.5.4"`
	},
	{
		id: "espressif-esp_tinyusb",
		namespace: "espressif",
		name: "esp_tinyusb",
		versao: "^1.5.0",
		categoria: "drivers_perifericos",
		oficial: true,
		popular: true,
		titulo: "ESP Native USB Device (TinyUSB)",
		descricao: "Extensão oficial do TinyUSB para ESP32-S2, ESP32-S3 e ESP32-P4, permitindo emular portas seriais USB CDC, Teclado/Mouse HID, Pen Drive MSC, DFU e WebUSB.",
		tags: ["USB Nativo", "TinyUSB", "USB CDC", "USB HID", "WebUSB", "MSC"],
		chips: ["ESP32-S2", "ESP32-S3", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_tinyusb",
		urlRepo: "https://github.com/espressif/esp-tinyusb",
		exemploYaml: `dependencies:
  espressif/esp_tinyusb: "^1.5.0"`
	},
	{
		id: "espressif-w5500",
		namespace: "espressif",
		name: "w5500",
		versao: "^1.2.0",
		categoria: "drivers_perifericos",
		oficial: true,
		popular: true,
		titulo: "WIZnet W5500 SPI Ethernet Driver",
		descricao: "Driver oficial para o chip Ethernet WIZnet W5500 via barramento SPI, integrando perfeitamente a interface física à pilha TCP/IP (lwIP) nativa do ESP-IDF.",
		tags: ["W5500", "Ethernet", "SPI Ethernet", "RJ45", "lwIP", "Rede Cabeada"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/w5500",
		urlRepo: "https://github.com/espressif/esp-eth-drivers/tree/master/w5500",
		exemploYaml: `dependencies:
  espressif/w5500: "^1.2.0"`
	},
	{
		id: "espressif-ch390",
		namespace: "espressif",
		name: "ch390",
		versao: "^1.0.0",
		categoria: "drivers_perifericos",
		oficial: true,
		popular: false,
		titulo: "CH390 SPI Ethernet Driver",
		descricao: "Driver SPI Ethernet 10/100M para o controlador WCH CH390, ideal para adicionar porta de rede RJ45 econômica em placas com ESP32-C3, S3 ou P4.",
		tags: ["CH390", "Ethernet", "WCH", "SPI Ethernet", "RJ45"],
		chips: ["ESP32", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/ch390",
		urlRepo: "https://github.com/espressif/esp-eth-drivers/tree/master/ch390",
		exemploYaml: `dependencies:
  espressif/ch390: "^1.0.0"`
	},
	{
		id: "espressif-usb_host_uvc",
		namespace: "espressif",
		name: "usb_host_uvc",
		versao: "^1.0.4",
		categoria: "drivers_perifericos",
		oficial: true,
		popular: false,
		titulo: "USB Host UVC (Webcam Driver)",
		descricao: "Driver USB Host para conectar webcams USB UVC padrão diretamente na porta USB nativa do ESP32-S2, ESP32-S3 ou ESP32-P4.",
		tags: ["USB Host", "UVC", "Webcam", "Câmera USB", "Vídeo"],
		chips: ["ESP32-S2", "ESP32-S3", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/usb_host_uvc",
		urlRepo: "https://github.com/espressif/esp-iot-solution/tree/master/components/usb/usb_host_uvc",
		exemploYaml: `dependencies:
  espressif/usb_host_uvc: "^1.0.4"`
	},
	{
		id: "espressif-sensor_hub",
		namespace: "espressif",
		name: "sensor_hub",
		versao: "^1.0.0",
		categoria: "drivers_perifericos",
		oficial: true,
		popular: false,
		titulo: "ESP Sensor Hub Manager",
		descricao: "Framework unificado para gerenciamento de sensores heterogêneos (I2C/SPI) com amostragem periódica, fusão de dados e disparo por eventos/interrupções.",
		tags: ["Sensores", "Sensor Hub", "I2C", "Eventos", "Coleta Periódica"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/sensor_hub",
		urlRepo: "https://github.com/espressif/esp-iot-solution/tree/master/components/sensors/sensor_hub",
		exemploYaml: `dependencies:
  espressif/sensor_hub: "^1.0.0"`
	},
	{
		id: "espressif-bmi270_sensor",
		namespace: "espressif",
		name: "bmi270_sensor",
		versao: "^1.0.1",
		categoria: "drivers_perifericos",
		oficial: true,
		popular: false,
		titulo: "Driver Sensor IMU Bosch BMI270",
		descricao: "Driver oficial para o sensor inercial IMU de 6 eixos Bosch BMI270 (Acelerômetro + Giroscópio) com detecção de gestos de movimento e passos.",
		tags: ["BMI270", "IMU", "Acelerômetro", "Giroscópio", "Bosch", "Gestos"],
		chips: ["ESP32", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/bmi270_sensor",
		urlRepo: "https://github.com/espressif/esp-iot-solution/tree/master/components/sensors/imu/bmi270",
		exemploYaml: `dependencies:
  espressif/bmi270_sensor: "^1.0.1"`
	},
	{
		id: "espressif-ds18b20",
		namespace: "espressif",
		name: "ds18b20",
		versao: "^1.0.0",
		categoria: "drivers_perifericos",
		oficial: true,
		popular: true,
		titulo: "Driver Sensor de Temperatura DS18B20",
		descricao: "Driver digital para sensor de temperatura 1-Wire Dallas/Maxim DS18B20 com suporte a múltiplos sensores no mesmo pino GPIO via barramento RMT.",
		tags: ["DS18B20", "1-Wire", "Temperatura", "Sensor", "Dallas"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/ds18b20",
		urlRepo: "https://github.com/espressif/esp-iot-solution/tree/master/components/sensors/temperature/ds18b20",
		exemploYaml: `dependencies:
  espressif/ds18b20: "^1.0.0"`
	},
	{
		id: "esp-idf-lib-scd4x",
		namespace: "esp-idf-lib",
		name: "scd4x",
		versao: "^1.0.0",
		categoria: "drivers_perifericos",
		oficial: false,
		popular: true,
		titulo: "Driver Sensor CO2 Sensirion SCD40/SCD41",
		descricao: "Driver I2C de alta precisão para sensores fotoacústicos de CO2, temperatura e umidade relativa Sensirion SCD40 e SCD41 com auto-calibragem.",
		tags: ["SCD40", "SCD41", "Sensirion", "CO2", "Qualidade do Ar", "I2C"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-H2", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/esp-idf-lib/scd4x",
		urlRepo: "https://github.com/UncleRus/esp-idf-lib/tree/master/components/scd4x",
		exemploYaml: `dependencies:
  esp-idf-lib/scd4x: "^1.0.0"`
	},

	// ==========================================
	// 6. BSPs (Board Support Packages)
	// ==========================================
	{
		id: "espressif-esp-box-3",
		namespace: "espressif",
		name: "esp-box-3",
		versao: "^1.2.0",
		categoria: "bsp_placas",
		oficial: true,
		popular: true,
		titulo: "BSP ESP32-S3-BOX-3",
		descricao: "Pacote de suporte completo para a placa de desenvolvimento de IA ESP32-S3-BOX-3, inicializando tela touch, codec de áudio, microfones duplos, sensor de movimento e LEDs com uma única função.",
		tags: ["BSP", "ESP-BOX-3", "Display Touch", "Microfone", "Áudio ES8311", "I2C/SPI"],
		chips: ["ESP32-S3"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp-box-3",
		urlRepo: "https://github.com/espressif/esp-bsp/tree/master/bsp/esp-box-3",
		exemploYaml: `dependencies:
  espressif/esp-box-3: "^1.2.0"`
	},
	{
		id: "espressif-esp32_s3_korvo_2",
		namespace: "espressif",
		name: "esp32_s3_korvo_2",
		versao: "^1.1.0",
		categoria: "bsp_placas",
		oficial: true,
		popular: false,
		titulo: "BSP ESP32-S3-Korvo-2",
		descricao: "Board Support Package para o kit de desenvolvimento de áudio e reconhecimento de voz ESP32-S3-Korvo-2, com suporte a microfones I2S e botões de toque.",
		tags: ["BSP", "Korvo", "Áudio", "Array de Microfones", "ESP-SR"],
		chips: ["ESP32-S3"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp32_s3_korvo_2",
		urlRepo: "https://github.com/espressif/esp-bsp/tree/master/bsp/esp32_s3_korvo_2",
		exemploYaml: `dependencies:
  espressif/esp32_s3_korvo_2: "^1.1.0"`
	},
	{
		id: "espressif-esp32_s3_eye",
		namespace: "espressif",
		name: "esp32_s3_eye",
		versao: "^1.1.0",
		categoria: "bsp_placas",
		oficial: true,
		popular: true,
		titulo: "BSP ESP32-S3-EYE",
		descricao: "Board Support Package para a placa de visão computacional oficial ESP32-S3-EYE, configurando câmera OV2640, display LCD SPI redondo e microfone digital.",
		tags: ["BSP", "ESP32-S3-EYE", "Câmera", "Visão Computacional", "Display"],
		chips: ["ESP32-S3"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp32_s3_eye",
		urlRepo: "https://github.com/espressif/esp-bsp/tree/master/bsp/esp32_s3_eye",
		exemploYaml: `dependencies:
  espressif/esp32_s3_eye: "^1.1.0"`
	},
	{
		id: "espressif-m5stack_core_s3",
		namespace: "espressif",
		name: "m5stack_core_s3",
		versao: "^1.0.0",
		categoria: "bsp_placas",
		oficial: true,
		popular: true,
		titulo: "BSP M5Stack CoreS3",
		descricao: "Board Support Package oficial para o dispositivo M5Stack CoreS3, inicializando tela sensível ao toque, PMIC AXP2101, câmera GC0308 e alto-falante I2S.",
		tags: ["BSP", "M5Stack", "CoreS3", "Display ILI9342C", "AXP2101", "Câmera"],
		chips: ["ESP32-S3"],
		urlRegistry: "https://components.espressif.com/components/espressif/m5stack_core_s3",
		urlRepo: "https://github.com/espressif/esp-bsp/tree/master/bsp/m5stack_core_s3",
		exemploYaml: `dependencies:
  espressif/m5stack_core_s3: "^1.0.0"`
	},
	{
		id: "waveshare-esp32_p4_wifi6_touch_lcd_7b",
		namespace: "waveshare",
		name: "esp32_p4_wifi6_touch_lcd_7b",
		versao: "^1.0.0",
		categoria: "bsp_placas",
		oficial: false,
		popular: true,
		titulo: "BSP Waveshare ESP32-P4 Touch LCD 7\"",
		descricao: "Pacote de suporte para a placa de alta performance Waveshare ESP32-P4 com tela touch capacitiva de 7 polegadas (MIPI-DSI 1024x600) e coprocessador Wi-Fi 6.",
		tags: ["BSP", "ESP32-P4", "MIPI-DSI", "Waveshare", "Tela 7 Polegadas", "Touch"],
		chips: ["ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/waveshare/esp32_p4_wifi6_touch_lcd_7b",
		urlRepo: "https://github.com/waveshare/ESP32-P4-WiFi6-Touch-LCD-7B",
		exemploYaml: `dependencies:
  waveshare/esp32_p4_wifi6_touch_lcd_7b: "^1.0.0"`
	},

	// ==========================================
	// 7. Sistema & Utilitários
	// ==========================================
	{
		id: "joltwallet-littlefs",
		namespace: "joltwallet",
		name: "littlefs",
		versao: "^1.14.8",
		categoria: "sistema_utilitarios",
		oficial: false,
		popular: true,
		titulo: "LittleFS Filesystem for ESP-IDF",
		descricao: "Port robusto do sistema de arquivos LittleFS para memória Flash SPI com wear-leveling dinâmico e proteção contra corrupção por queda de energia.",
		tags: ["LittleFS", "Flash", "Filesystem", "Wear Leveling", "NVS"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-H2", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/joltwallet/littlefs",
		urlRepo: "https://github.com/joltwallet/esp_littlefs",
		exemploYaml: `dependencies:
  joltwallet/littlefs: "^1.14.8"`
	},
	{
		id: "espressif-esp-idf-cxx",
		namespace: "espressif",
		name: "esp-idf-cxx",
		versao: "^1.2.0",
		categoria: "sistema_utilitarios",
		oficial: true,
		popular: true,
		titulo: "ESP-IDF C++ Idiomatic Wrappers",
		descricao: "Conjunto de classes e wrappers C++ modernos (C++17/C++20/C++23) com semântica RAII para GPIOs, Wi-Fi, timers, filas FreeRTOS e semáforos.",
		tags: ["C++", "C++20", "RAII", "Modern C++", "Object Oriented", "FreeRTOS"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-H2", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp-idf-cxx",
		urlRepo: "https://github.com/espressif/esp-idf-cxx",
		exemploYaml: `dependencies:
  espressif/esp-idf-cxx: "^1.2.0"`
	},
	{
		id: "espressif-cbor",
		namespace: "espressif",
		name: "cbor",
		versao: "^0.6.0",
		categoria: "sistema_utilitarios",
		oficial: true,
		popular: false,
		titulo: "TinyCBOR Serialization",
		descricao: "Biblioteca ultraleve para serialização e deserialização de dados em formato binário CBOR (Concise Binary Object Representation).",
		tags: ["CBOR", "Serialização", "Binário", "IoT Protocol", "JSON Compacto"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-H2", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/cbor",
		urlRepo: "https://github.com/espressif/tinycbor",
		exemploYaml: `dependencies:
  espressif/cbor: "^0.6.0"`
	},
	{
		id: "espressif-esp_websocket_client",
		namespace: "espressif",
		name: "esp_websocket_client",
		versao: "^1.2.4",
		categoria: "sistema_utilitarios",
		oficial: true,
		popular: true,
		titulo: "ESP WebSocket Client",
		descricao: "Cliente WebSocket bidirecional em tempo real com suporte a TLS/SSL (WSS), reconexão automática, sub-protocolos e ping/pong de heartbeat.",
		tags: ["WebSocket", "WSS", "TLS", "Tempo Real", "Sockets", "JSON"],
		chips: ["ESP32", "ESP32-S2", "ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-P4"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_websocket_client",
		urlRepo: "https://github.com/espressif/esp-protocols/tree/master/components/esp_websocket_client",
		exemploYaml: `dependencies:
  espressif/esp_websocket_client: "^1.2.4"`
	}
];

export const GUIA_COMPONENT_MANAGER = {
	titulo: "Como Usar o ESP Component Registry no ESP-IDF",
	resumo: "A partir do ESP-IDF v4.4 e consolidado no v5.x+, a Espressif adotou a arquitetura de pacotes modulares gerenciada pelo IDF Component Manager. Esqueça submódulos git complexos: agora basta declarar as bibliotecas no arquivo de manifesto idf_component.yml do seu projeto.",
	vantagens: [
		{
			titulo: "Instalação Automática e Desacoplada",
			descricao: "O compilador baixa, compila e gerencia as versões das bibliotecas automaticamente durante o 'idf.py build' ou 'idf.py reconfigure'."
		},
		{
			titulo: "Versionamento Semântico Rigoroso",
			descricao: "Controle exatamente quando atualizar com operadores de versão (^ para compatibilidade minor, ~ para patches ou versões exatas fixas)."
		},
		{
			titulo: "Projetos mais Leves e Limpos",
			descricao: "O repositório do seu projeto fica limpo, sem carregar código de terceiros dentro do histórico do Git."
		},
		{
			titulo: "Compartilhamento Corporativo ou Comunitário",
			descricao: "Publique seus próprios componentes na nuvem pública da Espressif ou em registros privados locais da sua empresa."
		}
	],
	comandosCli: [
		{
			comando: 'idf.py add-dependency "namespace/componente^versao"',
			exemplo: 'idf.py add-dependency "espressif/esp_lvgl_port^2.4.0"',
			explicacao: "Cria ou atualiza automaticamente o arquivo 'main/idf_component.yml' adicionando a dependência informada."
		},
		{
			comando: "idf.py reconfigure",
			exemplo: "idf.py reconfigure",
			explicacao: "Força o CMake e o Component Manager a resolver novamente a árvore de dependências e baixar pacotes pendentes."
		},
		{
			comando: "compote component upload --name <component_name> --namespace <sua_org>",
			exemplo: "compote component upload --name meu_driver_sensor --namespace minhadiv",
			explicacao: "Publica seu componente de código aberto ou proprietário no ESP Component Registry usando a ferramenta oficial Compote CLI."
		}
	],
	sintaxeManifesto: `# Estrutura típica do arquivo: main/idf_component.yml
dependencies:
  # Baixa do registro oficial da Espressif
  espressif/esp_lvgl_port: "^2.4.0"
  espressif/button: "~3.4.0"
  
  # Versão exata
  espressif/led_indicator: "1.2.0"
  
  # Dependência da comunidade
  joltwallet/littlefs: "^1.14.8"
  
  # Dependência local no seu disco (opcional)
  # meu_driver_local:
  #   path: "../../components/meu_driver"`
};
