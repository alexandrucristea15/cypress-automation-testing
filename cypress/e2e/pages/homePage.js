class HomePage {
  elements = {
    titleText: () => cy.get("h1.home"),
  };

  verifyTitleIs(expected) {
    this.elements.titleText().should("have.text", expected);
  }
}

export default new HomePage();
