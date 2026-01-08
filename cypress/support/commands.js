// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import inicioPage from "./pageObjects/inicioPage";
import loginPage from "./pageObjects/loginPage";
require('@reportportal/agent-js-cypress/lib/commands/reportPortalCommands');

Cypress.Commands.add('fazerLogin', (email, senha) => { 
    cy.setCookie('ebacStoreVersion', 'v2', { domain: 'lojaebac.ebaconline.art.br' })
    cy.visit('/')
    inicioPage.selecionarAba('Account')
    loginPage.realizarLogin(email, senha)

});

Cypress.Commands.add('AdicionarCarrinho', (item) => {
    inicioPage.realizarBusca(item)
    inicioPage.selecionarItem()
})

