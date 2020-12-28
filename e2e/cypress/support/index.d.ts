/// <reference types="cypress" />

declare class User {
  balance: number;
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
}

declare class BankAccount {
  bankName: string;
  routingNumber: string;
  accountNumber: string;
}

interface SignUpReqBody {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface CreateBankAccountReqBody {
  userId: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
}

interface LoginReqBody {
  username: string;
  password: string;
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Select DOM element using the data-test attribute.
     */
    dataTest(value: string): Chainable<JQuery<Element>>;

    /**
     * Select DOM element whose data-test attribute starts with the given value
     */
    dataTestStartsWith(value: string): Chainable<JQuery<Element>>;

    /**
     * Use the API to sign up and onboard new user
     */
    setupUser(user: User, bankAccount: BankAccount): Chainable<Response>;

    /**
     * Use the API to sign in.
     */
    login(formData: LoginReqBody): Chainable<Response>;

    /**
     * Search DB for the user specified by the given index
     */
    dbFindUser(idx: number): Chainable<User>;

    /**
     * Search DB for multiple users at the specified indices
     */
    dbFindUsers(count: number): Chainable<User[]>;
  }
}
