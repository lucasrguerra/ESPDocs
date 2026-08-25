//! Exemplo Rust no ESP32 usando `esp-hal` (Modo Bare-Metal / no_std)
//! Pisca um LED e envia mensagens via UART Serial com segurança de memória garantida.
//!
//! Cargo.toml:
//!   esp-hal = { version = "0.22", features = ["esp32s3"] }
//!   esp-println = { version = "0.12", features = ["esp32s3", "log"] }

#![no_std]
#![no_main]

use esp_backtrace as _;
use esp_hal::{
    clock::ClockControl,
    gpio::{Io, Level, Output},
    peripherals::Peripherals,
    system::SystemControl,
    timer::timg::TimerGroup,
    delay::Delay,
    prelude::*,
};
use esp_println::println;

#[entry]
fn main() -> ! {
    // Inicializa periféricos do SoC com verificação em tempo de compilação
    let peripherals = Peripherals::take();
    let system = SystemControl::new(peripherals.SYSTEM);
    let clocks = ClockControl::boot_defaults(system.clock_control).freeze();

    // Configura os pinos de E/S
    let io = Io::new(peripherals.GPIO, peripherals.IO_MUX);
    let mut led = Output::new(io.pins.gpio2, Level::Low);

    let delay = Delay::new(&clocks);

    println!("🦀 Firmware Rust Bare-Metal inicializado no ESP32!");

    let mut counter: u32 = 0;

    loop {
        // Inverte estado do LED com garantia de exclusão mútua
        led.toggle();
        counter += 1;

        println!("Ciclo Rust #{}: LED está {:?}", counter, led.is_set_high());
        delay.delay_millis(500);
    }
}
