#include <WiFi.h>

// Substitua pelos dados da sua rede Wi-Fi
const char* ssid = "NOME_DA_SUA_REDE";
const char* password = "SENHA_DA_SUA_REDE";

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("Conectando ao Wi-Fi...");
  WiFi.begin(ssid, password);

  // Aguarda a conexão
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Wi-Fi conectado com sucesso!");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Aqui você pode colocar o código principal do seu programa
  delay(1000);
}
