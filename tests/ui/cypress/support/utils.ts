export function loginByApi(user: User): void {
  const url = `${Cypress.env('API_URL')}/login`;
  const body: LoginReqBody = {
    type: 'LOGIN',
    username: user.username,
    password: user.password,
    remember: true
  };

  cy.request('POST', url, body);
  cy.getCookie('connect.sid').should('exist');
}

export function createBankAccountByApi(
  user: User,
  bankAccount: BankAccount
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

export function toMoneyFormat(num: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(num);
}
