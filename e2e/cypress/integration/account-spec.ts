import BankAccount from '../models/BankAccount';
import User from '../models/User';
import {
  createBankAccountForm,
  fillCreateBankAccountFormAndSubmit
} from '../pages/onboarding/step2CreateBankAccountModal/CreateBankAccountForm';
import { createBankAccountModalTitle } from '../pages/onboarding/step2CreateBankAccountModal/CreateBankAccountModal';
import { clickDone } from '../pages/onboarding/step3FinishedModal/DoneButton';
import {
  onboardingFinishedModalContent,
  onboardingFinishedModalTitle
} from '../pages/onboarding/step3FinishedModal/FinishedModal';
import {
  getStartedModalContent,
  getStartedModalTitle
} from '../pages/onboarding/step1GetStartedModal/GetStartedModal';
import { clickNext } from '../pages/onboarding/step1GetStartedModal/NextButton';
import {
  clickSignUpLink,
  login,
  visitSignInPage
} from '../pages/signIn/SignInPage';
import { fillSignUpFormAndSubmit } from '../pages/signUp/SignUpPage';
import { bankAccountsListItem } from '../pages/bankAccounts/BankAccountsList';
import {
  navigateToBankAccounts,
  navigateToMyAccount
} from '../pages/sideNav/SideNav';
import {
  fillUserSettingsFormAndSave,
  userSettingsPageFirstNameInput,
  userSettingsPageLastNameInput,
  visitMyAccountPage
} from '../pages/userSettings/UserSettingsForm';
import { sideNavFullName } from '../pages/sideNav/FullName';
import { sideNavUsername } from '../pages/sideNav/UserName';
import { sideNavAccountBalance } from '../pages/sideNav/AccountBalance';
import { logout } from '../pages/sideNav/Logout';
import { usernamePasswordInvalidErrMessage } from '../pages/signIn/UsernamePasswordInvalidErrMsg';

let user: User;

beforeEach(() => {
  user = new User();
});

describe('User Account', () => {
  it('sign up, sign in, complete onboarding, complete user settings, and logout', () => {
    const bankAccount = new BankAccount();

    // sign up
    visitSignInPage();
    clickSignUpLink();
    fillSignUpFormAndSubmit(user);
    assertThatUserIsAtSignInPage();

    // sign in
    login(user.username, user.password);
    sideNavFullName().should(
      'have.text',
      `${user.firstName} ${user.lastName.charAt(0)}`
    );
    sideNavUsername().should('have.text', `@${user.username}`);
    sideNavAccountBalance().should('have.text', '$0.00');

    // onboarding
    // "Get Started" step
    getStartedModalTitle().should('be.visible');
    getStartedModalContent().should('be.visible');
    clickNext();
    // "Create Bank Account" step
    createBankAccountModalTitle().should('be.visible');
    createBankAccountForm().should('be.visible');
    fillCreateBankAccountFormAndSubmit(bankAccount);
    // "Finished" step
    onboardingFinishedModalTitle().should('be.visible');
    onboardingFinishedModalContent().should('be.visible');
    clickDone();
    onboardingFinishedModalTitle().should('not.exist');
    onboardingFinishedModalContent().should('not.exist');

    // assert that bank name was saved in Bank Accounts page
    navigateToBankAccounts();
    bankAccountsListItem(bankAccount.bankName).should('be.visible');

    // complete User Settings
    navigateToMyAccount();
    userSettingsPageFirstNameInput().should('have.value', user.firstName);
    userSettingsPageLastNameInput().should('have.value', user.lastName);
    fillUserSettingsFormAndSave(user);
    assertThatUserSettingsWereSaved(user);

    // logout
    logout();
    assertThatUserIsAtSignInPage();
  });

  it('login with wrong password', () => {
    const wrongPassword = 'wr0ngP4s$';

    visitSignInPage();
    login(user.username, wrongPassword);
    usernamePasswordInvalidErrMessage().should('be.visible');
  });

  it('change user settings', () => {
    const changedUser = new User();

    cy.signUpByApi(user);
    cy.loginByApi(user);

    visitMyAccountPage();
    fillUserSettingsFormAndSave(changedUser);
    assertThatUserSettingsWereSaved(changedUser);
  });
});

function assertThatUserIsAtSignInPage() {
  cy.url().should('contain', '/signin');
  cy.get('h1').should('have.text', 'Sign in');
}

function assertThatUserSettingsWereSaved(user: User) {
  cy.intercept('/checkAuth', (req) => {
    req.reply((res) => {
      const actualFirstName = res.body.user.firstName;
      const actualLastName = res.body.user.lastName;
      const actualEmail = res.body.user.email;
      const actualPhoneNumber = res.body.user.phoneNumber;

      expect(actualFirstName).to.eq(user.firstName);
      expect(actualLastName).to.eq(user.lastName);
      expect(actualEmail).to.eq(user.email);
      expect(actualPhoneNumber).to.eq(user.phoneNumber);
    });
  });
}
