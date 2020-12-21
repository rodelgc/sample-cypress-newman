export function visitSignInPage() {
  cy.visit('/');
  assertThatUserIsAtSignInPage();
}

export function clickSignUpLink() {
  cy.get('[data-test=signup]').click();
  cy.url().should('contain', '/signup');
  cy.get('[data-test=signup-title]').should('contain', 'Sign Up');
}

export function login({ username, password }) {
  cy.get('#username')
    .clear()
    .type(username)
    .get('#password')
    .clear()
    .type(password)
    .get('[name="remember"]')
    .check()
    .get('[data-test="signin-submit"]')
    .click();
}

export function assertThatUserIsAtSignInPage() {
  cy.url().should('contain', '/signin');
  cy.get('h1').should('have.text', 'Sign in');
}
