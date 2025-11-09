# ESPDocs - Documentação ESP32 em Português

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Documentação não oficial completa do ecossistema ESP32 em português brasileiro.

## 🚀 Funcionalidades

- **📚 Séries ESP32**: Informações detalhadas sobre todas as séries de chips ESP32
- **⚡ Frameworks**: Documentação de frameworks populares (ESP-IDF, Arduino, MicroPython, etc.)
- **📊 Comparação**: Compare diferentes séries ESP32 lado a lado
- **🔌 Diagramas Interativos**: Visualize conexões e componentes de forma interativa
- **💻 Exemplos de Código**: Código de exemplo para diferentes frameworks
- **🛒 Catálogo de Placas**: Encontre e filtre placas de desenvolvimento ESP32

## 🏁 Início Rápido

### Instalação

```bash
# Clone o repositório
git clone https://github.com/lucasrguerra/ESPDocs.git

# Entre no diretório
cd ESPDocs

# Instale as dependências
npm install
```

### Configuração do Marketplace (Opcional)

```bash
# Copie o arquivo de exemplo
cp .env.local.example .env.local

# Edite o arquivo .env.local e adicione sua API Key do Google Sheets
# GOOGLE_SHEETS_API_KEY=sua_api_key_aqui
```

### Executar em Desenvolvimento

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📁 Estrutura do Projeto

```
ESPDocs/
├── app/
│   ├── api/
│   │   └── placas/
│   │       └── route.js          # API do marketplace
│   ├── comparacao/
│   ├── frameworks/
│   ├── placas/                   # Marketplace
│   │   └── page.jsx
│   ├── series/
│   ├── sobre/
│   └── page.jsx
├── components/
│   ├── BoardCard.jsx             # Card de placa
│   ├── BoardFilters.jsx          # Filtros (opcional)
│   ├── CodeExample.jsx
│   ├── ConnectionsDiagram.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   └── SeriesTabMenu.jsx
├── public/
│   ├── frameworks.json
│   ├── series.json
│   ├── conexoes/
│   ├── exemplos/
│   └── placas/
├── .env.local.example            # Exemplo de configuração
```

## 🛠️ Tecnologias

- **Next.js 15**: Framework React com App Router
- **React 19**: Biblioteca UI
- **Tailwind CSS 4**: Estilização
- **Material-UI**: Componentes
- **Google Sheets API**: Integração com planilhas

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Importante**: Ao fazer deploy, não esqueça de adicionar a variável de ambiente `GOOGLE_SHEETS_API_KEY` nas configurações do projeto na Vercel.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ⚠️ Disclaimer

Este é um projeto de documentação não oficial e independente. Não possui nenhum tipo de afiliação com a Espressif Systems, fabricante dos chips ESP32.

## 👤 Autor

**Lucas Rayan Guerra**
- Website: [Ciência Embarcada](https://cienciaembarcada.com.br)
- GitHub: [@lucasrguerra](https://github.com/lucasrguerra)

## 🤝 Contribuindo

Contribuições, issues e feature requests são bem-vindos!

---

Feito com ❤️ para a comunidade ESP32 brasileira

