Cypress.Commands.add('dataTest', (value) => {
  cy.get(`[data-test=${value}]`);
});

Cypress.Commands.add('signUpByApi', (user) => {
  const url = `${Cypress.env('API_URL')}/users`;
  const body = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    password: user.password,
    confirmPassword: user.password
  };

  cy.request('POST', url, body);
});

Cypress.Commands.add('signUpByApi', (user) => {
  const url = `${Cypress.env('API_URL')}/users`;
  const body: SignUpReqBody = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    password: user.password,
    confirmPassword: user.password
  };

  cy.request('POST', url, body);
});

Cypress.Commands.add('loginByApi', (user) => {
  const url = `${Cypress.env('API_URL')}/login`;
  const body: LoginReqBody = {
    type: 'LOGIN',
    username: user.username,
    password: user.password,
    remember: true
  };

  cy.request('POST', url, body);

  cy.getCookie('connect.sid').should('exist');
});
