export function navigateToMineTab(): void {
  const $mineTab = 'nav-personal-tab';

  cy.dataTest($mineTab).click();
}
