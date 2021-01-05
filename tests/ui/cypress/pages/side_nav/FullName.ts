export function sideNavFullName(): Cypress.Chainable<JQuery<Element>> {
  return cy.dataTest('sidenav-user-full-name');
}
