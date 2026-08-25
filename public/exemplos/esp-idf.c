/*
 * Exemplo ESP-IDF v5.x+ para ESP32
 * Demonstração de inicialização do sistema, gerenciamento de tarefas FreeRTOS e log unificado
 * 
 * Gerenciamento de componentes (main/idf_component.yml):
 *   dependencies:
 *     espressif/led_strip: "^2.5.0"
 */

#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "esp_log.h"
#include "esp_system.h"
#include "esp_chip_info.h"

static const char *TAG = "main_app";

#define BLINK_GPIO  GPIO_NUM_2  // Ajuste conforme o pino do LED da sua placa

static void blink_task(void *pvParameters)
{
    // Configura o pino GPIO com a nova API do ESP-IDF
    gpio_reset_pin(BLINK_GPIO);
    gpio_set_direction(BLINK_GPIO, GPIO_MODE_OUTPUT);

    bool led_state = false;

    while (1) {
        led_state = !led_state;
        gpio_set_level(BLINK_GPIO, led_state);
        
        ESP_LOGI(TAG, "LED %s | Heap livre: %lu bytes", 
                 led_state ? "LIGADO" : "DESLIGADO", 
                 (unsigned long)esp_get_free_heap_size());
                 
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}

void app_main(void)
{
    // Informações do chip SoC
    esp_chip_info_t chip_info;
    esp_chip_info(&chip_info);

    ESP_LOGI(TAG, "===========================================");
    ESP_LOGI(TAG, "  Iniciando ESP-IDF v5.x Modern Application ");
    ESP_LOGI(TAG, "  Modelo do Chip: %d | Núcleos: %d | Rev: %d", 
             chip_info.model, chip_info.cores, chip_info.revision);
    ESP_LOGI(TAG, "===========================================");

    // Cria uma tarefa FreeRTOS dedicada
    xTaskCreate(blink_task, "blink_task", 3072, NULL, 5, NULL);
}
