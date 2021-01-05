export function clickNewTransactionButton(): void {
  const $newTransButton = 'nav-top-new-transaction';

  cy.dataTest($newTransButton).click();
}
