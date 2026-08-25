/*
 * Exemplo ESP-IoT-Solution para ESP32
 * Inicialização de Botão Inteligente com Callbacks e Driver de Display/Sensores
 * 
 * Dependência (idf_component.yml):
 *   espressif/button: "^3.3.0"
 *   espressif/led_indicator: "^1.2.0"
 */

#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "iot_button.h"
#include "led_indicator.h"

static const char *TAG = "iot_solution_app";

#define BUTTON_GPIO_NUM       0   // Botão BOOT nativo
#define LED_INDICATOR_GPIO    2   // LED indicador

static led_indicator_handle_t led_handle = NULL;

/* Callback para clique único do botão */
static void button_single_click_cb(void *arg, void *data)
{
    ESP_LOGI(TAG, "Evento: Clique Único detectado!");
    led_indicator_start(led_handle, BLINK_DOUBLE_FAST);
}

/* Callback para clique longo (> 3 segundos) */
static void button_long_press_cb(void *arg, void *data)
{
    ESP_LOGW(TAG, "Evento: Pressionamento Longo! Acionando modo de reset de fábrica.");
    led_indicator_start(led_handle, BLINK_BREATHE_FAST);
}

void app_main(void)
{
    ESP_LOGI(TAG, "Iniciando ESP-IoT-Solution Component Suite");

    // 1. Configuração do LED Indicator
    led_indicator_gpio_config_t led_cfg = {
        .is_active_level_high = true,
        .gpio_num = LED_INDICATOR_GPIO,
    };
    led_handle = led_indicator_create(&led_cfg);

    // 2. Configuração do Botão com debounce de hardware/software automático
    button_config_t btn_cfg = {
        .type = BUTTON_TYPE_GPIO,
        .long_press_time = 3000,
        .short_press_time = 180,
        .gpio_button_config = {
            .gpio_num = BUTTON_GPIO_NUM,
            .active_level = 0,
        },
    };

    button_handle_t btn_handle = iot_button_create(&btn_cfg);
    assert(btn_handle != NULL);

    // Registra callbacks para diferentes gestos
    iot_button_register_cb(btn_handle, BUTTON_SINGLE_CLICK, button_single_click_cb, NULL);
    iot_button_register_cb(btn_handle, BUTTON_LONG_PRESS_START, button_long_press_cb, NULL);

    ESP_LOGI(TAG, "Drivers inicializados com sucesso! Pressione o botão GPIO 0.");

    while (1) {
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}
