import HomePage from "../../pages/part1Pages/homePage";
import ContactPage from "../../pages/part1Pages/contactPage";

describe("social media links", () => {
  beforeEach(() => {
    cy.visit("https://airportlabs.com");
  });

  it("should have social media links visible", () => {
    HomePage.elements.facebookLink().scrollIntoView();
    //Here I scroll to the facebook link becuase it's the first one, could have been any of them, but here I would request for example to have a data test id for he div of the links to scroll to the div instead, I would have here as well but the only selector that div has is a clas of "div-block-60" and in my experience as a web tester and automator it's not reliable to pick classes or any selectors with numbers in them as they tend to change more often than others
    //We need the scroll into view because of lazy ladoading of the footer section that would render the elements not visible if we don't scroll to them first
    HomePage.elements.facebookLink().should("be.visible"); //check Facebook link visibility
    HomePage.elements.instagramLink().should("be.visible"); //check Instagram link visibility
    HomePage.elements.linkedInLink().should("be.visible"); //check LinkedIn link visibility
  });

  it("should have correct href attributes for social media links", () => {
    cy.fixture("home-navigation").then((links) => {
      HomePage.elements
        .facebookLink()
        .should("have.attr", "href", links.facebookLink); //verify Facebook link URL correctness
      HomePage.elements
        .instagramLink()
        .should("have.attr", "href", links.instagramLink); //verify Instagram link URL correctness
      HomePage.elements
        .linkedInLink()
        .should("have.attr", "href", links.linkedinLink); //verify LinkedIn link URL correctness
    });
  });
  // for these tests it would have been safer to navigate to each url to confirm the hostname on that page, but because of facebook limitation regarding automated browsing I opted to just check the href attribute contains the correct domain, the thing about the automated navigation I found out about it just today(as of writing this test) as well
  it("should have correct domain for facebook link", () => {
    HomePage.elements
      .facebookLink()
      .should("have.attr", "href")
      .and("contain", "facebook.com"); //verify Facebook link domain
  });
  it("should have correct domain for instagram link", () => {
    HomePage.elements
      .instagramLink()
      .should("have.attr", "href")
      .and("contain", "instagram.com"); //verify Instagram link domain
  });
  it("should have correct domain for linkedin link", () => {
    HomePage.elements
      .linkedInLink()
      .should("have.attr", "href")
      .and("contain", "linkedin.com"); //verify LinkedIn link domain
  });
});

describe("navigation to Contact page", () => {
  beforeEach(() => {
    cy.visit("https://airportlabs.com");
    HomePage.elements.contactButtonNav().click();
    // cy.url().then((currentUrl) => {
    //   const expectedUrl = "https://airportlabs.com/other/get-in-touch";

    //   if (currentUrl !== expectedUrl) {
    //     this.skip();
    //   }
    // });
  });
  it("should navigate to Contact page when 'Contact' button is clicked", () => {
    cy.url().should("include", "/other/get-in-touch");
  });
  // because I don't want to repeat code and violate the DRY principle I will assume the previous test will never file but a better solution would be to create a guard clause that would stop the next tests from running if the navigation test failed, I would implement that with a skip in the before each after checking the url
  it("should have correct title on Contact page after navigation", () => {
    ContactPage.elements
      .contactPageTitle()
      .should("have.text", "Let's get in touch");
  });
});
