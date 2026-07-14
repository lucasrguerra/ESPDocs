# Graph Report - .  (2026-07-14)

## Corpus Check
- Large corpus: 71 files · ~535,222 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 494 nodes · 611 edges · 41 communities (36 shown, 5 thin omitted)
- Extraction: 82% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 109 edges (avg confidence: 0.87)
- Token cost: 435,411 input · 0 output

## Community Hubs (Navigation)
- Next.js App Pages
- ESP32 Original SoC Silicon
- Xtensa DevKit Board Diagrams
- Layout and Marketplace API
- ESP32-C2 DevKit and Branding
- C6/C61 Wi-Fi 6 DevKits
- Lint and Build Tooling
- ESP32-C61 Silicon Subsystems
- ESP32-C3 Silicon Subsystems
- ESP32-C5 Silicon Subsystems
- ESP32-H2 Silicon Subsystems
- ESPDocs Site Content Pillars
- ESP32-C6 Silicon Subsystems
- ESP32-P4 Silicon Subsystems
- ESP32-S3 Silicon Subsystems
- ESP32-S2 Silicon Subsystems
- ESP32-C2 Silicon Subsystems
- Classic Wi-Fi and BLE Radios
- Modern BLE and Wi-Fi 6 Radios
- 802.15.4 Thread and Zigbee
- P4 Camera and Video Pipeline
- CPU Cores and SIMD Extensions
- JS Path Aliases
- ESP-Matter Code Example
- Shared GDMA Controllers
- RISC-V Core Speed Variants
- Secure Boot (Xtensa Family)
- Thread 1.4 Zigbee Radio
- Bluetooth LE 5.3 Variants
- RISC-V Core Clock Variants
- Secure Boot (RISC-V Family)
- ESP-NN Code Example
- Next.js Config
- PostCSS Config
- TEE and Permission Control

## God Nodes (most connected - your core abstractions)
1. `ESP32-C5 Series` - 28 edges
2. `ESP32-S31 SoC` - 25 edges
3. `ESP32-C6 SoC` - 23 edges
4. `ESP32-H2 SoC` - 23 edges
5. `ESP32-S3 Series SoC` - 23 edges
6. `ESP32-C3 Series` - 21 edges
7. `ESP32-C61 SoC` - 21 edges
8. `ESP32-P4 Series SoC` - 21 edges
9. `ESP8684 Series (ESP32-C2)` - 17 edges
10. `ESP32-S2 Series SoC` - 17 edges

## Surprising Connections (you probably didn't know these)
- `Google Site Verification Token` --conceptually_related_to--> `ESPDocs - Documentação ESP32 em Português`  [AMBIGUOUS]
  public/google21a790a2c23c0ec5.html → README.md
- `Crypto Accelerators (AES, SHA, RSA, ECC, HMAC, TRNG)` --semantically_similar_to--> `Crypto Accelerators (SHA, AES, RSA, HMAC, RSA_DS, RNG)`  [INFERRED] [semantically similar]
  public/datasheets/ESP32-P4.pdf → public/datasheets/ESP32-S3.pdf
- `ULP Coprocessor (ULP-RISC-V, ULP-FSM)` --semantically_similar_to--> `ULP Coprocessor (ULP-RISC-V, ULP-FSM)`  [INFERRED] [semantically similar]
  public/datasheets/ESP32-S3.pdf → public/datasheets/ESP32-S2.pdf
- `RISC-V 32-bit Single-Core CPU (120 MHz)` --semantically_similar_to--> `RISC-V 32-bit Single-Core CPU (160 MHz)`  [INFERRED] [semantically similar]
  public/datasheets/ESP32-C2 (ESP8684).pdf → public/datasheets/ESP32-C3.pdf
- `2.4 GHz Wi-Fi (IEEE 802.11b/g/n)` --semantically_similar_to--> `2.4 GHz Wi-Fi (IEEE 802.11b/g/n)`  [INFERRED] [semantically similar]
  public/datasheets/ESP32-C2 (ESP8684).pdf → public/datasheets/ESP32-C3.pdf

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Stack frontend do ESPDocs** — readme_nextjs_app_router, readme_react19, readme_tailwind_css, readme_material_ui [EXTRACTED 1.00]
- **Fluxo de dados do Marketplace de Placas** — readme_marketplace_placas, readme_api_placas_route, readme_google_sheets_api, readme_google_sheets_api_key [INFERRED 0.85]
- **Pilares de conteúdo do ESPDocs** — readme_series_esp32, readme_frameworks, readme_comparacao, readme_diagramas_interativos, readme_exemplos_codigo, readme_marketplace_placas [EXTRACTED 1.00]
- **ESP8684 Security Subsystem** — public_datasheets_esp32_c2__esp8684__secure_boot, public_datasheets_esp32_c2__esp8684__flash_encryption, public_datasheets_esp32_c2__esp8684__ecc_accelerator, public_datasheets_esp32_c2__esp8684__sha_accelerator, public_datasheets_esp32_c2__esp8684__rng [EXTRACTED 1.00]
- **ESP32-C3 Security Subsystem** — public_datasheets_esp32_c3_aes_accelerator, public_datasheets_esp32_c3_sha_accelerator, public_datasheets_esp32_c3_rsa_accelerator, public_datasheets_esp32_c3_hmac_digital_signature, public_datasheets_esp32_c3_secure_boot, public_datasheets_esp32_c3_flash_encryption, public_datasheets_esp32_c3_rng [EXTRACTED 1.00]
- **ESP32-C5 Multiprotocol Radio Stack** — public_datasheets_esp32_c5_wi_fi_6_dual_band, public_datasheets_esp32_c5_bluetooth_le_5, public_datasheets_esp32_c5_ieee_802_15_4, public_datasheets_esp32_c5_thread_1_4, public_datasheets_esp32_c5_zigbee_3_0, public_datasheets_esp32_c5_rf_module [EXTRACTED 1.00]
- **ESP32-C6 coexisting multi-protocol radio stack sharing one antenna** — public_datasheets_esp32_c6_wi_fi_6, public_datasheets_esp32_c6_bluetooth_le_5_3, public_datasheets_esp32_c6_ieee_802_15_4, public_datasheets_esp32_c6_rf_module [EXTRACTED 1.00]
- **ESP32-C61 security subsystem** — public_datasheets_esp32_c61_secure_boot, public_datasheets_esp32_c61_flash_psram_encryption, public_datasheets_esp32_c61_ecdsa, public_datasheets_esp32_c61_trng, public_datasheets_esp32_c61_apm, public_datasheets_esp32_c61_power_glitch_detector [EXTRACTED 1.00]
- **ESP32-H2 802.15.4 application-layer protocols** — public_datasheets_esp32_h2_ieee_802_15_4, public_datasheets_esp32_h2_thread, public_datasheets_esp32_h2_zigbee_3_0, public_datasheets_esp32_h2_matter [EXTRACTED 1.00]
- **ESP32-P4 Image and Voice Processing Pipeline** — public_datasheets_esp32_p4_isp, public_datasheets_esp32_p4_jpeg_codec, public_datasheets_esp32_p4_ppa, public_datasheets_esp32_p4_h264_encoder, public_datasheets_esp32_p4_mipi_csi, public_datasheets_esp32_p4_mipi_dsi, public_datasheets_esp32_p4_vad [EXTRACTED 1.00]
- **ESP32-S3 Wireless Subsystem (Wi-Fi + BLE + RF)** — public_datasheets_esp32_s3_wifi, public_datasheets_esp32_s3_wifi_mac_baseband, public_datasheets_esp32_s3_bluetooth_le, public_datasheets_esp32_s3_ble_baseband, public_datasheets_esp32_s3_rf_module [EXTRACTED 1.00]
- **Common Espressif Security Feature Family** — public_datasheets_esp32_p4_secure_boot, public_datasheets_esp32_s2_secure_boot, public_datasheets_esp32_s3_secure_boot, public_datasheets_esp32_s2_flash_encryption, public_datasheets_esp32_s3_flash_encryption, public_datasheets_esp32_p4_xts_aes [INFERRED 0.85]
- **ESP32-S31 Multiprotocol Wireless Stack** — public_datasheets_esp32_s31_wifi6, public_datasheets_esp32_s31_bluetooth_54_le, public_datasheets_esp32_s31_bluetooth_classic, public_datasheets_esp32_s31_ieee_802154 [EXTRACTED 1.00]
- **ESP32-S31 Security Subsystem** — public_datasheets_esp32_s31_secure_boot, public_datasheets_esp32_s31_flash_psram_encryption, public_datasheets_esp32_s31_crypto_accelerators, public_datasheets_esp32_s31_huk_key_manager [EXTRACTED 1.00]
- **ESP32 RTC Low-Power Domain** — public_datasheets_esp32_rtc, public_datasheets_esp32_pmu, public_datasheets_esp32_ulp_coprocessor, public_datasheets_esp32_rtc_memory [EXTRACTED 1.00]
- **Common DevKit Hardware Controls (Buttons, USB, LED)** — public_placas_esp32_c2_boot_rst_buttons, public_placas_esp32_c3_boot_rst_buttons, public_placas_esp32_c5_reset_boot_buttons, public_placas_esp32_c2_micro_usb_port, public_placas_esp32_c3_micro_usb_port, public_placas_esp32_c5_dual_usb_c_ports [INFERRED 0.75]
- **Espressif DevKit Pinout Diagram Family (C2/C3/C5)** — public_placas_esp32_c2_devkit_pinout, public_placas_esp32_c3_devkit_pinout, public_placas_esp32_c5_devkit_pinout, public_placas_esp32_c5_espressif_branding [INFERRED 0.95]
- **RISC-V Single-Core Wireless SoC Spec Family** — public_placas_esp32_c2_specs, public_placas_esp32_c3_specs, public_placas_esp32_c5_specs [INFERRED 0.85]
- **Espressif RISC-V DevKit Board Diagrams** — public_placas_esp32_c6_board, public_placas_esp32_c61_board, public_placas_esp32_h2_board, public_placas_esp32_p4_board [INFERRED 0.85]
- **Common DevKit Programming/Flashing Interface** — public_placas_esp32_c6_reset_boot_buttons, public_placas_esp32_c61_reset_boot_buttons, public_placas_esp32_p4_reset_boot_buttons, public_placas_esp32_c6_usb_uart_ports [INFERRED 0.75]
- **ESP32-P4 EV Board Multimedia and Connectivity Peripherals** — public_placas_esp32_p4_mipi_dsi_csi, public_placas_esp32_p4_audio_subsystem, public_placas_esp32_p4_ethernet, public_placas_esp32_p4_usb_ports [EXTRACTED 1.00]
- **ESP32-S31 Audio Subsystem** — public_placas_esp32_s31_audio_codec_chip, public_placas_esp32_s31_microphone, public_placas_esp32_s31_speaker_output_port [INFERRED 0.85]
- **ESP32-S31 Connectivity Ports** — public_placas_esp32_s31_rj45_ethernet_port, public_placas_esp32_s31_usb_type_a_port, public_placas_esp32_s31_usb_serial_jtag_port, public_placas_esp32_s31_usb_type_c_uart_port [INFERRED 0.85]
- **Espressif ESP32 Dev Board Image Gallery** — public_placas_esp32_pinout_diagram, public_placas_esp32_s2_pinout_diagram, public_placas_esp32_s3_pinout_diagram, public_placas_esp32_s31_board_photo [INFERRED 0.85]

## Communities (41 total, 5 thin omitted)

### Community 0 - "Next.js App Pages"
Cohesion: 0.07
Nodes (12): categoryIcons, metadata, getOptionIcon(), iconMap, Seletor(), ConnectionsDiagram(), FILTER_CATEGORIES, type_colors (+4 more)

### Community 1 - "ESP32 Original SoC Silicon"
Cohesion: 0.06
Nodes (46): Bluetooth v4.2 BR/EDR and LE Dual Mode, ESP32 SoC, Cryptographic Hardware Acceleration (AES, SHA-2, RSA, RNG), 8-bit DAC, Ethernet MAC with IEEE 1588, Flash Encryption, Power Management Unit / Power Modes, 448 KB ROM (+38 more)

### Community 2 - "Xtensa DevKit Board Diagrams"
Cohesion: 0.09
Nodes (31): ESP32 CP2102 USB-UART Bridge, ESP32 EN and Boot Buttons, ESP32 Micro-USB Port, ESP32-DevKitC Pinout Diagram, ESP32-S2 BOOT and RESET Buttons, ESP32-S2-DevKitC-1 Pinout Diagram, ESP32-S2 RGB LED @ IO18, ESP32-S2-SOLO Module (+23 more)

### Community 3 - "Layout and Marketplace API"
Cohesion: 0.07
Nodes (22): inter, metadata, outfit, @emotion/react, @emotion/styled, framer-motion, googleapis, @mui/icons-material (+14 more)

### Community 4 - "ESP32-C2 DevKit and Branding"
Cohesion: 0.10
Nodes (28): Gear + Circuit Traces + Sprouting Plant Motif, Globe and Shield/Clock IoT Icons, ESPDocs Project Logo, Boot and RST Buttons (ESP8684-DevKitM-1), ESP8684-DevKitM-1 Pinout Diagram (ESP32-C2), Dual 2x Pin Header Castellated Layout, Micro-USB Port (ESP8684-DevKitM-1), ESP8684-MINI-1 Module with PCB Antenna (+20 more)

### Community 5 - "C6/C61 Wi-Fi 6 DevKits"
Cohesion: 0.09
Nodes (27): ESP32-C61-DevKitC-1 Pinout Diagram, ESP32-C61 RESET and BOOT Buttons, ESP32-C61 Specs: RISC-V 160MHz, Wi-Fi 6, BLE 5, ESP32-C61 UART and USB Type-C Ports, ESP32-C61-WROOM-1 Module, ESP32-C6-DevKitC-1 Pinout Diagram, ESP32-C6 RESET and BOOT Buttons, ESP32-C6 RGB LED on GPIO8 (+19 more)

### Community 6 - "Lint and Build Tooling"
Cohesion: 0.08
Nodes (23): eslint, compat, __dirname, eslintConfig, __filename, eslint-config-next, @eslint/eslintrc, devDependencies (+15 more)

### Community 7 - "ESP32-C61 Silicon Subsystems"
Cohesion: 0.10
Nodes (20): Access Permission Management (APM), Digital Signature - ECDSA, ESP32-C61 SoC, Event Task Matrix (ETM), Flash/PSRAM Encryption (XTS-AES), General DMA Controller (GDMA), L1 Cache 32 KB, Power Management Unit (PMU) (+12 more)

### Community 8 - "ESP32-C3 Silicon Subsystems"
Cohesion: 0.11
Nodes (19): AES-128/256 Accelerator (FIPS PUB 197), 4096-bit eFuse Memory, ESP32-C3 Series, Flash Encryption, 22 Programmable GPIOs, HMAC and Digital Signature, Power Management Unit / RTC, QFN32 (5x5 mm) Package (+11 more)

### Community 9 - "ESP32-C5 Silicon Subsystems"
Cohesion: 0.11
Nodes (18): APM and TEE Controller, ECDSA Accelerator, ESP32-C5 Series, Event Task Matrix (ETM), External Flash/PSRAM Controller with Cache, 29 GPIOs, HP SRAM 384 KB, Key Manager (+10 more)

### Community 10 - "ESP32-H2 Silicon Subsystems"
Cohesion: 0.11
Nodes (18): Crypto Accelerators (AES, SHA, RSA, ECC, HMAC, RNG), Crypto Accelerators (AES, SHA, RSA, ECC, ECDSA, HMAC, RNG), ESP32-H2 SoC, Event Task Matrix (ETM), Flash Encryption, General DMA Controller (GDMA), 2 MB or 4 MB In-Package Flash, LP Memory 4 KB (+10 more)

### Community 11 - "ESPDocs Site Content Pillars"
Cohesion: 0.14
Nodes (18): Google Site Verification Token, API do Marketplace (app/api/placas/route.js), Comparação de Séries, Diagramas Interativos de Conexões, ESPDocs - Documentação ESP32 em Português, Exemplos de Código, Frameworks ESP32 (ESP-IDF, Arduino, MicroPython), Google Sheets API Integration (+10 more)

### Community 12 - "ESP32-C6 Silicon Subsystems"
Cohesion: 0.12
Nodes (17): Wi-Fi 6 (IEEE 802.11ax, 2.4 GHz), 4096-bit eFuse Memory, ESP32-C6 SoC, Event Task Matrix (ETM), General DMA Controller (GDMA), HP SRAM 512 KB, LP RISC-V 32-bit Processor (20 MHz), LP SRAM 16 KB (+9 more)

### Community 13 - "ESP32-P4 Silicon Subsystems"
Cohesion: 0.13
Nodes (17): ESP32-P4 Series SoC, Crypto Accelerators (AES, SHA, RSA, ECC, HMAC, TRNG), ECDSA Digital Signature Peripheral (ECDSA_DS), Ethernet MAC (EMAC), I3C Master and Slave, Key Manager (HUK from SRAM PUF), 768 KB HP L2MEM, RISC-V 32-bit Single-Core LP CPU (40 MHz) (+9 more)

### Community 14 - "ESP32-S3 Silicon Subsystems"
Cohesion: 0.12
Nodes (17): GDMA / VDMA / 2D-DMA Controllers, Touch Sensor, USB 2.0 High-Speed OTG, ESP32-S3 Series SoC, 4096-bit eFuse Memory, General DMA Controller (GDMA), L1 Cache, LCD Interface and DVP Camera Interface (+9 more)

### Community 15 - "ESP32-S2 Silicon Subsystems"
Cohesion: 0.13
Nodes (16): ESP32-S2 Series SoC, Crypto Accelerators (AES, SHA, RSA, HMAC, RNG, Digital Signature), Two 8-bit DACs, 4096-bit eFuse OTP, Flash Encryption, Power Management Unit and Five Power Modes, 128 KB ROM, RTC Memory (16 KB RTC SRAM) (+8 more)

### Community 16 - "ESP32-C2 Silicon Subsystems"
Cohesion: 0.13
Nodes (15): ECC Accelerator, ESP8684 Series (ESP32-C2), Flash Encryption, 14 Programmable GPIOs, In-package Flash (2 MB / 4 MB), Power Management Unit / Deep-sleep, QFN24 (4x4 mm) Package, Random Number Generator (RNG) (+7 more)

### Community 17 - "Classic Wi-Fi and BLE Radios"
Cohesion: 0.25
Nodes (8): RF Module (Balun, PA, LNA, RF Synthesizer), 2.4 GHz Wi-Fi (802.11 b/g/n), Wi-Fi MAC and Baseband, Bluetooth LE Baseband and Link Controller, Bluetooth 5 LE and Bluetooth Mesh, RF Module (Balun, PA, LNA, Antenna Switch), 2.4 GHz Wi-Fi (IEEE 802.11 b/g/n), Wi-Fi MAC and Baseband

### Community 18 - "Modern BLE and Wi-Fi 6 Radios"
Cohesion: 0.38
Nodes (7): Bluetooth LE 5.3, 2.4 GHz RF Module (Balun, PA, LNA), 2.4 GHz Wi-Fi (IEEE 802.11b/g/n), Bluetooth LE 5 / Bluetooth mesh, 2.4 GHz Wi-Fi (IEEE 802.11b/g/n), Bluetooth LE 5 (Core 6.0) / Bluetooth mesh 1.1, Dual-band Wi-Fi 6 (IEEE 802.11ax, 2.4/5 GHz)

### Community 19 - "802.15.4 Thread and Zigbee"
Cohesion: 0.38
Nodes (7): IEEE 802.15.4, Thread 1.3, Zigbee 3.0, IEEE 802.15.4, Matter, Thread, Zigbee 3.0

### Community 20 - "P4 Camera and Video Pipeline"
Cohesion: 0.29
Nodes (7): H264 Encoder, Image Processing Subsystem, Image Signal Processor (ISP), JPEG Codec, MIPI CSI, MIPI DSI, Pixel-Processing Accelerator (PPA)

### Community 21 - "CPU Cores and SIMD Extensions"
Cohesion: 0.33
Nodes (6): RISC-V 32-bit Dual-Core HP CPU (400 MHz), Processor Instruction Extensions (SIMD/AI), Xtensa Single-Core 32-bit LX7 Microprocessor (240 MHz), Single Precision Floating Point Unit (FPU), 128-bit Data Bus and Dedicated SIMD Instructions, Xtensa Dual-Core 32-bit LX7 Microprocessor (240 MHz)

### Community 22 - "JS Path Aliases"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, @/*, ./*

### Community 24 - "Shared GDMA Controllers"
Cohesion: 0.67
Nodes (3): GDMA Controller, GDMA Controller (3 TX / 3 RX), GDMA Controller (3 TX / 3 RX)

### Community 25 - "RISC-V Core Speed Variants"
Cohesion: 0.67
Nodes (3): RISC-V 32-bit Single-Core CPU (120 MHz), RISC-V 32-bit Single-Core CPU (160 MHz), HP RISC-V 32-bit Processor (240 MHz)

### Community 26 - "Secure Boot (Xtensa Family)"
Cohesion: 0.67
Nodes (3): Secure Boot, Secure Boot, Secure Boot

### Community 27 - "Thread 1.4 Zigbee Radio"
Cohesion: 0.67
Nodes (3): IEEE 802.15.4 Radio, Thread 1.4, Zigbee 3.0

### Community 28 - "Bluetooth LE 5.3 Variants"
Cohesion: 0.67
Nodes (3): Bluetooth LE (Core 6.0 certified), Bluetooth LE 5.3, Bluetooth LE 5.3

### Community 29 - "RISC-V Core Clock Variants"
Cohesion: 0.67
Nodes (3): RISC-V 32-bit Single-Core Processor (160 MHz), HP RISC-V 32-bit Processor (160 MHz), RISC-V 32-bit Single-Core Processor (96 MHz)

### Community 30 - "Secure Boot (RISC-V Family)"
Cohesion: 0.67
Nodes (3): Secure Boot, Secure Boot, Secure Boot

## Ambiguous Edges - Review These
- `ESPDocs - Documentação ESP32 em Português` → `Google Site Verification Token`  [AMBIGUOUS]
  public/google21a790a2c23c0ec5.html · relation: conceptually_related_to

## Knowledge Gaps
- **195 isolated node(s):** `categoryIcons`, `metadata`, `outfit`, `inter`, `metadata` (+190 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `ESPDocs - Documentação ESP32 em Português` and `Google Site Verification Token`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dependencies` connect `Layout and Marketplace API` to `Next.js App Pages`, `Lint and Build Tooling`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `ESP32-S3 Series SoC` connect `ESP32-S3 Silicon Subsystems` to `ESP32-P4 Silicon Subsystems`, `ESP32-S2 Silicon Subsystems`, `Classic Wi-Fi and BLE Radios`, `CPU Cores and SIMD Extensions`, `Secure Boot (RISC-V Family)`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `Next.js App Pages` to `Layout and Marketplace API`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ESP32-C6 SoC` (e.g. with `ESP32-C61 SoC` and `ESP32-H2 SoC`) actually correct?**
  _`ESP32-C6 SoC` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `ESP32-S3 Series SoC` (e.g. with `ESP32-P4 Series SoC` and `ESP32-S2 Series SoC`) actually correct?**
  _`ESP32-S3 Series SoC` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `categoryIcons`, `metadata`, `outfit` to the rest of the system?**
  _195 weakly-connected nodes found - possible documentation gaps or missing edges._