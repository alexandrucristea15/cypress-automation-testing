class HomePage {
  elements = {
    titleText: () => cy.get("h1.home"),
    logoImage: () => cy.get("img[src*=Logo]"),
    facebookLink: () => cy.get('a[href*="facebook.com"]'),
    instagramLink: () => cy.get('a[href*="instagram.com"]'),
    linkedInLink: () => cy.get('a[href*="linkedin.com"]'),
    ourActivityinNumbersSection: () => cy.get(".our-impact"),
    industryExperienceText: () =>
      cy.get("h4:contains('Industry Experience')").siblings("h2"),
    industryExperienceLabel: () => cy.get("h4:contains('Industry Experience')"),
    saaSProductsText: () =>
      cy.get("h4:contains('SaaS Products')").siblings("h2"),
    airportsWorldwideText: () =>
      cy.get("h4:contains('Airports Worldwide')").siblings("h2"),
    usersWorldwideText: () =>
      cy.get("h3:contains('Users Worldwide')").siblings("h2"), //h3 because of the bug described in the test file, I could have gone for the class of ".h4" as well but this is more descriptive

    contactButtonNav: () => cy.get('nav > a[href*="get-in-touch"]'),
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
