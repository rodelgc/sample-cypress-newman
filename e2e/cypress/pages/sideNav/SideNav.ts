export function navigateToBankAccounts() {
  cy.get('[data-test="sidenav-bankaccounts"]').click();
  cy.url().should('contain', '/bankaccounts');
}
export function navigateToMyAccount() {
  cy.get('[data-test="sidenav-user-settings"]').click();
  cy.url().should('contain', '/user/settings');
}
