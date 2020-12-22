export function usernamePasswordInvalidErrMessage(): Cypress.Chainable<
  JQuery<Element>
> {
  return cy
    .dataTest('signin-error')
    .contains('Username or password is invalid');
}
