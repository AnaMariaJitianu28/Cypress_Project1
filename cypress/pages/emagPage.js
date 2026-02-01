class EmagPage {
  visit() {
    cy.visit("https://www.emag.ro/");
  }

  acceptCookies() {
    cy.acceptCookies();
  }

  searchProduct(term) {
    cy.searchProduct(term);
  }

  sortByPriceDescending() {
    cy.get(".sort-control-btn-dropdown .sort-control-btn")
      .should("be.visible")
      .first()
      .click({ force: true });
    cy.get(".listing-sorting-dropdown .js-sort-option", { timeout: 5000 })
      .should("be.visible")
      .contains("Pret descrescator")
      .click({ force: true });
  }

  sortByPriceAscending() {
    cy.get(".sort-control-btn-dropdown .sort-control-btn")
      .should("be.visible")
      .first()
      .click({ force: true });
    cy.get(".listing-sorting-dropdown .js-sort-option", { timeout: 5000 })
      .should("be.visible")
      .contains("Pret crescator")
      .click({ force: true });
  }

  filterByBrand(brand) {
    cy.get(`.js-filter-item[data-name="${brand}"]`).first().click();
  }

  filterByRating() {
    cy.get('.js-filter-item[data-option-id="3-5"]').first().click();
  }

  selectFirstProduct() {
    cy.get(".card-item, .card-v2")
      .first()
      .within(() => {
        cy.get("a").first().invoke("removeAttr", "target").click();
      });
  }

  addToCart() {
    cy.get('button[data-test="main-add-to-cart-button"]')
      .should("be.visible")
      .click();
  }

  goToCart() {
    cy.get('a[data-test="atc-modal-cart-details"]')
      .should("be.visible")
      .first()
      .click();
  }

  getProductPrice() {
    return cy.get('p.product-new-price[data-test="main-price"]').invoke("text");
  }

  getProductName() {
    return cy.get('h1.page-title[data-test="page-title"]').invoke("text");
  }

  verifyCartTotal() {
    return cy.get(
      ".line-item.line-item-footer.d-none.d-md-block p.product-new-price",
    );
  }
}

export default EmagPage;
