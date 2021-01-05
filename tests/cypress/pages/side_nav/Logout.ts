export function logout(): void {
  cy.dataTest('sidenav-signout').click();
}
