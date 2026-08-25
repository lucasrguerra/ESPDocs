/*
 * Exemplo ESP-RainMaker para ESP32
 * Dispositivo: Interruptor Inteligente com controle via App e Nuvem
 * 
 * Dependência (idf_component.yml):
 *   espressif/esp_rainmaker: "^1.4.0"
 */

#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "nvs_flash.h"

#include <esp_rmaker_core.h>
#include <esp_rmaker_standard_params.h>
#include <esp_rmaker_standard_devices.h>
#include <app_wifi.h>

static const char *TAG = "app_rainmaker";
static esp_rmaker_device_t *switch_device;

/* Callback acionado quando o usuário altera o estado no App móvel */
static esp_err_t write_cb(const esp_rmaker_device_t *dev, const esp_rmaker_param_val_t val, void *priv_data, esp_rmaker_write_ctx_t *ctx)
{
    if (ctx) {
        ESP_LOGI(TAG, "Comando recebido via %s", esp_rmaker_device_cb_src_to_str(ctx->src));
    }
    
    bool state = val.val.b;
    ESP_LOGI(TAG, "Estado do interruptor alterado para: %s", state ? "LIGADO" : "DESLIGADO");
    
    // Atualiza o parâmetro na nuvem e no aplicativo
    esp_rmaker_param_update_and_report(priv_data, val);
    return ESP_OK;
}

void app_main(void)
{
    // Inicialização da memória não-volátil (NVS)
    esp_err_t err = nvs_flash_init();
    if (err == ESP_ERR_NVS_NO_FREE_PAGES || err == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        err = nvs_flash_init();
    }
    ESP_ERROR_CHECK(err);

    // Inicializa o provisionamento Wi-Fi
    app_wifi_init();

    // Configura o nó RainMaker
    esp_rmaker_config_t rainmaker_cfg = {
        .enable_time_sync = true,
    };
    esp_rmaker_node_t *node = esp_rmaker_node_init(&rainmaker_cfg, "ESP32_SmartSwitch", "Switch");
    
    // Cria o dispositivo padrão 'Switch'
    switch_device = esp_rmaker_switch_device_create("Luz Sala", NULL, true);
    
    // Registra callback de escrita
    esp_rmaker_device_add_cb(switch_device, write_cb, NULL);
    esp_rmaker_node_add_device(node, switch_device);

    // Habilita serviços adicionais (OTA e Timezone)
    esp_rmaker_ota_enable_default();
    esp_rmaker_timezone_service_enable();

    // Inicia o agente RainMaker
    esp_rmaker_start();

    // Inicia o provisionamento Wi-Fi via BLE (abre no app oficial RainMaker)
    app_wifi_start(POP_TYPE_RANDOM);

    ESP_LOGI(TAG, "Nó RainMaker pronto! Escaneie o QR Code no app ESP RainMaker.");
}
