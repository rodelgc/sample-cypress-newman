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

  cy.request('POST', url, body).then((res) => {
    const status = res.status;
    const actualAccount = res.body.account;
    const actualUserId = actualAccount.userId;
    const actualAccountNumber = actualAccount.accountNumber;
    const actualBankName = actualAccount.bankName;
    const actualRoutingNumber = actualAccount.routingNumber;

    expect(status).to.eq(200);
    expect(actualUserId).to.eq(user.id);
    expect(actualAccountNumber).to.eq(bankAccount.accountNumber);
    expect(actualBankName).to.eq(bankAccount.bankName);
    expect(actualRoutingNumber).to.eq(bankAccount.routingNumber);
  });
}

export function loginByApi(user: IUser): void {
  const url = `${Cypress.env('API_URL')}/login`;
  const body: LoginReqBody = {
    username: user.username,
    password: user.password
  };

  cy.request('POST', url, body);
  cy.getCookie('connect.sid').should('exist');
}
