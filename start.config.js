module.exports = {
    apps: [
      {
        name: "ESPDocs",
        script: "npm run start",
        watch: true,
        env: {
          NODE_ENV: "production",
          DEBUG: "app:*"
        }
      }
    ]
  }