/*
 * Exemplo ESP-Zigbee-SDK para ESP32-H2 e ESP32-C6 (IEEE 802.15.4)
 * Dispositivo: Lâmpada Inteligente Zigbee 3.0 (Home Automation End Device)
 * 
 * Dependência (idf_component.yml):
 *   espressif/esp-zigbee-lib: "^1.6.0"
 */

#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "esp_zigbee_core.h"

static const char *TAG = "zigbee_light_device";

#define HA_ESP_LIGHT_ENDPOINT  1
#define ESP_ZB_PRIMARY_CHANNEL_MASK (1l << 15) // Canal 15 padrão Zigbee

/* Callback de escrita em atributos Zigbee (ex: Liga/Desliga via Home Assistant) */
static esp_err_t zb_attribute_handler(const esp_zb_zcl_set_attr_value_message_t *message)
{
    if (message->info.cluster == ESP_ZB_ZCL_CLUSTER_ID_ON_OFF) {
        if (message->attribute.id == ESP_ZB_ZCL_ATTR_ON_OFF_ON_OFF_ID &&
            message->attribute.data.type == ESP_ZB_ZCL_ATTR_TYPE_BOOL) {
            bool on_off_state = message->attribute.data.value ? *(bool *)message->attribute.data.value : false;
            ESP_LOGW(TAG, ">>> COMANDO ZIGBEE RECEBIDO: Lâmpada %s", on_off_state ? "LIGADA" : "DESLIGADA");
        }
    }
    return ESP_OK;
}

/* Callback de eventos da pilha Zigbee */
void esp_zb_app_signal_handler(esp_zb_app_signal_msg_t *signal_msg)
{
    uint32_t *p_sg_p = signal_msg->p_app_signal;
    esp_err_t err_status = signal_msg->esp_err_status;
    esp_zb_app_signal_type_t sig_type = *p_sg_p;

    switch (sig_type) {
    case ESP_ZB_ZDO_SIGNAL_SKIP_STARTUP:
        ESP_LOGI(TAG, "Iniciando comissionamento na rede Zigbee...");
        esp_zb_bdb_start_top_level_commissioning(ESP_ZB_BDB_MODE_NETWORK_STEERING);
        break;
    case ESP_ZB_BDB_SIGNAL_STEERING:
        if (err_status == ESP_OK) {
            ESP_LOGI(TAG, "Conectado com sucesso à rede Zigbee 3.0!");
        } else {
            ESP_LOGW(TAG, "Buscando coordenador Zigbee novamente...");
            esp_zb_scheduler_alarm((esp_zb_callback_t)esp_zb_bdb_start_top_level_commissioning, ESP_ZB_BDB_MODE_NETWORK_STEERING, 1000);
        }
        break;
    default:
        break;
    }
}

static void esp_zb_task(void *pvParameters)
{
    // Configura nó Zigbee como End Device
    esp_zb_cfg_t zb_nwk_cfg = {
        .esp_zb_role = ESP_ZB_DEVICE_TYPE_ED,
        .install_code_policy = false,
        .nwk_cfg.zed_cfg = {
            .ed_timeout = ESP_ZB_ED_0_5_MIN,
            .keep_alive = 3000,
        },
    };
    esp_zb_init(&zb_nwk_cfg);

    // Cria o cluster de On/Off de iluminação residencial
    esp_zb_on_off_light_cfg_t light_cfg = ESP_ZB_DEFAULT_ON_OFF_LIGHT_CONFIG();
    esp_zb_ep_list_t *ep_list = esp_zb_on_off_light_ep_create(HA_ESP_LIGHT_ENDPOINT, &light_cfg);

    // Registra endpoint e manipulador de atributos
    esp_zb_device_register(ep_list);
    esp_zb_core_action_handler_register(zb_attribute_handler);

    esp_zb_set_primary_network_channel_set(ESP_ZB_PRIMARY_CHANNEL_MASK);
    ESP_ERROR_CHECK(esp_zb_start(false));
    esp_zb_main_loop_iteration();
}

void app_main(void)
{
    ESP_ERROR_CHECK(nvs_flash_init());
    
    // Inicializa a pilha de rádio IEEE 802.15.4
    esp_zb_platform_config_t config = {
        .radio_config = { .radio_mode = ZB_RADIO_MODE_NATIVE },
        .host_config = { .host_connection_mode = ZB_HOST_CONNECTION_MODE_NONE },
    };
    ESP_ERROR_CHECK(esp_zb_platform_config(&config));

    xTaskCreate(esp_zb_task, "Zigbee_main", 4096, NULL, 5, NULL);
}
