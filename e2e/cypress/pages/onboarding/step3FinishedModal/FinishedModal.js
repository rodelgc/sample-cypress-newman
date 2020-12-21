export function onboardingFinishedModalTitle() {
  return cy
    .get('[data-test="user-onboarding-dialog-title"]')
    .contains("Finished");
}

export function onboardingFinishedModalContent() {
  return cy
    .get('[data-test="user-onboarding-dialog-content"]')
    .contains(
      /^You're all set!.*We're excited to have you aboard the Real World App!$/
    );
}
