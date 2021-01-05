export function sideNavUsername(): Cypress.Chainable<JQuery<Element>> {
  return cy.dataTest('sidenav-username');
}
