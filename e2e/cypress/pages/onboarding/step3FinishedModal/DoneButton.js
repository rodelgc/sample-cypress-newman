export function clickDone() {
  return cy.get('[data-test="user-onboarding-next"]').contains('Done').click();
}
