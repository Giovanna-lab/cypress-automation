/// <reference types="cypress" />

describe('Complete Flow', () => {
  // Load client data from the "leads.json" file
  before(() => {
    cy.fixture('leads.json').then((leads) => {
      cy.wrap(leads).as('clients');
    });
  });

  it('Should click the "Sign Up Now" button, fill in the CPF field, click the checkbox, and place the order for each lead', function () {
    // Iterate over each lead in the JSON file
    cy.get('@clients').each((client) => {
      // Build the URL using the custom command
      cy.buildOfferUrl(client.leadId).then((url) => {
        // Visit the page with the constructed URL
        cy.visit(url);

        // Check if the "button[un='Sign Up Now 1']" element is present on the page
        cy.get('body').then(($body) => {
          if ($body.find('button[un="Sign Up Now 1"]').length === 0) {
            // Discard this client and move to the next one
            cy.log('Lead discarded: "Sign Up Now 1" button not found');
            return;
          }

          // Flow to complete the customer acceptance journey
          cy.get('button[un="Sign Up Now 1"]').should('be.visible').click();

          cy.get('input[name="cpf"]')
            .should('be.visible')
            .type(client.digits);

          cy.get('input[name="cpf"]').should('have.value', client.digits);

          cy.get('input[id="input_2"]').should('be.visible').click();

          cy.get('input[id="input_2"]').should('be.checked');

          cy.get('button[un="Place Order"]')
            .should('be.visible')
            .click();

          // Conclusion of the final page after acceptance
          cy.get('b')
            .should('be.visible')
            .then(($element) => {
              if ($element.text().includes('Order received')) {
                // Order received
                cy.log('Order received');
              } else if (
                $element.text().includes(
                  'The activation of your new plan is already in progress'
                )
              ) {
                // Alternative text
                cy.log('New plan activation in progress');
              }
            });
        });
      });
    });
  });
});
