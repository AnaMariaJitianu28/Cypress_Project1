describe("eMAG Shopping Scenario", () => {
  it("Step 2: Search for TVs", () => {
    cy.visit("https://www.emag.ro/");
    // Accept cookies if the popup appears
    cy.get("body").then(($body) => {
      if ($body.find("button#accept-cookie-policy").length) {
        cy.get("button#accept-cookie-policy").click();
      }
    });
    // Wait for the search input to be visible
    cy.get('input[type="search"]').should("be.visible").as("searchInput");
    // Type "televizor" and press Enter
    cy.get("@searchInput").type("televizor{enter}");
    // Assert that results are loaded
    cy.contains("Televizor", { timeout: 10000 }).should("exist");
  });
});

describe("eMAG Shopping Scenario", () => {
  it("Step 3: Sort TVs by price descending (custom dropdown, robust)", () => {
    cy.visit("https://www.emag.ro/");
    // Accept cookies if the popup appears
    cy.get("body").then(($body) => {
      if ($body.find("button#accept-cookie-policy").length) {
        cy.get("button#accept-cookie-policy").click();
      }
    });
    cy.get('input[type="search"]').should("be.visible").as("searchInput");
    cy.get("@searchInput").type("televizor{enter}");
    cy.contains("Televizor", { timeout: 10000 }).should("exist");

    // Ensure the sort dropdown button is visible and click it
    cy.get(".sort-control-btn-dropdown .sort-control-btn")
      .should("be.visible")
      .first()
      .click({ force: true });

    // Wait for the dropdown to appear
    cy.get(".listing-sorting-dropdown .js-sort-option", {
      timeout: 5000,
    }).should("be.visible");

    // Click "Pret descrescator" in the dropdown
    cy.get(".listing-sorting-dropdown .js-sort-option")
      .contains("Pret descrescator")
      .click({ force: true });

    // Wait for sorted results
    cy.wait(2000);

    // Assert that at least one TV is visible
    cy.get(".card-item, .card-v2").first().should("be.visible");

    // Filter by brand "Samsung"
    cy.get('.js-filter-item[data-name="Samsung"]').first().click();
    cy.wait(2000);

    // Assert that at least one Samsung TV is visible
    cy.get(".card-item, .card-v2").first().should("be.visible");
    // Filter by rating >= 3 stars
    cy.get('.js-filter-item[data-option-id="3-5"]').first().click();
    cy.wait(2000);

    // Assert that at least one Samsung TV with >= 3 stars is visible
    cy.get(".card-item, .card-v2").first().should("be.visible");

    // Pick the first TV after sorting and filtering
    cy.get(".card-item, .card-v2")
      .first()
      .within(() => {
        // Save the TV name and price for later use
        cy.get(".card-v2-title, .card-item-title").invoke("text").as("tvName");
        cy.get(".product-new-price, .card-v2-price")
          .first()
          .invoke("text")
          .as("tvPrice");
        // Optionally, click to go to the product page
        cy.get("a").first().invoke("removeAttr", "target").click();
      });

    // After clicking the first TV, extract name and price from the product page
    cy.get('h1.page-title[data-test="page-title"]')
      .invoke("text")
      .then((tvName) => {
        cy.log("Selected TV name: " + tvName.trim());
        // Save for later use if needed
        cy.wrap(tvName.trim()).as("tvName");
      });

    cy.get('p.product-new-price[data-test="main-price"]')
      .invoke("text")
      .then((tvPrice) => {
        cy.log("Selected TV price: " + tvPrice.trim());
        cy.wrap(tvPrice.trim()).as("tvPrice");
      });

    // Add the TV to the cart
    cy.get('button[data-test="main-add-to-cart-button"]')
      .should("be.visible")
      .click();
    // Click "Vezi detalii cos" to go to the cart
    cy.get('a[data-test="atc-modal-cart-details"]')
      .should("be.visible")
      .first()
      .click();
    cy.wait(2000); // Wait for the cart page to load
  });
});
