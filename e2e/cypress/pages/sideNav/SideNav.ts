import { USER_SETTINGS_PAGE_PATH } from '../userSettings/UserSettingsForm';

export function navigateToBankAccounts(): void {
  cy.dataTest('sidenav-bankaccounts').click();
  cy.url().should('contain', '/bankaccounts');
}
export function navigateToMyAccount(): void {
  cy.dataTest('sidenav-user-settings').click();
  cy.url().should('contain', USER_SETTINGS_PAGE_PATH);
}
