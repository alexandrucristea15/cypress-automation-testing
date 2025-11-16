import HomePage from "../../pages/homePage";

it("Testing locators", () => {
  cy.visit("https://airportlabs.com");
  HomePage.verifyTitleIs("Digital Innovation.Efficient Aviation.");
});
