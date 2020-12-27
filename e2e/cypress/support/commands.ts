import { visitSignInPage } from '../pages/signIn/SignInPage';
import { createBankAccountByApi, loginByApi } from './api-utils';

Cypress.Commands.add('dataTest', (value) => {
  cy.get(`[data-test=${value}]`);
});

Cypress.Commands.add('setupUser', (user, bankAccount) => {
  const url = `${Cypress.env('API_URL')}/users`;
  const body: SignUpReqBody = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    password: user.password,
    confirmPassword: user.password
  };

  cy.request('POST', url, body)
    .its('body.user.id')
    .then((id) => (user.id = id));

  loginByApi(user);

  createBankAccountByApi(user, bankAccount);
});

Cypress.Commands.add('login', (user) => {
  visitSignInPage();
  cy.get('#username')
    .clear()
    .type(user.username)
    .get('#password')
    .clear()
    .type(user.password)
    .get('[name="remember')
    .check()
    .dataTest('signin-submit')
    .click();
});
