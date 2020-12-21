export function logout() {
  cy.get('[data-test="sidenav-signout"]').click();
}
