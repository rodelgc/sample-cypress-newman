export function visitSignInPage(): void {
  cy.visit('/');
}

export function clickSignUpLink(): void {
  cy.get('[data-test=signup]').click();
  cy.url().should('contain', '/signup');
  cy.get('[data-test=signup-title]').should('contain', 'Sign Up');
}

export function login(username: string, password: string): void {
  cy.get('#username')
    .clear()
    .type(username)
    .get('#password')
    .clear()
    .type(password)
    .get('[name="remember')
    .check()
    .dataTest('signin-submit')
    .click();
}
