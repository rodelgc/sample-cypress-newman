import BankAccount from '../models/BankAccount';
import User from '../models/User';
import {
  createBankAccountForm,
  fillCreateBankAccountFormAndSubmit
} from '../pages/onboarding/step2_create_bank_account/CreateBankAccountForm';
import { createBankAccountModalTitle } from '../pages/onboarding/step2_create_bank_account/CreateBankAccountModal';
import { clickDone } from '../pages/onboarding/step3_finished/DoneButton';
import {
  onboardingFinishedModalContent,
  onboardingFinishedModalTitle
} from '../pages/onboarding/step3_finished/FinishedModal';
import {
  getStartedModalContent,
  getStartedModalTitle
} from '../pages/onboarding/step1_get_started/GetStartedModal';
import { clickNext } from '../pages/onboarding/step1_get_started/NextButton';
import {
  clickSignUpLink,
  SIGN_IN_PAGE_PATH,
  visitSignInPage
} from '../pages/sign_in/SignInPage';
import { fillSignUpFormAndSubmit } from '../pages/sign_up/SignUpPage';
import { bankAccountsListItem } from '../pages/bank_accounts/BankAccountsList';
import {
  navigateToBankAccounts,
  navigateToMyAccount
} from '../pages/side_nav/SideNav';
import {
  fillUserSettingsFormAndSave,
  userSettingsPageFirstNameInput,
  userSettingsPageLastNameInput
} from '../pages/user_settings/UserSettingsForm';
import { sideNavFullName } from '../pages/side_nav/FullName';
import { sideNavUsername } from '../pages/side_nav/UserName';
import { sideNavAccountBalance } from '../pages/side_nav/AccountBalance';
import { logout } from '../pages/side_nav/Logout';
import { usernamePasswordInvalidErrMessage } from '../pages/sign_in/UsernamePasswordInvalidErrMsg';

describe('User Account', () => {
  it('sign up, sign in, complete onboarding, complete user settings, and logout', () => {
    const user = new User();
    const bankAccount = new BankAccount();

    // sign up
    visitSignInPage();
    clickSignUpLink();
    fillSignUpFormAndSubmit(user);
    assertThatUserIsAtSignInPage();

    // sign in
    cy.login(user);
    assertThatSideNavFullNameIsCorrect(user);
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
    visitSignInPage();

    cy.dbFindUser().then((user: IUser) => {
      user.password = 'wrongPass';

      cy.login(user);
    });

    usernamePasswordInvalidErrMessage().should('be.visible');
  });

  it('change user settings', () => {
    const user = new User();
    const bankAccount = new BankAccount();
    const newDetails = new User();

    cy.setupUser(user, bankAccount);
    cy.login(user);

    navigateToMyAccount();
    fillUserSettingsFormAndSave(newDetails);
    assertThatUserSettingsWereSaved(newDetails);
    assertThatSideNavFullNameIsCorrect(newDetails);
  });
});

function assertThatSideNavFullNameIsCorrect(user: IUser) {
  sideNavFullName().should(
    'have.text',
    `${user.firstName} ${user.lastName.charAt(0)}`
  );
}

function assertThatUserIsAtSignInPage() {
  cy.url().should('contain', SIGN_IN_PAGE_PATH);
  cy.get('h1').should('have.text', 'Sign in');
}

function assertThatUserSettingsWereSaved(expectedUser: IUser) {
  cy.wait('@checkAuth')
    .its('response.body.user')
    .then((actual) => {
      const actualFirstname = actual.firstName;
      const actualLastName = actual.lastName;
      const actualEmail = actual.email;
      const actualPhoneNumber = actual.phoneNumber;

      expect(actualFirstname).to.eq(expectedUser.firstName);
      expect(actualLastName).to.eq(expectedUser.lastName);
      expect(actualEmail).to.eq(expectedUser.email);
      expect(actualPhoneNumber).to.eq(expectedUser.phoneNumber);
    });
}
