import User from '../../models/User';

export function userSettingsPageFirstNameInput() {
  return cy.get('[data-test="user-settings-firstName-input"]');
}

export function userSettingsPageLastNameInput() {
  return cy.get('[data-test="user-settings-lastName-input"]');
}

export function fillUserSettingsFormAndSave({ email, phoneNumber }: User) {
  cy.get('[data-test="user-settings-email-input"]')
    .clear()
    .type(email)
    .should('have.value', email)
    .get('[data-test="user-settings-phoneNumber-input"]')
    .clear()
    .type(phoneNumber)
    .should('have.value', phoneNumber)
    .get('[data-test="user-settings-submit"]')
    .click();
}
