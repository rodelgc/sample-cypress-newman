import User from '../models/User';
import { visitSignInPage } from '../pages/sign_in/SignInPage';
import { createBankAccountByApi, loginByApi } from './utils';

const DB_PATH = '../../cypress-realworld-app/data/database.json';

Cypress.Commands.add('dataTest', (value) => {
  cy.get(`[data-test=${value}]`);
});

Cypress.Commands.add('dataTestStartsWith', (value) => {
  cy.get(`[data-test^=${value}]`);
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

Cypress.Commands.add('login', (formdata) => {
  visitSignInPage();
  cy.get('#username')
    .clear()
    .type(formdata.username)
    .get('#password')
    .clear()
    .type(formdata.password)
    .get('[name="remember')
    .check()
    .dataTest('signin-submit')
    .click();
});

Cypress.Commands.add('dbFindUser', (idx) => {
  cy.readFile(DB_PATH).its('users').its(idx);
});

Cypress.Commands.add('dbFindUsers', (count) => {
  cy.readFile(DB_PATH)
    .its('users')
    .then((users) => {
      const foundUsers: User[] = [];

      for (let i = 0; i < count; i++) {
        foundUsers.push(users[i]);
      }

      return foundUsers;
    });
});
