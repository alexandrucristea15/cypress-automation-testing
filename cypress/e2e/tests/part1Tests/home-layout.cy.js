import HomePage from "../../pages/homePage";

beforeEach(() => {
  cy.visit("https://airportlabs.com");
});

it("should have the correct test for section title ", () => {
  HomePage.verifyTitleIs("Digital Innovation.Efficient Aviation.");
});

it("should have the correct font size for section title", () => {
  HomePage.verifyTitleFontSize("72px", "300");
});

it("should be visible on desktop", () => {
  cy.viewport(1280, 720);
  HomePage.elements.titleText().should("be.visible");
});

it("should be visible on mobile", () => {
  cy.viewport(375, 667);
  HomePage.elements.titleText().should("be.visible");
});

it("should have visible logo", () => {
  HomePage.elements.logoImage().should("be.visible");
});
