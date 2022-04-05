//ESTOU DIZENDO QUE UTILIZAREI COMANDOS CYPRESS
/// <reference types="Cypress" />

const { select } = require("async")

//DESCRIBE = SUÍTE DE TESTE
describe('Central de Atendimento ao Cliente TAT', function() {
    
//BEFOREEACH = ANTES DE CADA TESTCASE, REALIZAR FUNÇÃO INSTANCIADA NO BEFOREEACH
    beforeEach(function(){

//VISIT = ACESSAR ENDEREÇO/URL
        cy.visit('./src/index.html')

    })

//IT = TESTCASE
    it('verifica o título da aplicação', function() {        

//CY.TITLE = VERIFICA TÍTULO DA PÁGINA
//SHOULD = REALIZA A VALIDAÇÃO DO TESTE
//BE.EQUAL = ELEMENTO DEVE SER IGUAL    
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preencha os campos obrigatórios e envie o formulário', function(){

//CY.GET = BUSCA ELEMENTO PRESENTE NA PÁGINA
//.TYPE = DIGITA ALGO NO ELEMENTO ENCONTRADO
        cy.get('#firstName').type('Usuário')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type('Mensagem teste, tksssssssssssss!',{delay: 0})

//CY.CONTAINS = BUSCA UM ELEMENTO NA PÁGINA QUE CONTÉM O PARÂMETRO FORNECIDO
//.CLICK = CLICA NO ELEMENTO ENCONTRADO
        cy.contains('button','Enviar').click()

//BE.VISIBLE = ELEMENTO DEVE SER VISÍVEL
        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao enviar formulário com e-mail inválido', function(){

        cy.get('#firstName').type('Usuário')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('teste!teste.com')
//DELAY = INSERE UMA DEMORA AO EXECUTAR TAL AÇÃO
        cy.get('#open-text-area').type('Mensagem teste, tksssssssssssss!',{delay: 0})

        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('validação do campo telefone', function(){

//HAVE.VALUE = POSSUI O VALOR DE 'valor'
        cy.get('#phone')
        .type('teste')
        .should('have.value', '')
    })

    it('verificar impedimento quando o campo telefone se torna obrigatório', function(){

        cy.get('#firstName').type('Usuário')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type('Mensagem teste, tksssssssssssss!',{delay: 0})
        cy.get('#phone-checkbox').check()

        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('verificar impedimento ao tentar enviar o formulário sem preencher os campos obrigatórios', function(){

        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('verificar se é possível preencher e limpar nome nos campos', function(){

        cy.get('#firstName')
        .type('Usuário', {delay : 100})
        .should('have.value', 'Usuário') 
//.CLEAR = LIMPA UM CAMPO DO ELEMENTO ENCONTRADO
        .clear()
        .should('have.value', '')

    })

    it('Verificar se é possível utilizar um comando customizado', function(){

//TESTE UTILIZANDO O COMANDO CUSTOMIZADO
        cy.PreencherCamposObrigatoriosEEnviar()

        cy.get('.success')
        .should('be.visible')

    })

    it('Verificar se é possível selecionar elemento num dropdown pelo texto', function(){

//SELECT = SELECIONA ELEMENTO DENTRO DE UMA LISTA
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('Verificar se é possível selecionar elemento num dropdown pelo value', function(){

        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('Verificar se é possível selecionar elemento num dropdown pelo index', function(){

        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })
        
    it('Verificar se é possível selecionar um campo do tipo radio box', function(){
//CHECK = SELECIONA UM CAMPO DO TIPO RADIO (APENAS UM SELECIONADO)
        cy.get('input[type="radio"][value=feedback]').check().should('have.value','feedback')

    })

    it('Verificar se é possível selecionar um campo do tipo radio box', function(){
        cy.get('input[type="radio"]')

//HAVE.LENGTH = VERIFICAÇÃO DO 'COMPRIMENTO' DO ELEMENTO
          .should('have.length', 3)

//EACH = SELECIONA CADA ELEMENTO DA 'LISTA'
//$ = VARIÁVEIS JQUERY
          .each(function($radio){
//CY.WRAP = 'EMBRULHA' OS ELEMENTOS DENTRO DA FUNÇÃO E REALIZA AÇÃO 
              cy.wrap($radio).check()
              cy.wrap($radio).should('be.checked')
          })
        
    })

    it('Verificar se é possível marcar e desmarcar uma checkbox', function(){

        cy.get('input[type="checkbox"]')
//CHECK = MARCA UMA CHECKBOX
        .check()
//LAST = SELECIONA A ULTIMA OPÇÃO
        .last()
//UNCHECK = DESMARCA UMA CHECKBOX
        .uncheck()
//NOT.BE.CHECKED = NÃO DEVE SER CHECKADO
        .should('not.be.checked')
    })

    it('Verificar se é possível selecionar um arquivo do tipo file', function (){

        cy.get('input[type="file"]')
        .should('have.not.value')
//SELECTFILE = SELECIONA UM ARQUIVO E FAZ O UPLOAD
        .selectFile('./cypress/fixtures/example.json')
//SHOULD PODE SER UMA FUNÇÃO
        .should(function($input){
//EXPECT = RESULTADO ESPERADO
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Verificar se é possível selecionar um arquivo do tipo file utilizando ação de DRAG AND DROP', function (){

        cy.get('input[type="file"]')
        .should('have.not.value')
//ACTION: DRAG-DROP = SIMULA AÇÃO DE ARRASTAR ARQUIVO PARA APLICAÇÃO
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    
    it('Verificar se é possível selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', function (){
        
//AS = UTILIZANDO "APELIDO" 
        cy.fixture('example.json').as('sampleFile')

        cy.get('input[type="file"]').selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Verificar se link abre em outra aba sem a necessidade de um clique', function(){
//OS LINKS QUE ABREM EM OUTRA ABA, INDEPENDENTE DO NAVEGADOR, POSSUEM O ATRIBUTO 'TARGET' COM O VALOR '_BLANK'.
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Verificar se link abre em outra aba utilizando o método "invoke"', function(){

        cy.get('#privacy a')
//INVOKE = PERMITE "INVOCAR" UMA FUNÇÃO ESCONDIDA
//REMOVEATTR = REMOVE UM ATRIBUTO DO ELEMENTO ENCONTRADO
        .invoke('removeAttr', 'target')
        .click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('testa a página da política de privavidade de forma independente', function(){
        cy.AbrirPaginaDePrivacidade() //comando customizado

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.get('#title').should('be.visible', 'CAC TAT - Política de privacidade')
        cy.get('#white-background').should('be.visible',)      
    })

//COMO ABRIR APLICAÇÃO NA RESOLUÇÃO MOBILE: CRIAR SCRIPT NO ARQUIVO PACKAGE.JSON > "cy:open:mobile": "cypress open --config viewportWidth=375 viewportHeight=660" > RODAR COMANDO "CY:OPEN:MOBILE"
//COMO RODAR APLICAÇÃO EM MODO HEADLESS: CRIAR SCRIPT NO ARQUIVO PACKAGE.JSON > "test:mobile": "cypress run --config viewportWidth=375 viewportHeight=660" > RODAR COMANDO "TEST:MOBILE"
  })
  