export function createBankAccountForm() {
  return cy.get('[data-test="bankaccount-form"]');
}

export function fillCreateBankAccountFormAndSubmit({
  bankName,
  routingNumber,
  accountNumber
}) {
  cy.get("#bankaccount-bankName-input")
    .clear()
    .type(bankName)
    .get("#bankaccount-routingNumber-input")
    .clear()
    .type(routingNumber)
    .get("#bankaccount-accountNumber-input")
    .clear()
    .type(accountNumber)
    .get('[data-test="bankaccount-submit"]')
    .click();
}
