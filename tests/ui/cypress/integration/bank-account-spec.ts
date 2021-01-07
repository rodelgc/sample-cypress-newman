import BankAccount from '../models/BankAccount';
import User from '../models/User';
import {
  bankAccountsListItem,
  createBankAccount,
  deleteBankAccount,
  deleteButton
} from '../pages/bank_accounts/BankAccountsList';
import { navigateToBankAccounts } from '../pages/side_nav/SideNav';

describe('Bank Account', () => {
  it('delete and create a bank account', () => {
    const user = new User();
    const oldBankAccount = new BankAccount();
    const newBankAccount = new BankAccount();

    cy.setupUser(user, oldBankAccount);
    cy.login(user);

    navigateToBankAccounts();

    deleteBankAccount(oldBankAccount);

    bankAccountsListItem(oldBankAccount).within(() => {
      cy.contains(oldBankAccount.bankName).should('contain', '(Deleted)');

      deleteButton().should('not.exist');
    });

    createBankAccount(newBankAccount);

    bankAccountsListItem(newBankAccount)
      .should('be.visible')
      .within(() => deleteButton().should('be.visible'));
  });
});
