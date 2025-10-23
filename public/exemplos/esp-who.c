#include "esp_camera.h"
#include "fd_forward.h"   // Face Detection
#include "fr_forward.h"   // Face Recognition
#include "human_face_detect_msr01.hpp"
#include "human_face_detect_mnp01.hpp"

#define CAMERA_MODEL_AI_THINKER // ou o modelo da sua placa

#include "camera_pins.h"

void setup() {
    Serial.begin(115200);
    Serial.setDebugOutput(true);
    Serial.println("Iniciando câmera...");

    camera_config_t config;
    config.ledc_channel = LEDC_CHANNEL_0;
    config.ledc_timer = LEDC_TIMER_0;
    config.pin_d0 = Y2_GPIO_NUM;
    config.pin_d1 = Y3_GPIO_NUM;
    config.pin_d2 = Y4_GPIO_NUM;
    config.pin_d3 = Y5_GPIO_NUM;
    config.pin_d4 = Y6_GPIO_NUM;
    config.pin_d5 = Y7_GPIO_NUM;
    config.pin_d6 = Y8_GPIO_NUM;
    config.pin_d7 = Y9_GPIO_NUM;
    config.pin_xclk = XCLK_GPIO_NUM;
    config.pin_pclk = PCLK_GPIO_NUM;
    config.pin_vsync = VSYNC_GPIO_NUM;
    config.pin_href = HREF_GPIO_NUM;
    config.pin_sscb_sda = SIOD_GPIO_NUM;
    config.pin_sscb_scl = SIOC_GPIO_NUM;
    config.pin_pwdn = PWDN_GPIO_NUM;
    config.pin_reset = RESET_GPIO_NUM;
    config.xclk_freq_hz = 20000000;
    config.pixel_format = PIXFORMAT_RGB565;
    config.frame_size = FRAMESIZE_QVGA;
    config.fb_count = 1;

    if (esp_camera_init(&config) != ESP_OK) {
        Serial.println("Falha ao iniciar a câmera!");
        return;
    }

    Serial.println("Câmera inicializada com sucesso!");
}

void loop() {
    camera_fb_t *fb = esp_camera_fb_get();
    if (!fb) {
        Serial.println("Falha ao capturar imagem!");
        return;
    }

    // Detecta rostos na imagem
    box_array_t *faces = face_detect_msr01(fb->buf, fb->width, fb->height, fb->format);
    if (faces) {
        Serial.printf("Rostos detectados: %d\n", faces->len);
        for (int i = 0; i < faces->len; i++) {
            box_t *box = &faces->box[i];
            Serial.printf("Face %d - x:%d y:%d w:%d h:%d\n", i, box->box_p[0], box->box_p[1],
                          box->box_p[2] - box->box_p[0], box->box_p[3] - box->box_p[1]);
        }
        dl_lib_free(faces);
    } else {
        Serial.println("Nenhum rosto detectado.");
    }

    esp_camera_fb_return(fb);
    delay(1000);
}
