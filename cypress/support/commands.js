// CRIANDO UM COMANDO CUSTOMIZADO
Cypress.Commands.add('PreencherCamposObrigatoriosEEnviar', function(){

    cy.get('#firstName').type('Usuário')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('Mensagem teste, tksssssssssssss!')

    cy.contains('button','Enviar').click()
})

Cypress.Commands.add('AbrirPaginaDePrivacidade', function(){

    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()
})