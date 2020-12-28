import { Transaction } from '../../models/Transaction';

export function PaymentFormHeader(): Cypress.Chainable<
  JQuery<HTMLHeadingElement>
> {
  return cy.get('h2');
}

export function fillPaymentForm(transaction: Transaction): void {
  const $amountInput = '#amount';
  const $noteInput = '#transaction-create-description-input';
  const amountInDollars: string = (transaction.amount / 100).toString();

  cy.intercept('/transactions').as('createTransaction');

  cy.get($amountInput)
    .clear()
    .type(amountInDollars)
    .get($noteInput)
    .clear()
    .type(transaction.description);
}

export function clickRequestButton(): void {
  const $requestButton = 'transaction-create-submit-request';

  cy.dataTest($requestButton).click();
}
