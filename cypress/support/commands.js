// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
/**
 * @method navigateToProducts
 * @memberof Cypress.Commands
 * @description Visits a specified URL, performs a search for a given category using the
 * search box element (#searchboxTrigger), and submits the search by pressing Enter.
 * * This command is useful for performing a quick navigation and initial product search
 * as a setup step in a test.
 * * @param {string} url The URL of the website to visit (e.g., 'https://www.example.com').
 * @param {string} category The search term or product category to type into the search box
 * (e.g., 'televizoare').
 * * @returns {Chainable<null>}
 * * @example
 * // Navigate to the base URL and search for 'laptopuri'
 * cy.navigateToProducts('/', 'laptopuri');
 */
Cypress.Commands.add("navigateToProducts", (url, category) => {
  cy.visit(url);
  cy.get("#searchboxTrigger").type(category);
  cy.press(Cypress.Keyboard.Keys.ENTER);
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
