export function bankAccountsListItem(
  bankName: string
): Cypress.Chainable<JQuery<Element>> {
  return cy.get('[data-test^="bankaccount-list-item-').contains(bankName);
}
