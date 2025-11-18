import cartPage from "../../pages/shoppingWebsitePages/cartPage";
import homePage from "../../pages/shoppingWebsitePages/homePage";
import productsPage from "../../pages/shoppingWebsitePages/productsPage";

describe("Product Selection on Shopping Website on the 'televizoare' category", () => {
  beforeEach(() => {
    homePage.searchForProduct("televizoare");
  });
  it("Should have products visible after searching for TVs", () => {
    productsPage.elements.products().should("be.visible");
  });

  it("Selects the most expensive TV with rating >= 3 stars", () => {
    productsPage.filterByBrand("Samsung");
    productsPage.filterByRating(3);
    productsPage.sortByPrice("desc");
    productsPage.elements.products().first().as("mostExpProduct");
    cy.get("@mostExpProduct")
      .find("[class*=title]")
      .first()
      .then((titleElement) =>
        cy.log(
          `The most expensive Samsung TV with rating >= 3 stars is: ${titleElement.text()}`
        )
      );
    cy.get("@mostExpProduct")
      .find("[class*='product-new-price']")
      .then((priceElement) => cy.log(`The price is: ${priceElement.text()}`));
  });
});

describe("Product Selection on Shopping Website for accessories", () => {
  beforeEach(() => {
    homePage.searchForProduct("accesorii televizoare");
  });
  it("Should have products visible after searching for TV accessories", () => {
    productsPage.elements.products().should("be.visible");
  });

  it("Selects an accessory of the same brand as the TV", () => {
    homePage.searchForProduct("accesorii televizoare");
    productsPage.filterByBrand("Samsung");
    productsPage.filterByRating(3);
    productsPage.sortByPrice("asc");
    productsPage.elements.products().first().as("leastExpProduct");
    cy.get("@leastExpProduct")
      .find("[class*=title]")
      .first()
      .then((titleElement) =>
        cy.log(
          `The least expensive Samsung TV accesory with rating >= 3 stars is: ${titleElement.text()}`
        )
      );
    cy.get("@leastExpProduct")
      .find("[class*='product-new-price']")
      .then((priceElement) => cy.log(`The price is: ${priceElement.text()}`));
  });
});
// The tests before this line won't run as I used only on the describe block of the next tests but I used them to scaffold basically my task little by little,  the final test is improved, but I won't modify the state I left these tests for you to see how I changed the final test

// For this scenario I assumed you want me to select the most expensive available product since I have to add it to cart and the least expensive one, also I assumed you wanted me to check the cart data agains the page data to see if the price change from the page to the cart

describe.only("Complete product selection and basket price verification", () => {
  beforeEach(() => {
    homePage.searchForProduct("televizoare");
  });
  it("Given a brand, adds the most expensive TV and accessory to the basket, then verifies total price", () => {
    const brand = "Samsung";
    const accesoriesSearchText = "accesorii televizoare";
    const productData = {};
    let tvCartPrice;
    let tvAccCartPrice;

    // --- Step 1: Find and Add MOST Expensive TV ---
    productsPage.filterByBrand(brand);
    productsPage.filterByRating(3);
    productsPage.sortByPrice("desc");
    productsPage.selectFirstAvailableProduct().as("mostExpProduct");

    // Click "Add to Cart" and handle modal
    cy.get("@mostExpProduct").find("button[type=submit]").click();
    productsPage.elements.shoppingCartModal().should("be.visible");
    productsPage.elements.shoppingCartModalCloseButton().click(); // Close the modal

    // --- Step 2: Extract and Save MOST Expensive TV Data ---
    cy.get("@mostExpProduct").then(($mostExpEl) => {
      productData.productTvTitle = Cypress.$($mostExpEl)
        .find("[class*=title]")
        .first()
        .text();
      productData.productTvPrice = Cypress.$($mostExpEl)
        .find("[class*='product-new-price']")
        .text();
    });

    // --- Step 3: Search for Accessories and Find/Add LEAST Expensive ---
    cy.get("#searchboxTrigger").should("be.visible").clear();
    cy.wait(1000); // This wait is here because of flakyness(don't know if this is even  a word to be honest)
    cy.get("#searchboxTrigger").type(accesoriesSearchText);
    cy.press(Cypress.Keyboard.Keys.ENTER);

    productsPage.filterByBrand(brand);
    productsPage.sortByPrice("asc");
    productsPage.selectFirstAvailableProduct().as("leastExpProduct");

    // Click "Add to Cart"
    cy.get("@leastExpProduct").find("button[type=submit]").click();

    // --- Step 4: Extract and Save LEAST Expensive Accessory Data ---
    cy.get("@leastExpProduct").then(($leastExpEl) => {
      productData.productTvAccTitle = Cypress.$($leastExpEl)
        .find("[class*=title]")
        .first()
        .text();
      productData.productTvAccPrice = Cypress.$($leastExpEl)
        .find("[class*='product-new-price']")
        .text();
    });

    // --- Step 5: Write All Collected Data to File ---
    cy.then(() => {
      cy.writeFile(
        "cypress/fixtures/shoppingWebsiteFixtures/cartData.json",
        productData
      );
    });
    // --- Step 6: Go to the cart and verify data ---
    productsPage.elements.shoppingCartModal().should("be.visible");
    productsPage.elements
      .shoppingCartModal()
      .filter(":visible")
      .scrollIntoView()
      .click();
    cartPage.checkBrandInTitle(brand);
    cy.fixture("shoppingWebsiteFixtures/cartData.json").then((data) => {
      cartPage.verifyPrice("productTv", data);
      cartPage.verifyPrice("productTvAcc", data);

      // Refactored this code to be more compact and reusable

      // cartPage.elements
      //   .productPrice(data.productTvTitle)
      //   .invoke("text")
      //   .then((cartPriceText) => {
      //     const cartPrice = cartPage.formatPrice(cartPriceText);
      //     const pagePrice = cartPage.formatPrice(data.productTvPrice);
      //     tvCartPrice = cartPrice;
      //     expect(cartPrice).to.equal(pagePrice);
      //   });
      // cartPage.elements
      //   .productPrice(data.productTvAccTitle)
      //   .invoke("text")
      //   .then((cartPriceText) => {
      //     const cartPrice = cartPage.formatPrice(cartPriceText);
      //     const pagePrice = cartPage.formatPrice(data.productTvAccPrice);
      //     tvAccCartPrice = cartPrice;
      //     expect(cartPrice).to.equal(pagePrice);
      //   });
    });
    cartPage.elements
      .totalCartPrice()
      .invoke("text")
      .then((totalCart) => {
        const totalCartValue = cartPage.formatPrice(totalCart);
        cy.get("@productTvNumericPrice").then((tvCartPrice) => {
          cy.get("@productTvAccNumericPrice").then((tvAccCartPrice) => {
            const totalCartCalculatedPrice = tvCartPrice + tvAccCartPrice;
            expect(totalCartValue).to.equal(totalCartCalculatedPrice);
          });
        });
      });
  });
});
