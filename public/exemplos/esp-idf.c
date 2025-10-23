#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"

#define LED_PIN GPIO_NUM_2  // LED onboard (ajuste conforme sua placa)

void app_main(void)
{
    // Configura o pino do LED como saída
    gpio_reset_pin(LED_PIN);
    gpio_set_direction(LED_PIN, GPIO_MODE_OUTPUT);

    while (1) {
        // Liga o LED
        gpio_set_level(LED_PIN, 1);
        printf("LED ON\n");
        vTaskDelay(pdMS_TO_TICKS(1000));  // Espera 1 segundo

        // Desliga o LED
        gpio_set_level(LED_PIN, 0);
        printf("LED OFF\n");
        vTaskDelay(pdMS_TO_TICKS(1000));  // Espera 1 segundo
    }
}
