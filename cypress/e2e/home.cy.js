// import HomePage from "../pages/homePage";

// describe("AirportLabs Home Page", () => {
//   const homePage = new HomePage();

//   it("Scenario 1 | Section title: verify text, font size/weight, visibility (desktop & mobile)", () => {
//     homePage.visit();

//     // Desktop
//     cy.viewport(1280, 800);
//     cy.get("h3.h2")
//       .scrollIntoView()
//       .should("be.visible")
//       .and("have.text", "Our products are connected")
//       .and(($el) => {
//         expect($el).to.have.css("font-size");
//         expect($el).to.have.css("font-weight");
//       });

//     // Mobile
//     cy.viewport("iphone-6");
//     cy.get("h3.h2")
//       .should("be.visible")
//       .and("have.text", "Our products are connected");
//   });
// });

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
