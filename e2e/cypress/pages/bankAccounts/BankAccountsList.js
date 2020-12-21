export function bankAccountsListItem(bankName) {
  return cy.get('[data-test^="bankaccount-list-item-"]').contains(bankName);
}
