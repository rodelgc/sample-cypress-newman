import { visitSignInPage } from '../pages/signIn/SignInPage';

Cypress.Commands.add('dataTest', (value) => {
  cy.get(`[data-test=${value}]`);
});

Cypress.Commands.add('signUpByApi', (user, bankAccount) => {
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

function createBankAccountByApi(user: IUser, bankAccount: IBankAccount) {
  const url = `${Cypress.env('API_URL')}/bankAccounts`;
  const body: CreateBankAccountReqBody = {
    userId: user.id,
    bankName: bankAccount.bankName,
    accountNumber: bankAccount.accountNumber,
    routingNumber: bankAccount.routingNumber
  };

  cy.request('POST', url, body);
}

function loginByApi(user: IUser) {
  const url = `${Cypress.env('API_URL')}/login`;
  const body: LoginReqBody = {
    username: user.username,
    password: user.password
  };

  cy.request('POST', url, body);
}
