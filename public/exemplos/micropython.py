from machine import Pin
from time import sleep

# Define o pino 2 como saída (geralmente o LED embutido)
led = Pin(2, Pin.OUT)

while True:
    led.value(1)  # Liga o LED
    sleep(0.5)    # Aguarda 0,5 segundos
    led.value(0)  # Desliga o LED
    sleep(0.5)    # Aguarda 0,5 segundos
