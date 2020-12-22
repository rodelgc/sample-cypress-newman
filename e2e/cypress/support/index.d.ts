/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="cypress" />
/// <reference path="./global.d.ts" />

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
    signUpByApi(user: IUser, bankAccount: IBankAccount): Chainable<Response>;

    /**
     * Use the API to sign in.
     */
    login(user: IUser): Chainable<Response>;
  }
}
