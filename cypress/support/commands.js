Cypress.Commands.add('buildOfferUrl', (leadId) => {
    return `https://example.com/offers?lead_id=${leadId}&utm_source=Acionamento&utm_medium=SMS&utm_campaign=EXAMPLE_CAMPAIGN`;
  });
  