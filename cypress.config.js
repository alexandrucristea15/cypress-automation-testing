const { defineConfig } = require("cypress");
// Load .env into process.env so we can use the values below
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    // set baseUrl from .env (fallback to nothing if undefined)
    baseUrl: process.env.BASE_URL || undefined,
    // expose other env vars to Cypress via Cypress.env()
    env: {
      CONTACT_URL: process.env.CONTACT_URL,
      SHOPPING_WEBSITE_URL: process.env.SHOPPING_WEBSITE_URL,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // return config in case other plugins rely on it
      return config;
    },
  },
});
