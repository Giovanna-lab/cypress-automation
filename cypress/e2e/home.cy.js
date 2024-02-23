/// <reference types="cypress" />

describe('Fluxo Completo Tim Retencao', () => {
  // Carregar os dados dos clientes a partir do arquivo "leads.json"
  before(() => {
    cy.fixture('leads.json').then((leads) => {
      cy.wrap(leads).as('clientes');
    });
  });

  it('Deve clicar no botão "Contratar Agora", preencher o campo CPF, clicar no checkbox e realizar o pedido para cada lead', function () {
    // Iterar por cada lead no arquivo JSON
    cy.get('@clientes').each((cliente) => {
      const url = `https://dev.tim-retencao-ecommerce.zoly.me/ofertas?lead_id=${cliente.leadId}&utm_source=Acionamento&utm_medium=SMS&utm_campaign=TESTE_03-10-23`;

      // Visitar a página com a URL construída
      cy.visit(url);

      // Verificar se o elemento "button[un='Contratar Agora 1']" está presente na página
      cy.get('body').then(($body) => {
        if ($body.find('button[un="Contratar Agora 1"]').length === 0) {
          // Descartar este cliente e seguir para o próximo
          cy.log('Lead descartado: Botão "Contratar Agora 1" não encontrado');
          return;
        }

        // Fluxo para completar a jornada de aceite do cliente
        cy.get('button[un="Contratar Agora 1"]').should('be.visible').click();

        cy.get('input[name="cpf"]')
          .should('be.visible')
          .type(cliente.digitos);

        cy.get('input[name="cpf"]').should('have.value', cliente.digitos);

        cy.get('input[id="input_2"]').should('be.visible').click();

        cy.get('input[id="input_2"]').should('be.checked');

        cy.get('button[un="Realizar Pedido"]')
          .should('be.visible')
          .click();

        // Conclusão da página final após aceite
        cy.get('b')
          .should('be.visible')
          .then(($element) => {
            if ($element.text().includes('Pedido recebido')) {
              // Pedido recebido
              cy.log('Pedido recebido');
            } else if (
              $element.text().includes(
                'A ativação do seu novo plano já está em andamento'
              )
            ) {
              // Texto alternativo
              cy.log('Ativação do novo plano em andamento');
            }
          });
      });
    });
  });
});
