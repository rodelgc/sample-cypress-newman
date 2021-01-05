export function clickDone(): Cypress.Chainable<JQuery<Element>> {
  return cy.dataTest('user-onboarding-next').contains('Done').click();
}
