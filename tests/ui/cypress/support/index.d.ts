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
  type: 'LOGIN';
  username: string;
  password: string;
  remember: boolean;
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
     * Login through the UI
     */
    login(user: User): Chainable<Response>;

    /**
     * Retrieve users from the db
     */
    dbFindUsers(count: number): Chainable<User[]>;
  }
}
