# Cypress_Project1

## Overview

This project demonstrates end-to-end testing of https://airportlabs.com/ using Cypress, following best practices:
- Page Object Model (POM)
- Custom Cypress command
- Data-driven test using fixtures
- Negative test

## Prerequisites

- [Node.js](https://nodejs.org/) (includes npm)
- [Git](https://git-scm.com/)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AnaMariaJitianu28/Cypress_Project1.git
cd Cypress_Project1
npm install
```

## Running Tests

To open the Cypress Test Runner (GUI):

```bash
npx cypress open
```

To run all tests in headless mode:

```bash
npx cypress run
```

## Cypress Version

- Cypress ^15.9.0 (see `package.json`)

## Project Structure

```
cypress/
  e2e/                # Test files (see home.cy.js for all scenarios)
  fixtures/           # Test data (see statistics.json for data-driven test)
  pages/              # Page Object Model classes (homePage.js, loginPage.js)
  support/            # Custom commands (commands.js)
cypress.config.js     # Cypress configuration
package.json          # Project dependencies and scripts
.gitignore            # Files/folders ignored by git
README.md             # Project documentation
```

## Key Features

- **Page Object Model (POM):** See `cypress/pages/homePage.js` and `loginPage.js`.
- **Custom Cypress Command:** See `cypress/support/commands.js` for `cy.login`.
- **Data-driven Test:** See Scenario 2 in `cypress/e2e/home.cy.js` using `cypress/fixtures/statistics.json`.
- **Negative Test:** See Scenario 4 in `cypress/e2e/home.cy.js` (logo negative assertion).

## Scenarios Covered

1. Section title: verify text, font size/weight, visibility (desktop & mobile)
2. Our Activity in Numbers: verify statistic value, label, style (data-driven)
3. Social media links: verify visibility, href, and opened URL domain
4. Logo: verify visible logo, dimensions > 0, negative assertion
5. "Get in Touch" button: visible, enabled, navigates to contact page



---

Feel free to copy, edit, and add this as your `README.md`. Let me know if you want to include screenshots, badges, or more details!
