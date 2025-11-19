## Test Design Notes

This document explains the test structure used in the repository, why I chose that structure, what I would add with a short (2 hour) extension, and which parts of the suite are easy vs fragile to maintain.

**Repository test structure (summary)**

- `cypress/e2e/pages/` - Page objects separated by website (main website vs shopping website). Encapsulates selectors and page-level actions.
- `cypress/e2e/tests/` - Test specs grouped by feature or site (e.g., `websiteTests`, `shoppingWebsiteTests`).
- `cypress/fixtures/` - JSON fixtures for test data (titles, expected content, external links) also grouped by feature or site.
- `cypress/support/commands.js` - Custom commands used to encapsulate repeated actions (e.g., `navigateToProducts`), only one command in this case as I didn't find the high need for others.
- `cypress.config.js` + `.env` - Centralized configuration and environment variables (baseUrl, external site URLs).

### Why this structure was chosen

- Separation of concerns: POM keep selectors and interaction logic in one place. Tests remain focused on behavior and assertions which improves readability.
- Reusability: Shared commands and page objects make test steps reusable across multiple specs and reduce duplication (DRY).
- Data-driven: Fixtures centralize expected values and test data so tests become easier to maintain and translate into additional test cases, in this project I also separated the fixtures based on feature or website they are related to.
- Config-driven: `cypress.config.js` + `.env` ensure that the same test code can run against different targets (assignment base URL vs local or CI targets) without code changes. This is not the case for this project as the selectors are tailored for the websites only but in a more general case it's good to use .env for variables.

This structure is the common, recommended pattern for medium-sized Cypress projects, tailored to ensure maintainability also I found that this structre makes the most sense as I found it easy to navigate the project while debugging it or working on certain tasks.

### What I would add with 2 more hours

With a short two-hour window, I would focus mainly on refactoring and maybe unfinished tasks or fixing small workarounds:

1. I would refactor any repeating code, or maybe create additional functions to encourage reusability.

2. Replace fragile selectors with data-test attributes where feasible (or at least add an example), and in a real project setting try to speak with the developers to find common ground to make tests less fragile due to selectors.

3. Finish the test suite for the contact page (this may take longer than the 2 hours), as I think testing the form would be a much better approach to test the page. I didn't do it that way in the project due to time limitations and also because I didn’t want to spam contact requests or emails.

4. Fix the workaround for the shopping website’s sorting options that I resorted to due to issues with the dropdown staying open using clicks and page interactions only. There is surely a better way to test that, or it may be a bug in itself, although I didn’t encounter it during manual testing of the website.

These changes are practical to implement quickly and will significantly reduce flakiness and make the suite safer to run in CI.

### What is easy to maintain

- Page objects and fixtures — adding or changing a selector or expected text in a fixture is straightforward and localized.
- Custom commands in `cypress/support/commands.js` — centralizing repeated flows (login, navigation, search) is low-cost and high-value.
- Configuration via `.env` — switching `baseUrl` or shopping site URL requires editing a single file and does not require code edits.

These parts are easy to maintain because changes are localized and can be made without spending a lot of time checking whether they break something. As long as you modify the file and the tests still run the same, you are good to go. It also becomes easier to find bugs in tests: if a test fails due to an action or selector from the POM, there is only one file where that problem could be located.

### Fragile areas (higher maintenance / prone to breakage)

- UI selectors that rely on classes or deeply nested DOM structure, in general selectors with numbers such the id I used in the Contact page POM, or other deeply nested structures that require specific child or parent selectors to work

- Tests that visit or rely on third-party/external sites

  - Why fragile: external sites often block automated traffic or change unexpectedly like the issues with facebook blocking automated navigations.

- Timing-sensitive assertions (lazy-loaded content, animations)

  - Why fragile: races between test commands and content rendering cause flakiness.
  - Mitigation: prefer `.scrollIntoView()` + `.should('be.visible')` or explicit wait-for-element assertions

### Final notes

With the current structure the project is in a solid state for the assignment: tests are organized, configuration is centralized, and page objects separate selectors from assertions. The highest-impact improvements (and the ones that take the least time) are stabilizing selectors and removing direct dependencies on external sites. Those are the changes I prioritized in the 2-hour list above.
