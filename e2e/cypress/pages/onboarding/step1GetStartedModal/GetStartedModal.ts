export function getStartedModalTitle(): Cypress.Chainable<JQuery<Element>> {
  return cy
    .dataTest('user-onboarding-dialog-title')
    .contains('Get Started with Real World App');
}

export function getStartedModalContent(): Cypress.Chainable<JQuery<Element>> {
  return cy
    .dataTest('user-onboarding-dialog-content')
    .contains(
      /^Real World App requires a Bank Account to perform transactions\.*Click.*Next.*to begin setup of your Bank Account\.$/
    );
}
