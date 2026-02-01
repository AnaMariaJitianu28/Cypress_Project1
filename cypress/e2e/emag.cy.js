// describe("eMAG Shopping Scenario", () => {
//   it("Step 2: Search for TVs", () => {
//     cy.visit("https://www.emag.ro/");
//     // Accept cookies if the popup appears
//     cy.get("body").then(($body) => {
//       if ($body.find("button#accept-cookie-policy").length) {
//         cy.get("button#accept-cookie-policy").click();
//       }
//     });
//     // Wait for the search input to be visible
//     cy.get('input[type="search"]').should("be.visible").as("searchInput");
//     // Type "televizor" and press Enter
//     cy.get("@searchInput").type("televizor{enter}");
//     // Assert that results are loaded
//     cy.contains("Televizor", { timeout: 10000 }).should("exist");
//   });
// });

describe("eMAG Shopping Scenario", () => {
  it("Steps 2-4: Search for TVs, sort, filter, add to cart, then add Samsung accessory", () => {
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
    // Search for Samsung accessories (e.g., "accesorii televizor Samsung")
    cy.get('input[type="search"]').should("be.visible").as("searchInput");
    cy.get("@searchInput").type("accesorii televizor Samsung{enter}");

    // Assert that results are loaded
    // cy.contains("Accesoriu", { timeout: 10000 }).should("exist");

    // Sort by lowest price
    cy.get(".sort-control-btn-dropdown .sort-control-btn")
      .should("be.visible")
      .first()
      .click({ force: true });
    cy.get(".listing-sorting-dropdown .js-sort-option", { timeout: 5000 })
      .should("be.visible")
      .contains("Pret crescator")
      .click({ force: true });

    cy.wait(2000);

    // Filter by brand "Samsung"
    cy.get('.js-filter-item[data-name="Samsung"]').first().click();
    cy.wait(2000);

    // Filter by rating >= 3 stars
    cy.get('.js-filter-item[data-option-id="3-5"]').first().click();
    cy.wait(2000);

    // Assert that at least one accessory is visible
    cy.get(".card-item, .card-v2").first().should("be.visible");

    // Pick the first accessory (lowest price)
    cy.get(".card-item, .card-v2")
      .first()
      .within(() => {
        cy.get(".card-v2-title, .card-item-title")
          .invoke("text")
          .as("accessoryName");
        cy.get(".product-new-price, .card-v2-price")
          .first()
          .invoke("text")
          .as("accessoryPrice");
        cy.get("a").first().invoke("removeAttr", "target").click();
      });

    // Extract name and price from product page
    cy.get('h1.page-title[data-test="page-title"]')
      .invoke("text")
      .then((accessoryName) => {
        cy.log("Selected accessory name: " + accessoryName.trim());
        cy.wrap(accessoryName.trim()).as("accessoryName");
      });

    cy.get('p.product-new-price[data-test="main-price"]')
      .invoke("text")
      .then((accessoryPrice) => {
        cy.log("Selected accessory price: " + accessoryPrice.trim());
        cy.wrap(accessoryPrice.trim()).as("accessoryPrice");
      });

    // Add the accessory to the cart
    cy.get('button[data-test="main-add-to-cart-button"]')
      .should("be.visible")
      .click();

    // Go to cart details
    cy.get('a[data-test="atc-modal-cart-details"]')
      .should("be.visible")
      .first()
      .click();

    cy.wait(2000); // Wait for the cart page to load

    // // --- Cart verification ---
    // // Get all product prices from the cart
    // cy.get("p.product-new-price").then(($prices) => {
    //   // Extract numeric price for each product
    //   const productPrices = [];
    //   $prices.each((i, el) => {
    //     const priceText = el.childNodes[0].nodeValue;
    //     const decimalText =
    //       el.querySelector("small.mf-decimal")?.textContent || "00";
    //     const fullPrice = `${priceText.replace(/\./g, "")}.${decimalText}`;
    //     productPrices.push(parseFloat(fullPrice));
    //   });

    //   // Get the final price from the summary
    //   cy.get('div[data-test="summaryTotal"]').then(($total) => {
    //     const totalText = $total[0].childNodes[0].nodeValue; // e.g. "36.221"
    //     const totalDecimal = $total.find("small.mf-decimal").text() || "00"; // e.g. "35"
    //     const totalPrice = parseFloat(
    //       `${totalText.replace(/\./g, "")}.${totalDecimal}`,
    //     );

    //     // Calculate expected sum
    //     const expectedSum = productPrices.reduce((a, b) => a + b, 0);

    //     // Assert that the total price matches the sum of product prices
    //     expect(totalPrice).to.be.closeTo(expectedSum, 0.01);

    //     // Optionally, log the values
    //     cy.log(`Product prices: ${productPrices.join(" + ")} = ${expectedSum}`);
    //     cy.log(`Cart total: ${totalPrice}`);
    //   });
    // });

    // // --- Cart verification ---
    // cy.get("p.product-new-price").then(($prices) => {
    //   const productPrices = [];
    //   $prices.each((i, el) => {
    //     let priceText = el.childNodes[0].nodeValue.trim(); // e.g. "49.652"
    //     priceText = priceText.replace(/\./g, ""); // Remove thousands separator
    //     const decimalText =
    //       el.querySelector("small.mf-decimal")?.textContent.trim() || "00";
    //     // Combine and parse as float
    //     const fullPrice = parseFloat(`${priceText}.${decimalText}`);
    //     productPrices.push(fullPrice);
    //   });

    //   // Get the final price from the summary
    //   cy.get('div[data-test="summaryTotal"]').then(($total) => {
    //     let totalText = $total[0].childNodes[0].nodeValue.trim(); // e.g. "99.304"
    //     totalText = totalText.replace(/\./g, "");
    //     const totalDecimal =
    //       $total.find("small.mf-decimal").text().trim() || "00";
    //     const totalPrice = parseFloat(`${totalText}.${totalDecimal}`);

    //     // Calculate expected sum
    //     const expectedSum = productPrices.reduce((a, b) => a + b, 0);

    //     // Assert that the total price matches the sum of product prices
    //     expect(totalPrice).to.be.closeTo(expectedSum, 0.01);

    //     cy.log(`Product prices: ${productPrices.join(" + ")} = ${expectedSum}`);
    //     cy.log(`Cart total: ${totalPrice}`);
    //   });
    // });

    // --- Cart verification ---
    // Get product prices from visible line items only
    cy.get(
      ".line-item.line-item-footer.d-none.d-md-block p.product-new-price",
    ).then(($prices) => {
      cy.log(`Found ${$prices.length} visible product prices`);

      const productPrices = [];

      $prices.each((i, priceEl) => {
        cy.log(`\n--- Processing Product ${i + 1} ---`);

        // Get the integer part (text node before the <sup>)
        let priceText = priceEl.childNodes[0].nodeValue.trim();
        cy.log(`Raw price text: "${priceText}"`);

        // Remove thousands separator (dot)
        priceText = priceText.replace(/\./g, "");
        cy.log(`After removing thousands separator: "${priceText}"`);

        // Get the decimal part from inside the <sup><small class="mf-decimal">,</small>00</sup>
        const sup = priceEl.querySelector("sup");
        let decimalText = "00";
        if (sup && sup.childNodes.length > 1) {
          decimalText = sup.childNodes[1].nodeValue.trim();
        }
        cy.log(`Decimal part: "${decimalText}"`);

        // Combine price and decimal
        const fullPriceStr = `${priceText}.${decimalText}`;
        cy.log(`Combined price string: "${fullPriceStr}"`);

        const fullPrice = parseFloat(fullPriceStr);
        cy.log(`Parsed price value: ${fullPrice}`);

        productPrices.push(fullPrice);
      });

      cy.log(`\n=== All product prices: [${productPrices.join(", ")}] ===`);

      // Get the final price from the summary
      cy.get('div[data-test="summaryTotal"]').then(($total) => {
        cy.log(`\n--- Processing Total ---`);

        // Get the integer part (text node before the <sup>)
        let totalText = $total[0].childNodes[0].nodeValue.trim();
        cy.log(`Raw total text: "${totalText}"`);

        // Remove thousands separator (dot)
        totalText = totalText.replace(/\./g, "");
        cy.log(`After removing thousands separator: "${totalText}"`);

        // Get the decimal part from inside the <sup>
        const sup = $total.find("sup")[0];
        let totalDecimal = "00";
        if (sup && sup.childNodes.length > 1) {
          totalDecimal = sup.childNodes[1].nodeValue.trim();
        }
        cy.log(`Decimal part: "${totalDecimal}"`);

        // Combine total and decimal
        const totalPriceStr = `${totalText}.${totalDecimal}`;
        cy.log(`Combined total string: "${totalPriceStr}"`);

        const totalPrice = parseFloat(totalPriceStr);
        cy.log(`Parsed total value: ${totalPrice}`);

        // Calculate expected sum
        const expectedSum = productPrices.reduce((a, b) => a + b, 0);
        cy.log(
          `\n=== Expected sum: ${productPrices.join(" + ")} = ${expectedSum} ===`,
        );
        cy.log(`=== Cart total: ${totalPrice} ===\n`);

        // Assert that the total price matches the sum of product prices
        expect(totalPrice).to.be.closeTo(expectedSum, 0.01);

        cy.log(
          `✓ Verification PASSED: Sum (${expectedSum}) matches total (${totalPrice})`,
        );
      });
    });
  });
});
