class HomePage {
  visit() {
    cy.visit("https://airportlabs.com/");
  }

  getSectionTitle(selector) {
    return cy.get(selector);
  }

  getStatistic(selector) {
    return cy.get(selector);
  }

  getSocialLink(selector) {
    return cy.get(selector);
  }

  getLogo(selector) {
    return cy.get(selector);
  }
}

export default HomePage;
