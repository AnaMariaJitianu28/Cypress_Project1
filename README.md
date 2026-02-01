# Cypress_Project1

## Overview

This project demonstrates end-to-end testing of https://airportlabs.com/ using Cypress, following best practices:

- Page Object Model (POM)
- Custom Cypress command
- Data-driven test using fixtures
- Negative test

## Prerequisites

Node.js (includes npm)
Git

## Installation

Clone the repository and install dependencies:

git clone https://github.com/AnaMariaJitianu28/Cypress_Project1.git
cd Cypress_Project1
npm install

## Running Tests

Open Cypress Test Runner (GUI):
npx cypress open
Run all tests in headless mode:
npx cypress run

## Cypress Version

Cypress ^15.9.0 (see package.json)

## Project Structure

cypress/  
 e2e/ # Test files (emag.cy.js, home.cy.js)  
 fixtures/ # Test data (statistics.json, products.json)  
 pages/ # Page Object Models (emagPage.js, homePage.js)  
 support/ # Custom commands (commands.js)  
cypress.config.js # Cypress configuration  
package.json # Project dependencies and scripts  
.gitignore # Files/folders ignored by git  
README.md # Project documentation
