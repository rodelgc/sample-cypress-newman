import User from '../../models/User';

export function searchContact(user: User): void {
  const $searchInput = 'user-list-search-input';

  cy.intercept('users/search?q=*').as('searchUser');

  cy.dataTest($searchInput)
    .clear({ force: true })
    .type(`${user.firstName} ${user.lastName}`, { force: true });

  cy.wait('@searchUser');
}

export function searchResult(user: User): Cypress.Chainable<JQuery<Element>> {
  const $searchResult = `user-list-item-${user.id}`;

  return cy.dataTest($searchResult);
}
