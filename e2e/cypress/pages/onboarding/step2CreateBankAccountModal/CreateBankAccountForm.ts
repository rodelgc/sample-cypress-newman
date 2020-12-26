import BankAccount from '../../../models/BankAccount';

export function createBankAccountForm(): Cypress.Chainable<JQuery<Element>> {
  return cy.dataTest('bankaccount-form');
}

export function fillCreateBankAccountFormAndSubmit({
  bankName,
  routingNumber,
  accountNumber
}: BankAccount): void {
  cy.get('#bankaccount-bankName-input')
    .clear()
    .type(bankName)
    .get('#bankaccount-routingNumber-input')
    .clear()
    .type(routingNumber)
    .get('#bankaccount-accountNumber-input')
    .clear()
    .type(accountNumber)
    .dataTest('bankaccount-submit')
    .click();
}
