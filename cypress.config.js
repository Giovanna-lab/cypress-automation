const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: false, // Desabilitar a gravação de vídeos
  reporter: 'mochawesome',
  reporterOptions: {
    overwrite: false,
    html: false, // Habilitar geração de relatório HTML
    json: true
  }
});
