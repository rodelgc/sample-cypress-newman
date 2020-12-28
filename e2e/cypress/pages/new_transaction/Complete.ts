export function transactionSummary(): Cypress.Chainable<JQuery<Element>> {
  const $message = '[class^=MuiBox-root]:nth-child(2) h2';

  return cy.get($message);
}

export function clickReturnToTransactions(): void {
  const $returnToTransactionsButton = 'new-transaction-return-to-transactions';

  cy.dataTest($returnToTransactionsButton).click();
}
