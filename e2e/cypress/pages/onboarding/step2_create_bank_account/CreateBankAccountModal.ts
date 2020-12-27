export function createBankAccountModalTitle(): Cypress.Chainable<
  JQuery<Element>
> {
  return cy
    .dataTest('user-onboarding-dialog-title')
    .contains('Create Bank Account');
}
