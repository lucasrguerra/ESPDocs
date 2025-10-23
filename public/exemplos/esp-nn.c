#include <stdio.h>
#include "esp_nn.h"
#include "esp_nn_defs.h"

#define INPUT_SIZE 4
#define OUTPUT_SIZE 3

void print_array(const char *label, int16_t *array, int size) {
    printf("%s: ", label);
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");
}

void app_main(void)
{
    // Vetor de entrada (ex: saída de uma camada anterior)
    int16_t input[INPUT_SIZE] = {1, 2, 3, 4};

    // Pesos da camada densa (3x4)
    int8_t weights[OUTPUT_SIZE * INPUT_SIZE] = {
         1, -1,  2,  0,
         0,  1, -1,  1,
         2,  0,  1, -2
    };

    // Bias de cada neurônio
    int16_t bias[OUTPUT_SIZE] = {10, -5, 0};

    // Saída
    int16_t output[OUTPUT_SIZE];

    // Multiplicação da matriz: output = weights * input + bias
    esp_nn_mul_mat_16x8_16(weights, input, bias, output,
                           OUTPUT_SIZE, INPUT_SIZE, /*shift=*/0);

    print_array("Antes da ReLU", output, OUTPUT_SIZE);

    // Aplicar função de ativação ReLU
    esp_nn_relu_16(output, OUTPUT_SIZE);

    print_array("Depois da ReLU", output, OUTPUT_SIZE);
}
