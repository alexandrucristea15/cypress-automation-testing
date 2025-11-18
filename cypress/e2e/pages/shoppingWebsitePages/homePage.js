class HomePage {
  /**
   * @method searchForProduct
   * @description Navigates directly to the emag.ro homepage and executes a search
   * for the specified product category using the custom Cypress command
   * `cy.navigateToProducts`.
   * @param {string} product The search term or category (e.g., 'televizoare').
   * @returns {Chainable<null>}
   * @example
   * // Assuming this method is part of a Page Object 'productsPage':
   * productsPage.searchForProduct("laptopuri");
   */
  searchForProduct(product) {
    const shopUrl = Cypress.env("SHOPPING_WEBSITE_URL");
    cy.navigateToProducts(shopUrl, product);
  }
}

export default new HomePage();
