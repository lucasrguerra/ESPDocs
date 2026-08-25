/*
 * Exemplo ESP-NOW para ESP32
 * Comunicação Sem Fio Ponto-a-Ponto e Broadcast sem roteador Wi-Fi
 * 
 * Protocolo nativo integrado no ESP-IDF
 */

#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_wifi.h"
#include "esp_now.h"
#include "esp_log.h"
#include "nvs_flash.h"

static const char *TAG = "esp_now_demo";

// Estrutura de dados enviada no pacote
typedef struct {
    uint32_t sensor_id;
    float temperatura;
    float umidade;
    uint32_t tempo_ms;
} __attribute__((packed)) dados_pacote_t;

// Endereço MAC de Broadcast (envia para todos os nós ESP-NOW por perto)
static const uint8_t broadcast_mac[ESP_NOW_ETH_ALEN] = { 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF };

/* Callback executado ao enviar um pacote */
static void on_data_sent(const uint8_t *mac_addr, esp_now_send_status_t status)
{
    ESP_LOGI(TAG, "Envio concluído: %s", status == ESP_NOW_SEND_SUCCESS ? "SUCESSO (ACK)" : "FALHA");
}

/* Callback executado ao receber um pacote de outro ESP32 */
static void on_data_recv(const esp_now_recv_info_t *recv_info, const uint8_t *data, int len)
{
    if (len == sizeof(dados_pacote_t)) {
        dados_pacote_t *pct = (dados_pacote_t *)data;
        ESP_LOGI(TAG, "Pacote recebido de [%02X:%02X:%02X:%02X:%02X:%02X]: Sensor #%ld | Temp: %.1f C | Umid: %.1f %%",
                 recv_info->src_addr[0], recv_info->src_addr[1], recv_info->src_addr[2],
                 recv_info->src_addr[3], recv_info->src_addr[4], recv_info->src_addr[5],
                 pct->sensor_id, pct->temperatura, pct->umidade);
    }
}

void app_main(void)
{
    // Inicializa NVS e Wi-Fi em modo Station
    nvs_flash_init();
    esp_netif_init();
    esp_event_loop_create_default();
    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    esp_wifi_init(&cfg);
    esp_wifi_set_mode(WIFI_MODE_STA);
    esp_wifi_start();

    // Inicializa o protocolo ESP-NOW
    ESP_ERROR_CHECK(esp_now_init());
    esp_now_register_send_cb(on_data_sent);
    esp_now_register_recv_cb(on_data_recv);

    // Registra o peer de Broadcast
    esp_now_peer_info_t peer_info = {
        .channel = 1,
        .ifidx = WIFI_IF_STA,
        .encrypt = false,
    };
    memcpy(peer_info.peer_addr, broadcast_mac, ESP_NOW_ETH_ALEN);
    ESP_ERROR_CHECK(esp_now_add_peer(&peer_info));

    ESP_LOGI(TAG, "ESP-NOW pronto! Enviando telemetria a cada 3 segundos...");

    dados_pacote_t telemetria = {
        .sensor_id = 101,
        .temperatura = 24.8f,
        .umidade = 58.2f,
    };

    while (1) {
        telemetria.tempo_ms = esp_log_timestamp();
        telemetria.temperatura += ((float)(rand() % 10) - 5.0f) / 10.0f;

        esp_err_t res = esp_now_send(broadcast_mac, (uint8_t *)&telemetria, sizeof(telemetria));
        if (res != ESP_OK) {
            ESP_LOGE(TAG, "Erro ao disparar envio ESP-NOW: %d", res);
        }

        vTaskDelay(pdMS_TO_TICKS(3000));
    }
}
