import { Transaction } from '../models/Transaction';
import { navigateToMineTab } from '../pages/top_nav/TopNav';
import {
  clickReturnToTransactions,
  transactionSummary
} from '../pages/new_transaction/Complete';
import { clickNewTransactionButton } from '../pages/home/NewTransactionButton';
import {
  clickRequestButton,
  fillPaymentForm,
  PaymentFormHeader
} from '../pages/new_transaction/PaymentForm';
import {
  searchResult,
  searchContact
} from '../pages/new_transaction/SelectContactForm';
import { toMoneyFormat } from '../support/utils';
import {
  action,
  amount,
  commentCount,
  description,
  likeCount,
  receiver,
  sender,
  transactionListItem
} from '../pages/home/TransactionListItem';
import User from '../models/User';

describe('Transaction', () => {
  it('request payment', () => {
    cy.dbFindUsers(2).then((users) => {
      const requester: User = users[0];
      const payer: User = users[1];
      const transaction = new Transaction(payer);
      const summaryAmount: number = Math.floor(transaction.amount / 100);
      requester.password = Cypress.env('GLOBAL_PASSWORD');
      payer.password = Cypress.env('GLOBAL_PASSWORD');

      cy.login(requester);

      // create new transaction
      clickNewTransactionButton();
      // step 1
      searchContact(payer);
      searchResult(payer).within(($row) => {
        expect($row).to.contain(payer.username);
        expect($row).to.contain(payer.email);
        expect($row).to.contain(payer.phoneNumber);
        cy.wrap($row).click();
      });
      // step 2
      PaymentFormHeader()
        .should('contain', `${payer.firstName}`)
        .and('contain', `${payer.lastName}`);
      fillPaymentForm(transaction);
      clickRequestButton();
      cy.wait('@createTransaction')
        .its('response.body.transaction.id')
        .then((id) => {
          transaction.id = id;

          // step 3
          transactionSummary()
            .should('contain', 'Requested')
            .and('contain', toMoneyFormat(summaryAmount))
            .and('contain', transaction.description);

          // return to home
          clickReturnToTransactions();
          cy.url().should('eq', `${Cypress.config().baseUrl}/`);

          // verify transaction details in the Mine tab
          navigateToMineTab();
          transactionListItem(transaction).within(() => {
            sender().should(
              'have.text',
              `${requester.firstName} ${requester.lastName}`
            );
            action().should('contain', 'requested');
            receiver().should(
              'have.text',
              `${payer.firstName} ${payer.lastName}`
            );
            amount()
              .should('contain', '+')
              .and('contain', toMoneyFormat(summaryAmount));
            description().should('have.text', transaction.description);
            likeCount().should('have.text', '0');
            commentCount().should('have.text', '0');
          });
        });
    });
  });
});
