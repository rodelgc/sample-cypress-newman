export function sideNavAccountBalance(): Cypress.Chainable<JQuery<Element>> {
  return cy.dataTest('sidenav-user-balance');
}
