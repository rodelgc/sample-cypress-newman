export function fillSignUpFormAndSubmit({
  firstName,
  lastName,
  username,
  password
}) {
  typeFirstName(firstName);
  typeLastName(lastName);
  typeUsername(username);
  typePassword(password);
  typeConfirmPassword(password);
  submit();
}

function typeFirstName(firstName) {
  cy.get("#firstName")
    .should("have.focus")
    .clear()
    .type(firstName)
    .should("have.value", firstName);
}

function typeLastName(lastName) {
  cy.get("#lastName").clear().type(lastName).should("have.value", lastName);
}

function typeUsername(username) {
  cy.get("#username").clear().type(username).should("have.value", username);
}

function typePassword(password) {
  cy.get("#password").clear().type(password).should("have.value", password);
}

function typeConfirmPassword(password) {
  cy.get("#confirmPassword")
    .clear()
    .type(password)
    .should("have.value", password);
}

function submit() {
  cy.get('[data-test="signup-submit"]').should("be.enabled").click();
}
