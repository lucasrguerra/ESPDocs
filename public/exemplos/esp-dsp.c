#include <stdio.h>
#include "esp_dsp.h"

#define N 8  // Tamanho do vetor

void app_main(void)
{
    // Vetor de entrada (exemplo de sinal)
    float x[N] = {1.0, -2.0, 3.0, -4.0, 2.5, -1.5, 0.0, 4.5};
    float y[N];  // Vetor de saída

    // Inicializa o ESP-DSP
    esp_err_t ret = dsps_fft2r_init_fc32(NULL, CONFIG_DSP_MAX_FFT_SIZE);
    if (ret != ESP_OK) {
        printf("Erro ao inicializar o ESP-DSP!\n");
        return;
    }

    printf("Sinal de entrada:\n");
    for (int i = 0; i < N; i++) {
        printf("%f ", x[i]);
    }
    printf("\n");

    // Calcula o quadrado de cada valor
    dsps_mulc_f32(x, y, N, 1.0f);
    dsps_mul_f32(y, y, y, N, 1, 1, 1);

    // Soma todos os quadrados
    float soma = 0;
    dsps_sum_f32(y, N, &soma, 1);

    // Calcula a magnitude (raiz da soma dos quadrados)
    float magnitude = sqrtf(soma);

    printf("Magnitude do vetor: %f\n", magnitude);
}
