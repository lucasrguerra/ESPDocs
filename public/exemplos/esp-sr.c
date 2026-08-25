/*
 * Exemplo ESP-SR para ESP32-S3 / ESP32-P4
 * Reconhecimento de Fala Local Offline (WakeNet + MultiNet)
 * 
 * Dependência (idf_component.yml):
 *   espressif/esp-sr: "^1.5.0"
 */

#include <stdio.h>
#include <stdlib.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "esp_wn_iface.h"
#include "esp_wn_models.h"
#include "esp_mn_iface.h"
#include "esp_mn_models.h"
#include "esp_afe_sr_iface.h"
#include "esp_afe_sr_models.h"

static const char *TAG = "app_voice_sr";

void feed_audio_task(void *arg)
{
    esp_afe_sr_data_t *afe_data = (esp_afe_sr_data_t *)arg;
    int audio_chunksize = afe_handle->get_feed_chunksize(afe_data);
    int16_t *feed_buff = (int16_t *)malloc(audio_chunksize * sizeof(int16_t) * 2);

    while (1) {
        // Leitura de áudio I2S dos microfones da placa
        // i2s_read(I2S_NUM_0, feed_buff, ...);
        
        afe_handle->feed(afe_data, feed_buff);
        vTaskDelay(pdMS_TO_TICKS(10));
    }
    free(feed_buff);
    vTaskDelete(NULL);
}

void speech_recognition_task(void *arg)
{
    esp_afe_sr_data_t *afe_data = (esp_afe_sr_data_t *)arg;
    const esp_afe_sr_iface_t *afe_handle = &ESP_AFE_SR_HANDLE;

    // Inicializa o modelo de comandos de fala (MultiNet)
    const esp_mn_iface_t *multinet = &ESP_MN_HANDLE;
    model_iface_data_t *model_data = multinet->create(&MULTINET_MODEL, 6000);

    ESP_LOGI(TAG, "Aguardando palavra-chave de ativação (ex: 'Hi, ESP')...");

    while (1) {
        afe_fetch_result_t *res = afe_handle->fetch(afe_data);
        if (!res || res->ret_value == ESP_FAIL) {
            continue;
        }

        // 1. Verificação de Wake Word (Palavra de ativação)
        if (res->wake_word_detected == WAKENET_DETECTED) {
            ESP_LOGW(TAG, ">>> PALAVRA-CHAVE DETECTADA! Canal de escuta aberto.");
        }

        // 2. Reconhecimento de comando local
        if (res->raw_data_size > 0) {
            esp_mn_state_t mn_state = multinet->detect(model_data, res->data);
            
            if (mn_state == ESP_MN_STATE_DETECTED) {
                esp_mn_results_t *mn_res = multinet->get_results(model_data);
                ESP_LOGI(TAG, ">>> COMANDO RECONHECIDO: ID #%d (Frase correspondente)", mn_res->command_id[0]);
                
                // Exemplo de ação
                if (mn_res->command_id[0] == 1) {
                    ESP_LOGI(TAG, "Ação: Ligar Luz da Sala");
                } else if (mn_res->command_id[0] == 2) {
                    ESP_LOGI(TAG, "Ação: Desligar Luz da Sala");
                }
            } else if (mn_state == ESP_MN_STATE_TIMEOUT) {
                ESP_LOGI(TAG, "Tempo esgotado. Retornando ao modo de escuta de Wake Word.");
            }
        }
    }
    vTaskDelete(NULL);
}

void app_main(void)
{
    ESP_LOGI(TAG, "Iniciando ESP-SR Speech Recognition Engine");

    // Configura o pipeline de Audio Front-End (AEC, BSS, VAD, WakeNet)
    afe_config_t afe_config = AFE_CONFIG_DEFAULT();
    afe_config.wakenet_init = true;
    afe_config.voice_communication_init = false;

    esp_afe_sr_data_t *afe_data = ESP_AFE_SR_HANDLE.create_from_config(&afe_config);

    // Cria as tarefas de alimentação de áudio e reconhecimento
    xTaskCreatePinnedToCore(feed_audio_task, "feed_task", 4096, afe_data, 5, NULL, 0);
    xTaskCreatePinnedToCore(speech_recognition_task, "sr_task", 8192, afe_data, 5, NULL, 1);
}
