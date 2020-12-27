import { Chance } from 'chance';
import { visitSignInPage } from '../pages/sign_in/SignInPage';
import { createBankAccountByApi, loginByApi } from './utils';

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

Cypress.Commands.add('dbFindUser', () => {
  const dbPath = '../cypress-realworld-app/data/database.json';
  const chance = new Chance();

  cy.readFile(dbPath)
    .its('users')
    .then((users: IUser[]) => {
      const idx = chance.integer({ min: 0, max: users.length });

      return users[idx];
    });
});
