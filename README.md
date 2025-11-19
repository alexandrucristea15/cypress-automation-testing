# Cypress Automation Testing

A small Cypress test-suite for a specific website (Part1 assignment) and a shopping website example (Part2). Tests are organized using page objects and fixtures. Environment-specific values are loaded from a `.env` file so the same test code can run against different targets.

**Important:** For the Part1 assignment the `BASE_URL` must be the URL specified by the assignment — set that value in the `.env` file before running tests.

## Repository structure (key files)

- `cypress/`
  - `e2e/` — test specs and page objects
    - `pages/` — page object files for website and shopping pages
    - `tests/` — organized test specs (`websiteTests`, `shoppingWebsiteTests`, etc.)
  - `fixtures/` — test data used by specs
  - `support/` — custom commands and support files (`commands.js`, `e2e.js`)
- `.env` — environment variables used by `cypress.config.js` (not checked into CI by default)
- `cypress.config.js` — Cypress configuration (reads `.env` when `dotenv` is installed)
- `package.json` — project dependencies (Cypress)

## Prerequisites

- Node.js (LTS recommended) and npm
- Git (to clone the repository)
- On Windows you may need to run the terminal as Administrator if Cypress fails to create cache files.

## Setup (clone and install)

1. Clone the repository:

```powershell
git clone https://github.com/alexandrucristea15/cypress-automation-testing.git
cd cypress-automation-testing
```

2. Install npm dependencies:

```powershell
npm install
```

3. (Optional but recommended) Install `dotenv` as a dev dependency so `cypress.config.js` automatically loads `.env`:

```powershell
npm install dotenv --save-dev
```

## Environment variables (`.env`)

Create a `.env` file in the repository root (a sample is already present). The project currently expects the following variables:

```dotenv
# Required for Part1 assignment - set to the URL specified by the assignment
BASE_URL=URL specified in the assignment

# Full path to the contact page used by some tests
CONTACT_URL=URL specified in the assignment and add this path at the end of it '/other/get-in-touch'

# Shopping website used in the shopping spec (I chose emag.ro for Part2)
SHOPPING_WEBSITE_URL=https://www.emag.ro/
```

Notes:

- `cypress.config.js` will load `.env` when `dotenv` is installed; otherwise you can set equivalent OS environment variables.
- Tests use `cy.visit('/')` (which resolves against `baseUrl` from `cypress.config.js`), and page objects/commands use `Cypress.env('SHOPPING_WEBSITE_URL')` for the shopping site.

## Running tests

- Open the interactive Cypress Test Runner:

```powershell
npx cypress open
```

- Run tests headless (example: run a single spec):

```powershell
npx cypress run --spec "cypress/e2e/tests/websiteTests/home-navigation.cy.js"
```

- To run the shopping site spec (uses `SHOPPING_WEBSITE_URL`):

```powershell
npx cypress run --spec "cypress/e2e/tests/shoppingWebsiteTests/product-selection.cy.js"
```

## How the tests use env values

- `BASE_URL` is mapped to Cypress `baseUrl` via `cypress.config.js`. Use `cy.visit('/')` to open the base site.
- `CONTACT_URL` can be used directly with `cy.visit('/other/get-in-touch')` or `cy.visit(Cypress.env('CONTACT_URL'))`.
- `SHOPPING_WEBSITE_URL` is consumed by the shopping page object and the custom command `cy.navigateToProducts`.

## Author: Cristea Alexandru Paul
