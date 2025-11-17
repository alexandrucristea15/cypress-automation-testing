class ContactPage {
  elements = {
    contactPageTitle: () => cy.get(".section-title").children("h1"),
    formSubmitButton: () =>
      cy.get('input[type="submit"][value="Send Inquiry"]', { visible: true }),
    formNameInput: () => cy.get('input[data-name="Your Name"]'),
    officeLocationsSection: () =>
      cy.get("#w-node-_3a8cef08-3788-6086-ae78-cf6b0244cc09-33e38ef7"), //Normally I wouldn't go for this as a selector but since this is an Id it's unique so it's a good selector to use, I could have gone as well for the parent of the h4 tag with the "Offices" text in it
  };
}

export default new ContactPage();
