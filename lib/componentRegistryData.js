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
		descricao: "Bibliotecas gráficas (LVGL), drivers de display LCD/OLED e decodificadores de imagem"
	},
	{
		id: "cloud_conectividade",
		nome: "Cloud & Conectividade",
		icone: "Cloud",
		descricao: "ESP RainMaker, AWS IoT, MQTT, HTTP, WebSockets e coprocessamento ESP-Hosted"
	},
	{
		id: "audio_voz_ia",
		nome: "Áudio, Voz & IA",
		icone: "Brain",
		descricao: "Reconhecimento de fala ESP-SR, processamento DSP, codecs de áudio e aceleração TinyML"
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
		descricao: "Botões, encoders, LEDs RGB endereçáveis, Ethernet PHYs, USB Host e sensores I2C/SPI"
	},
	{
		id: "bsp_placas",
		nome: "BSPs (Board Support Packages)",
		icone: "CircuitBoard",
		descricao: "Pacotes de suporte direto para placas oficiais como ESP32-S3-BOX, Korvo, Eye e LilyGO"
	},
	{
		id: "sistema_utilitarios",
		nome: "Sistema & Utilitários",
		icone: "Wrench",
		descricao: "Sistemas de arquivos LittleFS/FATFS, gerenciadores de tarefas, logs e testes unitários"
	}
];

export const COMPONENTES_REGISTRY = [
	// UI, Displays & Gráficos
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
		dependenciasSugeridas: ["lvgl/lvgl^9.0.0"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_lvgl_port",
		urlRepo: "https://github.com/espressif/esp-bsp/tree/master/components/esp_lvgl_port",
		exemploYaml: `dependencies:
  espressif/esp_lvgl_port: "^2.4.0"
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
		id: "espressif-esp_jpeg",
		namespace: "espressif",
		name: "esp_jpeg",
		versao: "^1.3.0",
		categoria: "ui_display",
		oficial: true,
		popular: false,
		titulo: "ESP JPEG Decoder (TJpgDec)",
		descricao: "Decodificador e codificador JPEG de alta velocidade com otimizações SIMD em Assembly para exibir imagens e câmeras em displays.",
		tags: ["JPEG", "TJpgDec", "Câmera", "Imagem", "SIMD"],
		chips: ["ESP32", "ESP32-S3", "ESP32-P4", "ESP32-C3"],
		urlRegistry: "https://components.espressif.com/components/espressif/esp_jpeg",
		urlRepo: "https://github.com/espressif/esp-jpeg",
		exemploYaml: `dependencies:
  espressif/esp_jpeg: "^1.3.0"`
	},

	// Cloud & Conectividade
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

	// Áudio, Voz & IA
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

	// Smart Home & Mesh
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

	// Drivers & Sensores
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

	// BSPs (Board Support Packages)
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

	// Sistema & Utilitários
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
