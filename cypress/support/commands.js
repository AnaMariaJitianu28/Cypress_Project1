// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ...existing code...

Cypress.Commands.add("acceptCookies", () => {
  cy.get("body").then(($body) => {
    if ($body.find("button#accept-cookie-policy").length) {
      cy.get("button#accept-cookie-policy").click();
    }
  });
});

Cypress.Commands.add("searchProduct", (searchTerm) => {
  cy.get('input[type="search"]')
    .should("be.visible")
    .clear()
    .type(`${searchTerm}{enter}`);
});
