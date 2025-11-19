class productsPage {
  elements = {
    products: () => cy.get(".card-item"),
    brandFilter: (brand) => cy.get('[data-type="brand"]').contains(brand),
    ratingFilter: (stars) =>
      cy.get('[data-type="rating"]').find(`[data-option-id="${stars}-5"]`),
    sortDescOption: () =>
      cy.get("a[data-sort-id='price'][data-sort-dir='desc']"),
    sortAscOption: () => cy.get("a[data-sort-id='price'][data-sort-dir='asc']"),

    categoryFilter: (category) =>
      cy.get(`[data-ref="search_menu_category"][href*="${category}"]`),

    shoppingCartModal: () => cy.get("a[data-test='atc-modal-cart-details']"),
    shoppingCartModalCloseButton: () =>
      cy.get("button[data-test='atc-modal-close']"),
    // sortDropDown: () =>
    //   cy
    //     .get("span.control-label")
    //     .contains("Ordoneaza")
    //     .siblings()
    //     .find("button[class*='sort-control-btn']")
    //     .filter(":visible"),
    // I tried to select the sort dropdown button with a more complex selector to avoid flaky issues with multiple elements being found, but still had issues with it not opening properly sometimes
  };

  filterByBrand(brand) {
    this.elements.brandFilter(brand).scrollIntoView().click();
    this.elements.brandFilter(brand).should("have.attr", "data-is-selected");
  }

  filterByRating(minStars) {
    this.elements.ratingFilter(minStars).click();
  }

  sortByPrice(direction) {
    // this.elements.sortDropDown().scrollIntoView().should("be.visible").click();
    // this.elements.sortDropDown().trigger("mouseover");
    // cy.get(".listing-sorting-dropdown > ul[class*='dropdown-menu'] > li")
    //   .find("a[data-sort-id='price'][data-sort-dir='desc']")
    //   .click();
    // Since I ran into some flaky issues with the website dropdown not opening properly I opted to directly visit the sorted url, I left the previous code here for you to see what I tried initially
    const urlAddon =
      direction === "desc"
        ? this.elements.sortDescOption().invoke("attr", "href")
        : this.elements.sortAscOption().invoke("attr", "href");
    urlAddon.then((href) => {
      cy.url().then((currentUrl) => {
        const newUrl = new URL(href, currentUrl).toString();
        cy.visit(newUrl);
      });
    });
  }

  // sortInDescendingPrice() {
  //   // this.elements.sortDropDown().scrollIntoView().should("be.visible").click();
  //   // this.elements.sortDropDown().trigger("mouseover");
  //   // cy.get(".listing-sorting-dropdown > ul[class*='dropdown-menu'] > li")
  //   //   .find("a[data-sort-id='price'][data-sort-dir='desc']")
  //   //   .click();
  //   //Since I ran into some flaky issues with the website dropdown not opening properly I opted to directly visit the sorted url, I left the previous code here for you to see what I tried initially
  //   const urlAddon = this.elements.sortDescOption().invoke("attr", "href");
  //   urlAddon.then((href) => {
  //     cy.url().then((currentUrl) => {
  //       const newUrl = new URL(href, currentUrl).toString();
  //       cy.visit(newUrl);
  //     });
  //   });
  // }

  // sortInAscendingPrice() {
  //   const urlAddon = this.elements.sortAscOption().invoke("attr", "href");
  //   urlAddon.then((href) => {
  //     cy.url().then((currentUrl) => {
  //       const newUrl = new URL(href, currentUrl).toString();
  //       cy.visit(newUrl);
  //     });
  //   });
  // }
  // // this method uses the URL contructor to build the new URL based on the current URL and the href attribute of the sort option, ensuring that it works correctly regardless of the current page structure.

  // Normally I wouldn't leave this many comments but I did it just for the reason of showing my thought process
  // For the filter I observed that the data-availability attribute of 2 and 3 are in fact reserved for in stock or limited stock items so available ones while other numbers like 8 for out of stock or 9 for preorder are not of interest in this case
  selectFirstAvailableProduct() {
    return this.elements
      .products()
      .filter("[data-availability-id='2'], [data-availability-id='3']")
      .first();
  }
}

export default new productsPage();
