export const SIGN_IN_PAGE_PATH = '/signin';

export function visitSignInPage(): void {
  cy.url().then((url) => {
    if (!url.includes(SIGN_IN_PAGE_PATH)) {
      cy.visit(SIGN_IN_PAGE_PATH);
    }
  });
}

export function clickSignUpLink(): void {
  cy.get('[data-test=signup]').click();
  cy.url().should('contain', '/signup');
  cy.get('[data-test=signup-title]').should('contain', 'Sign Up');
}
