export function createBankAccountModalTitle() {
  return cy
    .get('[data-test="user-onboarding-dialog-title"]')
    .contains('Create Bank Account');
}
