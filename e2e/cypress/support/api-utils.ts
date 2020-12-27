export function createBankAccountByApi(
  user: IUser,
  bankAccount: IBankAccount
): void {
  const url = `${Cypress.env('API_URL')}/bankAccounts`;
  const body: CreateBankAccountReqBody = {
    userId: user.id,
    bankName: bankAccount.bankName,
    accountNumber: bankAccount.accountNumber,
    routingNumber: bankAccount.routingNumber
  };

  cy.request('POST', url, body);
}

export function loginByApi(user: IUser): void {
  const url = `${Cypress.env('API_URL')}/login`;
  const body: LoginReqBody = {
    username: user.username,
    password: user.password
  };

  cy.request('POST', url, body);
}
