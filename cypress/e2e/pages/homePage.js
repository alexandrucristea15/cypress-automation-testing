class HomePage {
  elements = {
    titleText: () => cy.get("h1.home"),
    logoImage: () => cy.get("img[src*=Logo]"),
  };

  verifyTitleIs(expected) {
    this.elements.titleText().should("have.text", expected);
  }

  verifyTitleFontSize(expectedSize, expectedWeight) {
    this.elements
      .titleText()
      .should("have.css", "font-size", expectedSize)
      .and("have.css", "font-weight", expectedWeight);
  }
}

export default new HomePage();
