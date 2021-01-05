export function onboardingFinishedModalTitle(): Cypress.Chainable<
  JQuery<Element>
> {
  return cy.dataTest('user-onboarding-dialog-title').contains('Finished');
}

export function onboardingFinishedModalContent(): Cypress.Chainable<
  JQuery<Element>
> {
  return cy
    .dataTest('user-onboarding-dialog-content')
    .contains(
      /^You're all set!.*We're excited to have you aboard the Real World App!$/
    );
}
