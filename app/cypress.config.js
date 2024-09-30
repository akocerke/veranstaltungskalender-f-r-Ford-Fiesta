/* eslint-disable */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Ersetze dies durch deine lokale Entwicklungs-URL
    setupNodeEvents(on, config) {
      // hier können zusätzliche Events konfiguriert werden, falls benötigt
    },
    specPattern: 'cypress/e2e/**/*.cy.js', // Pfad zu deinen Testdateien
  },
});
