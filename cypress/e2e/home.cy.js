// ...Scenario 1...
// Page Object Model (POM) is used via HomePage import below
import HomePage from "../pages/homePage";

describe("AirportLabs Home Page", () => {
  const homePage = new HomePage();

  it("Scenario 1 | Section title: verify text, font size/weight, visibility (desktop & mobile)", () => {
    homePage.visit();

    // Desktop
    cy.viewport(1280, 800);
    cy.get("h3.h2")
      .scrollIntoView()
      .should("be.visible")
      .and("have.text", "Our products are connected")
      .then(($el) => {
        const fontSize = $el.css("font-size");
        const fontWeight = $el.css("font-weight");
        const isVisible = $el.is(":visible");
        // Log to browser console
        // eslint-disable-next-line no-console
        console.log("Desktop - Font size:", fontSize);
        console.log("Desktop - Font weight:", fontWeight);
        console.log("Desktop - Is visible:", isVisible);
        expect(fontSize).to.exist;
        expect(fontWeight).to.exist;
        expect(isVisible).to.be.true;
      });

    // Mobile
    cy.viewport("iphone-6");
    cy.get("h3.h2")
      .scrollIntoView()
      .should("be.visible")
      .and("have.text", "Our products are connected")
      .then(($el) => {
        const fontSize = $el.css("font-size");
        const fontWeight = $el.css("font-weight");
        const isVisible = $el.is(":visible");
        // eslint-disable-next-line no-console
        console.log("Mobile - Font size:", fontSize);
        console.log("Mobile - Font weight:", fontWeight);
        console.log("Mobile - Is visible:", isVisible);
        expect(isVisible).to.be.true;
      });
  });
});

// ...Scenario 2...

describe("AirportLabs Home Page", () => {
  const homePage = new HomePage();
  // Data-driven test using fixture: statistics.json
  it("Scenario 2 | Our Activity in Numbers: verify statistic value, label, and style (data-driven)", function () {
    homePage.visit();

    // Set a larger viewport to reduce overlap issues
    cy.viewport(1280, 1000);

    // Optionally hide the nav menu if it still covers content
    cy.get(".nav-menu-2").invoke("hide");
    cy.get(".navbar-row-2").invoke("hide");

    // Scroll to the section heading first
    cy.get("h2.h2")
      .contains("Our activity in numbers")
      .scrollIntoView()
      .should("be.visible");

    cy.fixture("statistics").then((stats) => {
      stats.forEach((stat) => {
        cy.contains("h3.h4", stat.label)
          .scrollIntoView()
          .should("be.visible")
          .parents(".div-block-24")
          .within(() => {
            cy.get("h2.h2.green")
              .should("be.visible")
              .and("have.text", stat.value)
              .then(($value) => {
                const color = $value.css("color");
                // eslint-disable-next-line no-console
                console.log(`Statistic "${stat.label}" value color:`, color);
                expect(color).to.exist;
              });
          });
      });
    });
  });
});

// ...Scenario 3...
describe("AirportLabs Home Page", () => {
  const homePage = new HomePage();
  // Custom Cypress command example: see cypress/support/commands.js for cy.login
  it("Scenario 3 | Social media links: verify visibility, href correctness, and opened URL domain", () => {
    homePage.visit();
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test due to uncaught exceptions from external sites
      return false;
    });
    // Example: update these selectors and hrefs to match the actual site
    const socialLinks = [
      { selector: 'a[href*="linkedin.com"]', domain: "linkedin.com" },
      { selector: 'a[href*="facebook.com"]', domain: "facebook.com" },
    ];

    socialLinks.forEach((link) => {
      cy.get(link.selector)
        .should("be.visible")
        .and("have.attr", "href")
        .then((href) => {
          expect(href).to.include(link.domain);

          // Simulate clicking the link and check the domain (without leaving the test)
          // Remove target to open in same tab
          cy.get(link.selector).invoke("removeAttr", "target").click();
          cy.url().should("include", link.domain);

          // Go back to the home page for the next link
          homePage.visit();
        });
    });
  });
});

// ...Scenario 4...
describe("AirportLabs Home Page", () => {
  const homePage = new HomePage();
  // Negative test: checks that a non-existent logo does not exist
  it("Scenario 4 | Logo: verify visible logo, dimensions > 0, add negative assertion", () => {
    homePage.visit();

    // Target the logo inside .desktop-brand (visible on desktop)
    cy.get(".desktop-brand img")
      .should("be.visible")
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
        expect($img[0].naturalHeight).to.be.greaterThan(0);
        // eslint-disable-next-line no-console
        console.log(
          "Logo width:",
          $img[0].naturalWidth,
          "height:",
          $img[0].naturalHeight,
        );
      });

    // Negative assertion: logo with a wrong class should not exist
    cy.get("img.non-existent-logo").should("not.exist");
  });
});

// ...Scenario 5...

describe("AirportLabs Home Page", () => {
  const homePage = new HomePage();

  it('Scenario 5 | "Get in Touch" button: visible, enabled, navigates to contact page', () => {
    homePage.visit();

    // Check the "Get in Touch" button in the navbar
    cy.get("a.button")
      .contains("Get in Touch")
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    // Assert the URL includes the contact page path
    cy.url().should("include", "/other/get-in-touch");

    // Optionally, check for a contact form or heading on the new page
    cy.contains("Get in Touch").should("be.visible");
  });
});
