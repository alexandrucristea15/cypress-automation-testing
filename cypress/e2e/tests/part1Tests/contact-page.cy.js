import ContactPage from "../../pages/part1Pages/contactPage";

//This test file is for the extra scenario, the contact page navigation from homepage works correctly (those tests are done in the home navigation test file) but here I will test for the content of the contact page itself like the data shown in the Office Locations section and the presence of the required attribute on the form fields to prevent empty submissions

describe("contact form validation tests", () => {
  beforeEach(function () {
    cy.visit("https://airportlabs.com/other/get-in-touch");
  });
  it("should have correct section title on Contact page", () => {
    ContactPage.elements
      .contactPageTitle()
      .should("have.text", "Let's get in touch");
  });
  //This test is short because of the reuired field attribute that is present on the name input field and on the other fields that will automatically prevent the form from being submitted if they are empty, so I will just check for the presence of that attribute
  //Other tests for this case would have been if the fields weren't required and we had to check for validation messages when trying to submit empty form for example, I could have tested for specific error messages for each field if that was the case
  it("shouldn't be possible to submit the form empty", () => {
    ContactPage.elements.formNameInput().should("have.attr", "required");
  });
  //I could have tested for the correct submission of the form with valid data as well but that would have required either a mock backend or a test backend to avoid spamming the real backend with test data which I don't have access to
  //So I will skip that test for now and test for the correct data being shown in the Office Locations section instead as a placeholder for a more complex form submission test
  it("should have correct office location information", () => {
    ContactPage.elements.officeLocationsSection().should("be.visible");
    cy.fixture("contact-page").then((data) => {
      const locations = data.locations;
      ContactPage.elements
        .officeLocationsSection()
        .children(".office-location")
        .filter(":contains('🇷🇴')")
        .should("contain.text", locations.RO);
      ContactPage.elements
        .officeLocationsSection()
        .children(".office-location")
        .filter(":contains('🇦🇪') ")
        .should("contain.text", locations.AE);
      ContactPage.elements
        .officeLocationsSection()
        .children(".office-location")
        .filter(":contains('🇬🇧')")
        .should("contain.text", locations.GB);
    });
  });
});
