import BankAccount from '../../models/BankAccount';

export function bankAccountsListItem({ bankName }: BankAccount) {
  return cy.get('[data-test^="bankaccount-list-item-"]').contains(bankName);
}
