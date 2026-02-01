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
├── e2e/ # Test files
│ ├── emag.cy.js # Main shopping scenario (search, filter, add to cart)
│ ├── home.cy.js # Additional home page tests
├── pages/ # Page Object Models
│ ├── emagPage.js # eMAG page interactions
│ ├── homePage.js # Home page interactions
├── fixtures/ # Test data
│ ├── products.json # Data-driven test products
│ ├── statistics.json # Home page statistics
├── support/
│ ├── commands.js # Custom Cypress commands
│ └── e2e.js # Global test setup
└── cypress.config.js # Cypress configuration
