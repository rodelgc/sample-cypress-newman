import { Chance } from "chance";

const chance = new Chance();

describe("Sign up", () => {
  it("should allow user to sign up", () => {
    const firstName = chance.first();
    const lastName = chance.last();
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    const password = "T3st!";

    cy.visit("/");
    cy.get("[data-test=signup]").click();
    cy.url().should("contain", "/signup");

    cy.get("[data-test=signup-title]").should("contain", "Sign Up");
    cy.get("#firstName")
      .should("have.focus")
      .clear()
      .type(firstName)
      .should("have.value", firstName);
    cy.get("#lastName").clear().type(lastName).should("have.value", lastName);
    cy.get("#username").clear().type(username).should("have.value", username);
    cy.get("#password").clear().type(password).should("have.value", password);
    cy.get("#confirmPassword")
      .clear()
      .type(password)
      .should("have.value", password);
    cy.intercept("POST", "/users").as("POST_users");
    cy.get('[data-test="signup-submit"]').should("be.enabled").click();
    cy.wait("@POST_users").its("response.statusCode").should("eq", 201);
    cy.url().should("contain", "/signin");
  });
});
