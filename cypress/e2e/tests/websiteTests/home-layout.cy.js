import HomePage from "../../pages/websitePages/homePage";

beforeEach(() => {
  cy.visit('/');
});

describe("Section title test", () => {
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
});

describe("Logo tests", () => {
  it("should have visible logo", () => {
    HomePage.elements.logoImage().should("be.visible");
  });

  it("should logo dimension not be less than or equal to 0", () => {
    // I used negative assertion to verify that logo dimensions are greater than 0, even though there is a much simpler way of checking by usign 'be.greaterThan' assertion

    // HomePage.elements.logoImage().then((logo) => {
    //   const logoWidth = logo[0].naturalWidth;
    //   const logoHeight = logo[0].naturalHeight;
    //   expect(logoWidth).not.to.be.lte(0);
    //   expect(logoHeight).not.to.be.lte(0);
    // });

    HomePage.elements
      .logoImage()
      .invoke("prop", "naturalWidth")
      .should("not.be.lte", 0);
    HomePage.elements
      .logoImage()
      .invoke("prop", "naturalHeight")
      .should("not.be.lte", 0);
  });
});
