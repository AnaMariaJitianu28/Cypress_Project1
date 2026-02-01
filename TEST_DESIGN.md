## Why this structure

- I followed common Cypress patterns.
- Tests are split by feature (`home.cy.js`, `emag.cy.js`) so it’s easier to find things.
- Page Object Model keeps selectors/actions together, which makes updates less painful.
- Fixtures keep data outside the test logic, so changes don’t break everything.
- Custom commands keep repeated steps short and readable.

## If I had 2 more hours

- Add more data-driven cases (more brands, categories, ratings).
- Add API/network checks to reduce flakiness.
- Add simple visual checks for key pages.
- Clean up some selectors and reuse more POM methods.

## Easy vs fragile to maintain

Easy:

- POM methods (one place to update selectors).
- Fixtures (easy to change data).
- Simple visibility/text assertions.

Fragile:

- Anything dependent on live product lists/prices.
- UI filters/sorting that change often.
- Steps that rely on timing or popups.
