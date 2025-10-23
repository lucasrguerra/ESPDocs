#include "esp_log.h"
#include "audio_pipeline.h"
#include "audio_element.h"
#include "audio_event_iface.h"
#include "audio_common.h"
#include "i2s_stream.h"
#include "mp3_decoder.h"
#include "fatfs_stream.h"
#include "esp_peripherals.h"
#include "periph_sdcard.h"

static const char *TAG = "HELLO_ADF";

void app_main(void)
{
    // Inicializa periféricos (como o SD card)
    esp_periph_config_t periph_cfg = DEFAULT_ESP_PERIPH_SET_CONFIG();
    esp_periph_set_handle_t set = esp_periph_set_init(&periph_cfg);
    periph_sdcard_cfg_t sd_cfg = {
        .root = "/sdcard",
    };
    esp_periph_handle_t sdcard_handle = periph_sdcard_init(&sd_cfg);
    esp_periph_start(set, sdcard_handle);

    // Espera o SD card montar
    periph_sdcard_wait_for_ready(sdcard_handle, portMAX_DELAY);

    ESP_LOGI(TAG, "SD card montado!");

    // Cria o pipeline
    audio_pipeline_handle_t pipeline;
    audio_pipeline_cfg_t pipeline_cfg = DEFAULT_AUDIO_PIPELINE_CONFIG();
    pipeline = audio_pipeline_init(&pipeline_cfg);

    // Elementos: arquivo (fatfs), decodificador (mp3) e saída (i2s)
    audio_element_handle_t fatfs_stream_reader, i2s_stream_writer, mp3_decoder;

    fatfs_stream_cfg_t fatfs_cfg = FATFS_STREAM_CFG_DEFAULT();
    fatfs_cfg.type = AUDIO_STREAM_READER;
    fatfs_stream_reader = fatfs_stream_init(&fatfs_cfg);

    mp3_decoder_cfg_t mp3_cfg = DEFAULT_MP3_DECODER_CONFIG();
    mp3_decoder = mp3_decoder_init(&mp3_cfg);

    i2s_stream_cfg_t i2s_cfg = I2S_STREAM_CFG_DEFAULT();
    i2s_cfg.type = AUDIO_STREAM_WRITER;
    i2s_stream_writer = i2s_stream_init(&i2s_cfg);

    // Registra e conecta elementos
    audio_pipeline_register(pipeline, fatfs_stream_reader, "file");
    audio_pipeline_register(pipeline, mp3_decoder, "mp3");
    audio_pipeline_register(pipeline, i2s_stream_writer, "i2s");

    audio_pipeline_link(pipeline, (const char *[]) {"file", "mp3", "i2s"}, 3);

    // Define o arquivo MP3 a ser tocado
    audio_element_set_uri(fatfs_stream_reader, "/sdcard/test.mp3");

    // Inicia o pipeline
    ESP_LOGI(TAG, "Iniciando pipeline...");
    audio_pipeline_run(pipeline);

    // Mantém o pipeline rodando
    while (1) {
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }

    // (Nunca chega aqui, mas seria o cleanup)
    audio_pipeline_stop(pipeline);
    audio_pipeline_wait_for_stop(pipeline);
    audio_pipeline_terminate(pipeline);
}
