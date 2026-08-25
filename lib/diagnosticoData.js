/**
 * Base de dados estruturada para o Guia de Diagnóstico, Erros Comuns e Resolução de Problemas no ESP32.
 * Abrange 6 categorias técnicas com causas raízes, comparativos de boas práticas vs gambiarras e exemplos de código.
 */

export const categoriasDiagnostico = [
	{
		id: "alimentacao",
		nome: "Alimentação & Hardware",
		icone: "Zap",
		cor: "amber",
		descricao: "Quedas de tensão por picos de RF Wi-Fi/BLE, strapping pins conflitantes, ruído eletromagnético e problemas de LDO.",
	},
	{
		id: "cpu-panics",
		nome: "Pânicos de CPU & Guru Meditation",
		icone: "Cpu",
		cor: "red",
		descricao: "Ponteiros nulos, violações de memória (Load/StoreProhibited), instruções ilegais e cache panics em ISR.",
	},
	{
		id: "freertos",
		nome: "FreeRTOS & Multitarefa",
		icone: "Layers",
		cor: "purple",
		descricao: "Task Watchdog (TWDT), Interrupt Watchdog (IWDT), estouro de pilha (Stack Overflow) e bloqueios de escalonador.",
	},
	{
		id: "memoria",
		nome: "Memória, Heap & PSRAM",
		icone: "Activity",
		cor: "blue",
		descricao: "Fragmentação de Heap, vazamento de memória (Memory Leaks), alocações para DMA e limitações de PSRAM.",
	},
	{
		id: "boot-flash",
		nome: "Bootloader & Gravação",
		icone: "Terminal",
		cor: "emerald",
		descricao: "Falha de comunicação serial (DTR/RTS), erros de leitura SPI Flash, incompatibilidade de clock e partições.",
	},
	{
		id: "conectividade",
		nome: "Conectividade & Protocolos",
		icone: "Wifi",
		cor: "cyan",
		descricao: "Wi-Fi Beacon Timeout, falhas de handshake TLS/HTTPS por falta de relógio SNTP e instabilidade de sinal.",
	},
];

export const sintomasRapidos = [
	{ id: "bootloop", rotulo: "🔄 Reiniciando em loop (Bootloop)", categoria: "todos" },
	{ id: "wifi-crash", rotulo: "📶 Trava ao ligar Wi-Fi/BLE", categoria: "alimentacao" },
	{ id: "upload-fail", rotulo: "🔌 Falha ao gravar código (Upload)", categoria: "boot-flash" },
	{ id: "random-freeze", rotulo: "⏱️ Trava após minutos/horas", categoria: "memoria" },
	{ id: "null-pointer", rotulo: "💥 Guru Meditation (Crash)", categoria: "cpu-panics" },
	{ id: "wdt-reset", rotulo: "🐕 Watchdog Triggered", categoria: "freertos" },
	{ id: "tls-fail", rotulo: "🔒 Falha em HTTPS / SSL", categoria: "conectividade" },
];

export const errosCatalogo = [
	{
		id: "brownout-reset",
		titulo: "Brownout Detector Reset (Queda de Tensão)",
		categoria: "alimentacao",
		sintomas: ["bootloop", "wifi-crash"],
		gravidade: "Alta",
		logSerial: "Brownout detector was triggered\n\nrst:0xc (SW_CPU_RESET),boot:0x13 (SPI_FAST_FLASH_BOOT)",
		resumo: "A tensão de alimentação do ESP32 caiu abaixo do limiar operacional seguro (aproximadamente 2.8V ~ 2.43V).",
		causaRaiz:
			"Quando o rádio Wi-Fi ou BLE é ligado, o estágio de potência (PA) consome pulsos de corrente muito rápidos que podem superar 500mA em menos de 1 milissegundo. Se a fonte de alimentação, os cabos USB longos/finos, os trilhos de protoboard ou o regulador LDO não fornecerem corrente instantânea com baixa impedância, a tensão no pino 3V3 do chip afunda momentaneamente, disparando o circuito comparador interno de Brownout para evitar corrupção de memória Flash e estados indeterminados.",
		gambiarra: {
			titulo: "Desativar o Brownout por software",
			descricao: "Chamar WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0) para silenciar o erro no código.",
			consequencia: "Extremamente perigoso: o ESP32 continuará executando instruções sob subtensão, corrompendo a memória Flash SPI, travando registradores e causando comportamento imprevisível em campo sem aviso.",
		},
		solucaoEngenharia: {
			titulo: "Dimensionamento correto de hardware e desacoplamento",
			passos: [
				"Adicione um capacitor de tântalo ou cerâmico de 10µF a 100µF de baixo ESR (Low-ESR) em paralelo com um cerâmico de 100nF o mais próximo possível dos pinos 3V3 e GND do ESP32.",
				"Utilize reguladores LDO projetados para picos de no mínimo 600mA a 1A com excelente resposta a transitórios (ex: AP2112K, ME6211, TPS73733 ou XC6206 robusto). Evite clones de baixa qualidade do antigo AMS1117.",
				"Evite alimentar o ESP32 via trilhos compridos de protoboard com cabos jumper finos quando o Wi-Fi estiver transmitindo em potência máxima.",
			],
		},
		codigoArduino: `// NÃO desative o Brownout! Se precisar reduzir o pico em testes:
#include <WiFi.h>

void setup() {
  Serial.begin(115200);
  
  // Opcional: Reduzir ligeiramente a potência máxima de transmissão do Wi-Fi
  // de 20dBm para 17dBm diminui o pico de corrente em ~20%
  WiFi.setTxPower(WIFI_POWER_17dBm);
  WiFi.begin("SSID", "SENHA");
}`,
		codigoEspIdf: `// Configuração no ESP-IDF:
#include "esp_wifi.h"
#include "esp_log.h"

void app_main(void) {
    // No menuconfig: Component config -> ESP32-specific -> Hardware Brownout Reset (Mantenha sempre ATIVO)
    // Para mitigar picos em ambientes com limite de potência:
    esp_wifi_set_max_tx_power(68); // 68 = 17dBm (unidades de 0.25dBm)
}`,
		dicaPro: "Se estiver projetando sua própria PCB, coloque um plano de terra sólido sob o módulo e trilhas de alimentação com largura mínima de 0.5mm a 1mm para suportar os surtos de corrente sem queda resistiva (IR drop).",
	},
	{
		id: "strapping-pins",
		titulo: "Conflito de Strapping Pins no Boot",
		categoria: "alimentacao",
		sintomas: ["bootloop", "upload-fail"],
		gravidade: "Crítica",
		logSerial: "rst:0x1 (POWERON_RESET),boot:0x12 (SPI_FAST_FLASH_BOOT)\nflash read err, 1000\nwaiting for download",
		resumo: "O ESP32 não inicializa o firmware da Flash ou entra acidentalmente em modo de download porque um pino de strapping foi forçado a um nível lógico incorreto no reset.",
		causaRaiz:
			"No momento exato em que o pino EN/CHIP_PU sobe (Power-On Reset), a CPU amostra o estado de pinos específicos (Strapping Pins) para configurar tensão de Flash (1.8V vs 3.3V), modo de boot (Download UART vs SPI Flash) e saída de clock. Se você conectar sensores, relés ou LEDs com pull-up/pull-down nesses pinos, o microcontrolador lerá um nível lógico inválido e travará o boot.",
		gambiarra: {
			titulo: "Colocar delays no código ou desconectar na mão toda vez que liga",
			descricao: "Tentar tratar o problema via software no setup() ou depender de desconectar fios manualmente antes de cada reinicialização.",
			consequencia: "Inútil: os Strapping Pins são lidos por hardware antes mesmo da CPU carregar qualquer linha do seu código ou do bootloader.",
		},
		solucaoEngenharia: {
			titulo: "Mapeamento seguro de GPIOs e isolamento no reset",
			passos: [
				"ESP32 Clássico: Evite usar GPIO 0 (Boot), GPIO 2 (deve estar LOW ou flutuando no flash), GPIO 12 (define tensão de Flash: se puxado para HIGH no reset, queima/trava a flash de 3.3V) e GPIO 15 (silencia mensagens de log de boot se LOW).",
				"ESP32-C3: Evite puxar GPIO 8 para LOW ou GPIO 9 para LOW no reset.",
				"ESP32-S3: Atenção com GPIO 0, GPIO 45 (tensão VDD_SPI) e GPIO 46.",
				"Se for estritamente necessário usar esses pinos para periféricos, utilize transistores ou buffers para isolá-los até que o sinal EN esteja totalmente estabilizado.",
			],
		},
		codigoArduino: `// RECOMENDAÇÃO DE PINAGEM SEGURA (ESP32 Clássico):
// Pinos ideais para I2C / SPI / Sensores gerais:
// SDA: GPIO 21 | SCL: GPIO 22
// SPI: MOSI 23 | MISO 19 | SCK 18 | CS 5

// ATENÇÃO: GPIOs 34, 35, 36 (VP), 39 (VN) são APENAS ENTRADA (sem pull-up interno).
// Nunca tente usá-los como pinMode(..., OUTPUT); nem para I2C/SPI.`,
		codigoEspIdf: `// No ESP-IDF, proteja a configuração de tensão de Flash via eFuse (CUIDADO: IRREVERSÍVEL):
// Se você usa ESP32 clássico e precisa liberar GPIO12, pode queimar o eFuse de 3.3V:
// espefuse.py --port /dev/ttyUSB0 set_flash_voltage 3.3V
// Isso desativa a amostragem de hardware no GPIO12 para sempre.`,
		dicaPro: "Lembre-se sempre: pinos 'Input-Only' (GPI 34 a 39 no ESP32 clássico) não possuem circuitos de pull-up/pull-down de silício nem transistores de saída. Sensores analógicos ou botões neles exigem resistores de pull-up externos.",
	},
	{
		id: "guru-load-prohibited",
		titulo: "Guru Meditation: LoadProhibited / StoreProhibited",
		categoria: "cpu-panics",
		sintomas: ["bootloop", "null-pointer"],
		gravidade: "Crítica",
		logSerial: "Guru Meditation Error: Core  0 panic'ed (LoadProhibited). Exception was unhandled.\nCore 0 register dump:\nPC      : 0x400d14bc  PS      : 0x00060830  A0      : 0x800d1512  A1      : 0x3ffb1f20  \nEXCVADDR: 0x00000000",
		resumo: "A CPU tentou ler (Load) ou escrever (Store) em um endereço de memória inacessível ou inválido, tipicamente o endereço nulo 0x00000000.",
		causaRaiz:
			"Essa é a clássica desreferência de ponteiro nulo (Null Pointer Dereference) ou uso de ponteiro solto (Dangling Pointer). O registrador EXCVADDR indica o endereço que causou a falha: se EXCVADDR for 0x00000000 ou muito próximo de zero (ex: 0x00000008, que é um offset de struct), significa que você tentou acessar membros de um objeto/ponteiro que não foi inicializado ou cujo malloc/criação falhou.",
		gambiarra: {
			titulo: "Adicionar delays aleatórios ou reiniciar no loop sem tratar",
			descricao: "Achar que é problema de temporização e encher o código de delay() ou mascarar o reinício automático sem investigar a causa.",
			consequencia: "O sistema continuará quebrando aleatoriamente em produção quando a condição de ponteiro nulo se repetir.",
		},
		solucaoEngenharia: {
			titulo: "Validação defensiva e Decodificação de Backtrace",
			passos: [
				"Verifique sempre se retornos de funções de alocação ou busca (malloc, WiFi.client(), JSON parsing, xQueueReceive) não retornaram NULL antes de acessar seus campos.",
				"Instale o 'Espressif Exception Decoder' na sua IDE (Arduino IDE / PlatformIO) ou use o comando 'xtensa-esp32-elf-addr2line -pfia -e firmware.elf 0x400d14bc' para descobrir exatamente a linha do seu código .c/.cpp onde o crash aconteceu.",
				"No ESP-IDF, execute 'idf.py monitor' que decodifica o backtrace de pilha automaticamente em tempo real.",
			],
		},
		codigoArduino: `// PROGRAMAÇÃO DEFENSIVA:
struct SensorData {
  float temperatura;
  float umidade;
};

void processarSensor(SensorData* sensor) {
  // Verificação obrigatória contra LoadProhibited:
  if (sensor == nullptr) {
    Serial.println("[ERRO] Ponteiro de sensor nulo!");
    return;
  }
  
  Serial.printf("Temp: %.1f C\\n", sensor->temperatura);
}`,
		codigoEspIdf: `// No ESP-IDF, use ESP_ERROR_CHECK ou assertivas explícitas:
#include "esp_log.h"
#include "esp_check.h"

static const char* TAG = "SENSOR";

esp_err_t ler_dado(char* buffer, size_t max_len) {
    ESP_RETURN_ON_FALSE(buffer != NULL, ESP_ERR_INVALID_ARG, TAG, "Buffer nulo fornecido!");
    // Operação segura...
    return ESP_OK;
}`,
		dicaPro: "Se EXCVADDR for algo como 0x3fxxxxxx ou 0x40xxxxxx mas seu código falha, você pode estar acessando um array fora do limite (buffer overflow) que sobrescreveu ponteiros na memória.",
	},
	{
		id: "guru-iram-cache",
		titulo: "Cache Error / InstructionFetchError em ISRs",
		categoria: "cpu-panics",
		sintomas: ["bootloop", "null-pointer"],
		gravidade: "Alta",
		logSerial: "Guru Meditation Error: Core  0 panic'ed (Cache disabled but cached memory region accessed)\nGuru Meditation Error: Core  0 panic'ed (InstructionFetchError)",
		resumo: "Uma rotina de interrupção (ISR) tentou executar código ou ler dados da Flash SPI enquanto a Flash estava desativada para uma operação de escrita/leitura.",
		causaRaiz:
			"Por padrão, o código do ESP32 fica armazenado na memória Flash externa e é carregado sob demanda para a CPU através da memória Cache interna. Quando o ESP32 grava dados na Flash (como em gravações NVS, LittleFS, SPIFFS ou atualização OTA), o controlador desativa o Cache de instruções temporariamente. Se uma interrupção de hardware (timer, GPIO, etc.) disparar nesse instante e a função ISR estiver na Flash, a CPU não consegue buscar a próxima instrução e entra em pânico imediato.",
		gambiarra: {
			titulo: "Desativar interrupções antes de gravar na Flash",
			descricao: "Tentar envolver operações de gravação de arquivos em blocos de noInterrupts() indiscriminadamente.",
			consequencia: "Gera perda de pulsos de sensores de alta velocidade, instabilidade nos timers do sistema e potenciais estouros de Watchdog.",
		},
		solucaoEngenharia: {
			titulo: "Alocar ISRs e constantes em IRAM / DRAM",
			passos: [
				"Decore TODA função de callback de interrupção com o atributo IRAM_ATTR (ou IRAM_ATTR static void...).",
				"Garanta que variáveis ou strings acessadas dentro da ISR também residam em DRAM (evite usar strings literais diretas dentro da ISR sem a tag DRAM_ATTR no ESP-IDF).",
				"Nunca chame funções pesadas de bibliotecas externas (como Serial.print ou cálculos de float pesados) dentro de uma ISR.",
			],
		},
		codigoArduino: `// ISR declarada corretamente na IRAM:
volatile uint32_t contadorPulsos = 0;

void IRAM_ATTR tratarInterrupcaoGPIO() {
  contadorPulsos++;
}

void setup() {
  pinMode(4, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(4), tratarInterrupcaoGPIO, FALLING);
}`,
		codigoEspIdf: `// No ESP-IDF:
#include "esp_attr.h"
#include "driver/gpio.h"

static volatile uint32_t pulsos = 0;

// Função colocada explicitamente na memória interna IRAM:
static void IRAM_ATTR gpio_isr_handler(void* arg) {
    pulsos++;
}

void app_main(void) {
    gpio_install_isr_service(ESP_INTR_FLAG_IRAM);
    gpio_isr_handler_add(GPIO_NUM_4, gpio_isr_handler, NULL);
}`,
		dicaPro: "Se você passar ESP_INTR_FLAG_IRAM ao registrar a interrupção no ESP-IDF, qualquer função chamada por essa interrupção (inclusive funções do FreeRTOS) DEVE suportar IRAM (ex: xQueueSendFromISR).",
	},
	{
		id: "freertos-twdt",
		titulo: "Task Watchdog Timer (TWDT) Timeout",
		categoria: "freertos",
		sintomas: ["bootloop", "wdt-reset"],
		gravidade: "Crítica",
		logSerial: "E (10532) task_wdt: Task watchdog got triggered. The following tasks/users did not reset the watchdog in time:\nE (10532) task_wdt:  - IDLE0 (CPU 0)\nTask watchdog got triggered. System will be reset.",
		resumo: "Uma tarefa de alta prioridade entrou em um loop bloqueante e não cedeu tempo de CPU, impedindo que a tarefa IDLE alimente o cão de guarda.",
		causaRaiz:
			"O FreeRTOS no ESP32 executa uma tarefa essencial de prioridade 0 chamada IDLE em cada núcleo de CPU. O Task Watchdog monitora se a tarefa IDLE consegue rodar periodicamente (por padrão, a cada 5 segundos). Se você criar uma tarefa com prioridade >= 1 que contenha um loop while(1) sem nenhuma chamada bloqueante (vTaskDelay, leitura de fila, semáforo), a CPU fica 100% ocupada e o Watchdog dispara um reset de emergência.",
		gambiarra: {
			titulo: "Desabilitar o Task Watchdog no menuconfig ou aumentar para 60s",
			descricao: "Desligar o TWDT para o código parar de reiniciar.",
			consequencia: "Se o seu código travar em um loop infinito ou deadlock, o microcontrolador ficará congelado para sempre, exigindo que alguém vá até o local desligar da tomada.",
		},
		solucaoEngenharia: {
			titulo: "Arquitetura orientada a eventos e concessão de CPU (Yield)",
			passos: [
				"Nunca utilize loops de espera ativa vazios while(!condicao); em tarefas FreeRTOS.",
				"Sempre insira vTaskDelay(pdMS_TO_TICKS(10)) ou espere por um evento através de xQueueReceive(), ulTaskNotifyTake() ou xSemaphoreTake() com timeout.",
				"Se for necessário executar um processamento matemático contínuo e pesado, alimente o Watchdog explicitamente com esp_task_wdt_reset().",
			],
		},
		codigoArduino: `// FORMA CORRETA NO ARDUINO COM FREERTOS:
void minhaTarefa(void *pvParameters) {
  for (;;) {
    // Executa a leitura do sensor
    float valor = analogRead(36);
    
    // LIBERA a CPU para o FreeRTOS e a tarefa IDLE:
    vTaskDelay(pdMS_TO_TICKS(100)); // Aguarda 100ms de forma não-bloqueante
  }
}`,
		codigoEspIdf: `// ESP-IDF com Task Watchdog:
#include "esp_task_wdt.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

void tarefa_processamento(void *pvParameters) {
    // Opcional: Inscrever a própria tarefa no TWDT
    esp_task_wdt_add(NULL);

    while (1) {
        // Processamento...
        
        // Alimenta o Watchdog se o bloco for longo:
        esp_task_wdt_reset();
        vTaskDelay(pdMS_TO_TICKS(50));
    }
}`,
		dicaPro: "No Arduino, a função delay(ms) na verdade chama internamente o vTaskDelay do FreeRTOS. Porém, loops que usam delayMicroseconds() ou operações puras de CPU não cedem tempo e podem disparar o TWDT se durarem mais de alguns segundos.",
	},
	{
		id: "freertos-stack-overflow",
		titulo: "Stack Overflow (Estouro de Pilha da Tarefa)",
		categoria: "freertos",
		sintomas: ["bootloop", "null-pointer"],
		gravidade: "Crítica",
		logSerial: "Guru Meditation Error: Core  1 panic'ed (Unhandled debug exception).\nDebug exception reason: Stack canary watchpoint triggered (minha_tarefa)",
		resumo: "A tarefa consumiu mais memória de pilha (Stack) do que a quantidade alocada em sua criação, corrompendo o canário de proteção do RTOS.",
		causaRaiz:
			"Cada tarefa no FreeRTOS recebe um bloco fixo de memória contígua para suas variáveis locais, argumentos de funções e endereços de retorno de chamadas. Se você declarar arrays grandes (ex: char buffer[2048];), instanciar buffers JSON pesados (ex: DynamicJsonDocument doc(4096);), ou fizer chamadas recursivas profundas dentro de uma tarefa configurada com stack padrão de 2048 bytes, a pilha ultrapassa o limite e sobrescreve áreas críticas do sistema.",
		gambiarra: {
			titulo: "Colocar 64KB de stack em todas as tarefas sem critério",
			descricao: "Alocar stacks gigantescas para não se preocupar com estouro.",
			consequencia: "A memória interna SRAM do ESP32 (cerca de 320KB úteis) se esgotará rapidamente, causando falhas de inicialização do Wi-Fi e alocação de heap.",
		},
		solucaoEngenharia: {
			titulo: "Dimensionamento consciente e monitoramento com HighWaterMark",
			passos: [
				"Meça o consumo real da pilha usando a função uxTaskGetStackHighWaterMark(). Ela retorna o menor número de bytes/words livres restantes que a pilha teve desde o boot.",
				"Mova buffers volumosos da pilha para a Heap dinâmica (usando malloc/free temporário) ou declare-os como static fora do escopo da função se forem reutilizados.",
				"Tarefas que utilizam conexões seguras TLS/HTTPS ou MQTT com SSL exigem no mínimo 6KB a 8KB de stack devido à complexidade das rotinas criptográficas do MbedTLS.",
			],
		},
		codigoArduino: `// MONITORANDO O STACK NO ARDUINO:
void tarefaSensor(void *pvParameters) {
  for (;;) {
    // Código da tarefa...
    
    // Verifica o espaço livre mínimo da pilha (em Words no FreeRTOS clássico / Bytes no ESP32)
    UBaseType_t espacoLivre = uxTaskGetStackHighWaterMark(NULL);
    Serial.printf("[STACK] Espaço livre mínimo: %d bytes\\n", (int)espacoLivre);
    
    vTaskDelay(pdMS_TO_TICKS(5000));
  }
}

void setup() {
  Serial.begin(115200);
  // Aloca 4096 bytes (4KB) de forma equilibrada:
  xTaskCreatePinnedToCore(tarefaSensor, "tarefaSensor", 4096, NULL, 1, NULL, 1);
}`,
		codigoEspIdf: `// Habilite a checagem dupla de Stack no menuconfig:
// Component config -> FreeRTOS -> Set a end of stack check -> Option 2 (Check by Stack Canary)
// Isso detecta o estouro ANTES que dados sejam corrompidos em tempo de execução.`,
		dicaPro: "Se a sua função precisa processar um JSON ou pacote HTTP esporadicamente, aloque o buffer no Heap apenas durante o processamento e libere-o logo em seguida, em vez de inflar o Stack permanente da tarefa.",
	},
	{
		id: "memoria-fragmentacao-heap",
		titulo: "Fragmentação de Heap e Memory Leaks",
		categoria: "memoria",
		sintomas: ["random-freeze", "tls-fail"],
		gravidade: "Alta",
		logSerial: "E (45892) mbedtls: mbedtls_ssl_setup returned -0x7f00\nE (45892) esp-tls: create_ssl_handle failed\nE (45893) HTTP_CLIENT: Connection failed, out of memory",
		resumo: "O microcontrolador falha ao alocar memória mesmo reportando uma quantidade total de memória livre aparentemente alta.",
		causaRaiz:
			"A memória Heap fica fragmentada quando ocorrem milhares de alocações e desalocações de tamanhos variados ao longo do tempo (muito comum ao usar objetos String do Arduino com concatenação contínua de texto em loops). O heap se divide em pequenos blocos livres separados por blocos ocupados. Quando o driver de Wi-Fi ou a biblioteca TLS precisa de um único bloco contíguo de 40KB para o buffer de criptografia SSL, o malloc falha mesmo que existam 100KB de memória livre total dispersa.",
		gambiarra: {
			titulo: "Reiniciar o ESP32 periodicamente com ESP.restart() a cada X horas",
			descricao: "Agendar um reboot diário para limpar a memória fragmentada.",
			consequencia: "Apenas camufla o defeito: em condições de pico de requisições o dispositivo cairá muito antes do reboot programado.",
		},
		solucaoEngenharia: {
			titulo: "Evitar strings dinâmicas e utilizar buffers estáticos pré-alocados",
			passos: [
				"No Arduino, evite a classe String. Utilize buffers de caracteres em estilo C (char buffer[128];) com funções seguras como snprintf().",
				"Monitore a fragmentação acompanhando a relação entre a memória livre total (heap_caps_get_free_size) e o maior bloco contíguo livre (heap_caps_get_largest_free_block).",
				"Em firmwares complexos no ESP-IDF, ative o Heap Memory Tracing (CONFIG_HEAP_TRACING) para listar exatamente quais arquivos e linhas esqueceram de chamar free().",
			],
		},
		codigoArduino: `// COMPARAÇÃO:
// ❌ EVITE (Gera fragmentação severa de Heap):
// String json = "{\\"temp\\":";
// json += String(temperatura) + "}";

// ✅ CORRETO (Sem alocação dinâmica no Heap):
char payload[64];
snprintf(payload, sizeof(payload), "{\\"temp\\":%.2f,\\"umid\\":%.2f}", temperatura, umidade);

// Monitoramento:
Serial.printf("Heap Livre: %u | Maior Bloco: %u\\n",
              ESP.getFreeHeap(),
              ESP.getMaxAllocHeap());`,
		codigoEspIdf: `// Monitoramento de Heap no ESP-IDF:
#include "esp_heap_caps.h"
#include "esp_log.h"

void inspecionar_memoria(void) {
    size_t livre_total = heap_caps_get_free_size(MALLOC_CAP_8BIT);
    size_t maior_bloco = heap_caps_get_largest_free_block(MALLOC_CAP_8BIT);
    
    ESP_LOGI("HEAP", "Total livre: %d bytes | Maior bloco continuo: %d bytes", livre_total, maior_bloco);
}`,
		dicaPro: "Se o maior bloco contíguo livre for menor que 35KB ~ 40KB, conexões HTTPS/TLS modernas falharão durante o handshake de certificados.",
	},
	{
		id: "memoria-dma-psram",
		titulo: "Falha de Alocação DMA em Memória Externa (PSRAM)",
		categoria: "memoria",
		sintomas: ["bootloop", "random-freeze"],
		gravidade: "Alta",
		logSerial: "E (1204) spi_master: spi_bus_initialize: DMA channel not compatible with external RAM buffer\nESP_ERROR_CHECK failed: esp_err_t 0x102 (ESP_ERR_INVALID_ARG)",
		resumo: "O firmware tentou passar um buffer alocado em PSRAM externa para um periférico com DMA (SPI, I2S, LCD, SDMMC) que só tem acesso à SRAM interna.",
		causaRaiz:
			"Nos chips da família ESP32 (especialmente ESP32 clássico, ESP32-S2 e ESP32-S3 com barramento padrão), o controlador de DMA dos periféricos não possui barramento físico com acesso direto à memória PSRAM externa conectada via SPI/QSPI. O DMA exige que os buffers de transmissão e recepção estejam obrigatoriamente localizados na SRAM interna do chip.",
		gambiarra: {
			titulo: "Desativar o DMA nos periféricos",
			descricao: "Configurar o barramento SPI/I2S para operar em modo por polling sem DMA.",
			consequencia: "A taxa de transferência cai drasticamente e a CPU fica 100% ocupada durante o envio de frames para displays ou streaming de áudio.",
		},
		solucaoEngenharia: {
			titulo: "Alocação explícita com MALLOC_CAP_DMA e MALLOC_CAP_INTERNAL",
			passos: [
				"Sempre aloque buffers dedicados a DMA utilizando a função heap_caps_malloc(tamanho, MALLOC_CAP_DMA | MALLOC_CAP_INTERNAL).",
				"Mantenha dados pesados não-DMA (como imagens decodificadas, modelos de machine learning e áudio em repouso) na PSRAM, e copie blocos menores para buffers de DMA internos sob demanda (ping-pong buffering).",
			],
		},
		codigoArduino: `// Alocando buffer para DMA no Arduino ESP32:
#include <esp_heap_caps.h>

uint8_t* dmaBuffer = nullptr;

void setup() {
  size_t tamanho = 4096;
  // Garante que o buffer reside na SRAM interna compatível com DMA:
  dmaBuffer = (uint8_t*) heap_caps_malloc(tamanho, MALLOC_CAP_DMA | MALLOC_CAP_INTERNAL);
  
  if (dmaBuffer == nullptr) {
    Serial.println("[ERRO] Falha ao alocar buffer DMA na memória interna!");
  }
}`,
		codigoEspIdf: `// ESP-IDF:
#include "esp_heap_caps.h"

uint8_t* alocar_buffer_spi(size_t len) {
    return (uint8_t*) heap_caps_aligned_alloc(4, len, MALLOC_CAP_DMA | MALLOC_CAP_INTERNAL);
}`,
		dicaPro: "No ESP32-P4, a arquitetura avançada de barramento AXI permite DMA em certas regiões externas, mas para toda a linha ESP32/S2/S3/C3 a regra da SRAM interna é estrita.",
	},
	{
		id: "boot-failed-connect",
		titulo: "Failed to connect to ESP32: Timed out waiting for packet header",
		categoria: "boot-flash",
		sintomas: ["upload-fail"],
		gravidade: "Média",
		logSerial: "A fatal error occurred: Failed to connect to ESP32: Timed out waiting for packet header\nesptool.py v4.6\nConnecting...................",
		resumo: "A ferramenta de gravação (esptool / Arduino IDE / PlatformIO) não conseguiu colocar o microcontrolador no modo de bootloader UART.",
		causaRaiz:
			"Para iniciar a gravação do firmware, o chip de conversão USB-Serial (CH340, CP2102, FTDI) utiliza as linhas DTR e RTS para puxar o pino GPIO 0 para LOW enquanto pulsa o pino EN/RST para LOW e depois HIGH. Em muitas placas de desenvolvimento populares, o circuito de temporização RC (resistor-capacitor) do pino EN não possui capacitância suficiente para segurar o reset durante a transição do sinal DTR.",
		gambiarra: {
			titulo: "Ficar segurando o botão BOOT com o dedo a cada upload",
			descricao: "Pressionar o botão físico BOOT/GPIO0 toda vez que o compilador terminar de gerar o binário.",
			consequencia: "Inconveniente para desenvolvimento ágil e impossível em placas seladas ou embutidas dentro de gabinetes.",
		},
		solucaoEngenharia: {
			titulo: "Capacitor de 10µF no pino EN ou verificação do cabo de dados",
			passos: [
				"Conecte um capacitor eletrolítico ou cerâmico de 10µF (ou 1µF a 10µF) entre o pino EN (RST) e o GND da placa. Isso estabiliza a rampa de reset automático.",
				"Verifique se o cabo USB possui linhas de dados (D+ e D-) ativas. Muitos cabos de carregador de celular baratos possuem apenas os fios de alimentação VBUS e GND.",
				"No Linux, certifique-se de que seu usuário pertence ao grupo 'dialout' (sudo usermod -a -G dialout $USER) e que o serviço 'brltty' não está sequestrando a porta serial.",
			],
		},
		codigoArduino: `// Dica de Linha de Comando para testar a comunicação serial com o esptool:
// python -m esptool --port /dev/ttyUSB0 chip_id
// Se retornar o MAC e o modelo do chip, a comunicação física está perfeita.`,
		codigoEspIdf: `// No ESP-IDF:
// idf.py -p /dev/ttyUSB0 -b 460800 flash
// Se o upload falhar em altas velocidades, reduza a taxa de baud rate para 115200:
// idf.py -p /dev/ttyUSB0 -b 115200 flash`,
		dicaPro: "Se estiver usando módulos ESP32-S3 ou C3 com USB nativo (Direct USB-JTAG), certifique-se de que a porta correta selecionada é a porta CDC/JTAG e não a UART legada.",
	},
	{
		id: "tls-sntp-clock-fail",
		titulo: "Falha de Handshake TLS/HTTPS por Relógio Desincronizado",
		categoria: "conectividade",
		sintomas: ["tls-fail", "random-freeze"],
		gravidade: "Alta",
		logSerial: "E (15420) esp-tls-mbedtls: mbedtls_ssl_handshake returned -0x2700\nE (15420) esp-tls: Failed to verify peer certificate!\nE (15421) esp-tls: Verification info: The certificate is not yet valid (or has expired)",
		resumo: "Conexões seguras HTTPS, AWS IoT, MQTT com TLS ou APIs Web falham porque o relógio interno do ESP32 está na data padrão de 01/01/1970.",
		causaRaiz:
			"Certificados de segurança digitais (X.509 SSL/TLS) possuem um período estrito de validade (Not Before e Not After). Como o ESP32 não possui uma bateria de RTC externa por padrão, ao ligar seu relógio interno sempre inicia na época Unix zero (1970). Quando o cliente MbedTLS valida a data do certificado do servidor, considera que o certificado 'ainda não é válido' (pois 2026 é no futuro em relação a 1970) e aborta a conexão criptografada imediatamente com o erro -0x2700 (MBEDTLS_ERR_X509_CERT_VERIFY_FAILED).",
		gambiarra: {
			titulo: "Desativar a validação de certificados SSL (Insecure / No-Verify)",
			descricao: "Usar client.setInsecure() no Arduino ou desabilitar checagem de CA no ESP-IDF.",
			consequencia: "Abre brecha gravíssima de segurança: seu dispositivo fica vulnerável a ataques de Man-in-the-Middle (MitM), permitindo que invasores interceptem senhas e firmwares.",
		},
		solucaoEngenharia: {
			titulo: "Sincronização obrigatória de data e hora via SNTP antes de conexões TLS",
			passos: [
				"Logo após obter IP no Wi-Fi, inicie o cliente SNTP apontando para servidores confiáveis (ex: pool.ntp.br, time.google.com).",
				"Aguarde o status do relógio atingir o estado sincronizado antes de iniciar a primeira conexão HTTPS/MQTT.",
				"Configure o fuso horário (Timezone) correto para formatar logs com horários precisos.",
			],
		},
		codigoArduino: `// SINCRONIZAÇÃO SNTP ANTES DO HTTPS NO ARDUINO:
#include <WiFi.h>
#include <time.h>

void sincronizarRelogio() {
  // Configura servidores NTP (NTP Brasil e Google)
  configTime(-3 * 3600, 0, "a.st1.ntp.br", "time.google.com");
  
  Serial.print("Aguardando sincronizacao de horario");
  time_t now = time(nullptr);
  // Ano 2020 em Unix time é 1577836800. Se for menor, ainda está em 1970:
  while (now < 1577836800) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }
  Serial.println("\\n[OK] Horario sincronizado! Conexoes TLS liberadas.");
}`,
		codigoEspIdf: `// SNTP no ESP-IDF:
#include "esp_sntp.h"
#include "esp_log.h"

void inicializar_sntp(void) {
    ESP_LOGI("SNTP", "Iniciando cliente SNTP...");
    esp_sntp_setoperatingmode(SNTP_OPMODE_POLL);
    esp_sntp_setservername(0, "pool.ntp.br");
    esp_sntp_init();
    
    // Aguarda sincronização do relógio...
}`,
		dicaPro: "Se seu projeto opera em ambientes sem acesso à internet externa (rede local isolada), configure um servidor NTP local no roteador ou adicione um módulo RTC físico como o DS3231 via I2C.",
	},
];

export const regrasDecodificadorLog = [
	{
		padrao: /Brownout detector was triggered/i,
		titulo: "Brownout Detector (Subtensão Crítica)",
		tipo: "Alimentação / Hardware",
		explicacao:
			"A tensão no pino 3V3 do ESP32 caiu abaixo do nível seguro (geralmente por pico de corrente do rádio Wi-Fi/BLE ou fonte subdimensionada).",
		acaoRecomendada:
			"Adicione capacitor de 10µF a 100µF Low-ESR no VCC, use fonte estável e verifique o regulador LDO.",
	},
	{
		padrao: /LoadProhibited|StoreProhibited/i,
		titulo: "Guru Meditation: Load/StoreProhibited (Ponteiro Nulo ou Inválido)",
		tipo: "CPU Panic / Exceção",
		explicacao:
			"Tentativa de ler ou gravar em um endereço inválido na memória (quase sempre desreferência de ponteiro NULL ou array fora de limite).",
		acaoRecomendada:
			"Decodifique o Backtrace com o Exception Decoder ou 'addr2line' para identificar a linha exata. Adicione checagens defensivas `if (ptr != NULL)`.",
	},
	{
		padrao: /Cache disabled but cached memory region accessed|InstructionFetchError/i,
		titulo: "Cache Error em Interrupção (ISR fora da IRAM)",
		tipo: "CPU Panic / Flash",
		explicacao:
			"Uma rotina de interrupção (ISR) tentou rodar a partir da memória Flash enquanto ela estava ocupada gravando dados (NVS, LittleFS ou OTA).",
		acaoRecomendada:
			"Adicione o atributo `IRAM_ATTR` na função de interrupção e garanta que ela não acesse variáveis na Flash sem DRAM_ATTR.",
	},
	{
		padrao: /Task watchdog got triggered/i,
		titulo: "Task Watchdog Timer (TWDT) Timeout",
		tipo: "FreeRTOS / Multitarefa",
		explicacao:
			"Uma tarefa de prioridade alta monopolizou a CPU sem ceder tempo (sem vTaskDelay ou bloqueio), impedindo o watchdog da tarefa IDLE.",
		acaoRecomendada:
			"Adicione `vTaskDelay(pdMS_TO_TICKS(10))` em loops longos ou use filas/semáforos em vez de loops `while(1)` contínuos.",
	},
	{
		padrao: /Stack canary watchpoint triggered/i,
		titulo: "Stack Overflow (Estouro de Pilha da Tarefa)",
		tipo: "FreeRTOS / Memória",
		explicacao:
			"A tarefa excedeu a quantidade de memória de pilha (Stack) alocada na sua criação, corrompendo o canário de proteção.",
		acaoRecomendada:
			"Aumente o tamanho da pilha no `xTaskCreate` (ex: de 2048 para 4096 bytes) e mova arrays grandes para o Heap ou variáveis estáticas.",
	},
	{
		padrao: /Timed out waiting for packet header|Failed to connect to ESP32/i,
		titulo: "Falha de Conexão UART / Upload",
		tipo: "Bootloader / Conexão",
		explicacao:
			"O computador não conseguiu colocar o ESP32 em modo de gravação via DTR/RTS ou o cabo USB não possui linhas de dados.",
		acaoRecomendada:
			"Coloque um capacitor de 10µF entre o pino EN e o GND, troque o cabo USB por um com fios de dados e teste segurar o botão BOOT durante a conexão.",
	},
	{
		padrao: /The certificate is not yet valid|-0x2700/i,
		titulo: "Falha de Certificado SSL/TLS (Relógio em 1970)",
		tipo: "Conectividade / TLS",
		explicacao:
			"O ESP32 tentou autenticar um certificado HTTPS/TLS com a data zerada na época Unix (01/01/1970).",
		acaoRecomendada:
			"Sincronize o horário via SNTP (`configTime`) antes de iniciar requisições HTTPS seguras.",
	},
	{
		padrao: /rst:0x1 \(POWERON_RESET\),boot:0x[0-9a-fA-F]+/i,
		titulo: "Reset por Power-On / Strapping Pins",
		tipo: "Hardware / Boot",
		explicacao:
			"O microcontrolador reiniciou e reportou o registrador de strapping pins. Se travar após isso, um pino de boot pode estar em nível lógico incorreto.",
		acaoRecomendada:
			"Verifique se GPIOs como 0, 2, 12, 15 (ESP32) ou 8, 9 (C3) estão conectados a resistores ou periféricos que forçam níveis inadequados no boot.",
	},
];
