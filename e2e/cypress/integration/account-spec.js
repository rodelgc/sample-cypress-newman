import BankAccount from "../models/BankAccount";
import User from "../models/User";
import {
  createBankAccountForm,
  fillCreateBankAccountFormAndSubmit
} from "../pages/onboarding/step2CreateBankAccountModal/CreateBankAccountForm";
import { createBankAccountModalTitle } from "../pages/onboarding/step2CreateBankAccountModal/CreateBankAccountModal";
import { clickDone } from "../pages/onboarding/step3FinishedModal/DoneButton";
import {
  onboardingFinishedModalContent,
  onboardingFinishedModalTitle
} from "../pages/onboarding/step3FinishedModal/FinishedModal";
import {
  getStartedModalContent,
  getStartedModalTitle
} from "../pages/onboarding/step1GetStartedModal/GetStartedModal";
import { clickNext } from "../pages/onboarding/step1GetStartedModal/NextButton";
import {
  assertThatUserIsAtSignInPage,
  clickSignUpLink,
  login,
  visitSignInPage
} from "../pages/signIn/SignInPage";
import { fillSignUpFormAndSubmit } from "../pages/signUp/SignUpPage";
import { bankAccountsListItem } from "../pages/bankAccounts/BankAccountsList";
import {
  navigateToBankAccounts,
  navigateToMyAccount
} from "../pages/sideNav/SideNav";
import {
  fillUserSettingsFormAndSave,
  userSettingsPageEmailInput,
  userSettingsPageFirstNameInput,
  userSettingsPageLastNameInput,
  userSettingsPagePhoneNumberInput
} from "../pages/userSettings/UserSettingsForm";
import { sideNavFullName } from "../pages/sideNav/FullName";
import { sideNavUsername } from "../pages/sideNav/UserName";

describe("User Account", () => {
  it("sign up, sign in, onboarding, and complete user settings", () => {
    const user = new User();
    const bankAccount = new BankAccount();

    // sign up
    visitSignInPage();
    clickSignUpLink();
    fillSignUpFormAndSubmit(user);
    assertThatUserIsAtSignInPage();

    // sign in
    login(user);

    // assert side nav full name and username
    sideNavFullName().should(
      "have.text",
      `${user.firstName} ${user.lastName.charAt(0)}`
    );
    sideNavUsername().should("have.text", `@${user.username}`);

    // onboarding
    // "Get Started" step
    getStartedModalTitle().should("be.visible");
    getStartedModalContent().should("be.visible");
    clickNext();
    // "Create Bank Account" step
    createBankAccountModalTitle().should("be.visible");
    createBankAccountForm().should("be.visible");
    fillCreateBankAccountFormAndSubmit(bankAccount);
    // "Finished" step
    onboardingFinishedModalTitle().should("be.visible");
    onboardingFinishedModalContent().should("be.visible");
    clickDone();
    onboardingFinishedModalTitle().should("not.exist");
    onboardingFinishedModalContent().should("not.exist");

    // assert that bank name was saved in Bank Accounts page
    navigateToBankAccounts();
    bankAccountsListItem(bankAccount.bankName).should("be.visible");

    // complete User Settings
    navigateToMyAccount();
    userSettingsPageFirstNameInput().should("have.value", user.firstName);
    userSettingsPageLastNameInput().should("have.value", user.lastName);
    fillUserSettingsFormAndSave(user);
    cy.reload();
    userSettingsPageFirstNameInput().should("have.value", user.firstName);
    userSettingsPageLastNameInput().should("have.value", user.lastName);
    userSettingsPageEmailInput().should("have.value", user.email);
    userSettingsPagePhoneNumberInput().should("have.value", user.phoneNumber);
  });
});
