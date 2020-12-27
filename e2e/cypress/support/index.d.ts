/// <reference types="cypress" />

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface IBankAccount {
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
     *
     * @param value value of the data-test attribute
     */
    dataTest(value: string): Chainable<JQuery<Element>>;

    /**
     * Use the API to sign up.
     */
    setupUser(user: IUser, bankAccount: IBankAccount): Chainable<Response>;

    /**
     * Use the API to sign in.
     */
    login(user: IUser): Chainable<Response>;

    /**
     * Type a new value into the DOM element.
     * If the DOM element already has this value, then do nothing.
     */
    typeNewVal(newText: string): Chainable<JQuery<Element>>;
  }
}
