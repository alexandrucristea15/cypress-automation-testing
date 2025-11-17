import HomePage from "../../pages/part1Pages/homePage";

describe("'Our Activity in Numbers' section tests", () => {
  beforeEach(function () {
    cy.visit("https://airportlabs.com");
    cy.fixture("part1Fixtures/home-content").then((content) => {
      this.content = content;
    });
  });

  it("should have Our Activity in numbers section visible", () => {
    HomePage.elements.ourActivityinNumbersSection().scrollIntoView();
    HomePage.elements.ourActivityinNumbersSection().should("be.visible");
  });
  it("should have the correct style for 'Indusrtry Experience' ", function () {
    HomePage.elements
      .industryExperienceText()
      .should(
        "have.css",
        "font-size",
        this.content.industryExperience.industryExperienceStyle.fontSize
      )
      .and(
        "have.css",
        "font-weight",
        this.content.industryExperience.industryExperienceStyle.fontWeight
      )
      .and(
        "have.css",
        "color",
        this.content.industryExperience.industryExperienceStyle.color
      );
  });
  it("should have the correct label for 'Indusrtry Experience' ", function () {
    HomePage.elements
      .industryExperienceLabel()
      .should(
        "have.text",
        this.content.industryExperience.industryExperienceLabel
      );
  });
  it("should have correct content in 'Our Activity in Numbers' section - spec 'Industry Experience' ", function () {
    HomePage.elements
      .industryExperienceText()
      .should(
        "contain.text",
        this.content.industryExperience.industryExperienceText
      );
  });
  it("should have correct content in 'Our Activity in Numbers' section - spec 'Saas Products' ", () => {
    cy.fixture("part1Fixtures/home-content").then((content) => {
      HomePage.elements
        .saaSProductsText()
        .should("contain.text", content.saaSProducts);
    });
  });
  it("should have correct content in 'Our Activity in Numbers' section - spec 'Airports Worldwide' ", () => {
    cy.fixture("part1Fixtures/home-content").then((content) => {
      HomePage.elements
        .airportsWorldwideText()
        .should("contain.text", content.airportsWorldwide);
    });
  });
  it("should have correct content in 'Our Activity in Numbers' section - spec 'Users Worldwide' ", () => {
    cy.fixture("part1Fixtures/home-content").then((content) => {
      HomePage.elements
        .usersWorldwideText()
        .should("contain.text", content.usersWorldwide);
    });
  });
  // For this test there is bug, all the other elements in this sections are h4 tags that are used to write the tile of the statistic and h2 tags that contain the actual number statistic, but for the 'Users Worldwide' stat the title is an h4 tag but the number is in an h3 tag, so this test would fail, this would be a bug report most likely
});
