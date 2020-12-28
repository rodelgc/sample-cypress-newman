import { Transaction } from '../../models/Transaction';

export function transactionListItem(
  transaction: Transaction
): Cypress.Chainable<JQuery<Element>> {
  const $row = `transaction-item-${transaction.id}`;

  return cy.dataTest($row);
}

export function sender(): Cypress.Chainable<JQuery<Element>> {
  return cy.dataTestStartsWith('transaction-sender-');
}

export function action(): Cypress.Chainable<JQuery<Element>> {
  return cy.dataTestStartsWith('transaction-action-');
}

export function receiver(): Cypress.Chainable<JQuery<Element>> {
  return cy.dataTestStartsWith('transaction-receiver-');
}

export function amount(): Cypress.Chainable<JQuery<Element>> {
  return cy.dataTestStartsWith('transaction-amount-');
}

export function description(): Cypress.Chainable<JQuery<Element>> {
  return sender().parent('p').next('p');
}

export function likeCount(): Cypress.Chainable<JQuery<Element>> {
  return cy.dataTest('transaction-like-count');
}

export function commentCount(): Cypress.Chainable<JQuery<Element>> {
  return cy.dataTest('transaction-comment-count');
}
