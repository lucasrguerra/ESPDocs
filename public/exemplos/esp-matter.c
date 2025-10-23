#include <stdio.h>
#include "esp_log.h"
#include "esp_matter.h"
#include "esp_matter_controller.h"
#include "nvs_flash.h"

static const char *TAG = "esp-matter-example";

void app_event_cb(const esp_matter_event_t *event)
{
    switch (event->event_id) {
        case ESP_MATTER_EVENT_ATTRIBUTE_UPDATE: {
            const esp_matter_attr_update_t *attr_update = &event->data.attr_update;
            if (attr_update->endpoint_id == 1 && attr_update->cluster_id == ESP_MATTER_ON_OFF_CLUSTER_ID) {
                bool on = false;
                esp_matter_attribute_get(attr_update->endpoint_id, attr_update->cluster_id,
                                         attr_update->attribute_id, &on);
                ESP_LOGI(TAG, "Lâmpada %s", on ? "ligada" : "desligada");
            }
            break;
        }
        default:
            break;
    }
}

void app_main(void)
{
    // Inicializa NVS
    esp_err_t err = nvs_flash_init();
    if (err == ESP_ERR_NVS_NO_FREE_PAGES || err == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ESP_ERROR_CHECK(nvs_flash_init());
    }

    // Inicializa o Matter node
    esp_matter::node_t *node = esp_matter::node::create(NULL, app_event_cb);
    esp_matter::endpoint_t *endpoint = esp_matter::endpoint::create(node, ESP_MATTER_ENDPOINT_TYPE_ON_OFF_LIGHT);

    // Inicia o stack Matter
    ESP_ERROR_CHECK(esp_matter::start(node));

    ESP_LOGI(TAG, "Dispositivo Matter iniciado. Aguardando comissionamento...");
}
