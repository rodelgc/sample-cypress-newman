export function userSettingsPageFirstNameInput() {
  return cy.get('[data-test="user-settings-firstName-input"]');
}

export function userSettingsPageLastNameInput() {
  return cy.get('[data-test="user-settings-lastName-input"]');
}

export function userSettingsPageEmailInput() {
  return cy.get('[data-test="user-settings-email-input"]');
}

export function userSettingsPagePhoneNumberInput() {
  return cy.get('[data-test="user-settings-phoneNumber-input"]');
}

export function fillUserSettingsFormAndSave({ email, phoneNumber }) {
  userSettingsPageEmailInput().clear().type(email).should("have.value", email);
  userSettingsPagePhoneNumberInput()
    .clear()
    .type(phoneNumber)
    .should("have.value", phoneNumber);

  cy.get('[data-test="user-settings-submit"]').click();
}
