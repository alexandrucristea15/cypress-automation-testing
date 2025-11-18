class cartPage {
  elements = {
    productTitle: () => cy.get('[class*="main-product-title"]'),
    productPrice: (productTitle) =>
      cy
        .get(".cart-line")
        .should("be.visible")
        .contains(".main-product-title", productTitle.trim().slice(0, 20))
        .closest(".cart-line")
        .find(".product-new-price"),
    totalCartPrice: () => cy.get(".order-summary-items-price"),
  };

  checkBrandInTitle(brand) {
    this.elements.productTitle().should("contain", brand);
  }

  verifyPrice(productKey, cartData) {
    const titleKey = `${productKey}Title`;
    const priceKey = `${productKey}Price`;

    const expectedTitle = cartData[titleKey].trim();
    const expectedPriceString = cartData[priceKey];

    this.elements
      .productPrice(expectedTitle)
      .invoke("text")
      .then((cartPriceText) => {
        const cartPrice = this.formatPrice(cartPriceText);
        const pagePrice = this.formatPrice(expectedPriceString);
        expect(cartPrice).to.equal(pagePrice);
        cy.wrap(cartPrice).as(`${productKey}NumericPrice`);
      });
  }

  formatPrice(priceString) {
    // Formats the price so It can be compared easier
    return parseFloat(
      priceString.replace("Lei", "").replace(/\./g, "").replace(",", ".").trim()
    );
  }
}

export default new cartPage();
