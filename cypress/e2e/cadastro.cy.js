/// <reference types = 'cypress'/>

import inicioPage from "../support/pageObjects/inicioPage";
import loginPage from "../support/pageObjects/loginPage";
import cadastroPage from "../support/pageObjects/cadastroPage";
import { faker } from '@faker-js/faker';

describe('Tela de cadastro', () => {
    
    beforeEach(() => {
        cy.setCookie('ebacStoreVersion', 'v2', { domain: 'lojaebac.ebaconline.art.br' })
        cy.visit('http://lojaebac.ebaconline.art.br')
        inicioPage.selecionarAba('Account')
        loginPage.acessarCriarConta()
    });

    it('Deve realizar cadastro com sucesso', () => {
        let nome = `usuario${faker.person.firstName()}`
        let senha = `${faker.internet.password()}`
        cadastroPage.realizarCadastro(nome, faker.person.lastName(), faker.phone.number(), faker.internet.email(nome), senha, senha)
        inicioPage.selecionarAba('Account')
        cy.get('.r-14lw9ot > :nth-child(5) > .css-146c3p1').should('have.text', 'Logout')
        cy.get('[data-testid="CustomerName"]').should('contain', nome)
    });

    it('Deve dar erro ao tentar cadastrar sem nome', () => {
        let nome = `usuario${faker.person.firstName()}`
        let senha = `${faker.internet.password()}`
        cadastroPage.realizarCadastro(' ', faker.person.lastName(), faker.phone.number(), faker.internet.email(nome), senha, senha)
        cy.get('[data-testid="warning"] > .r-jwli3a').should('contain', 'Please enter firstName')
    });

    it('Deve dar erro ao tentar cadastrar sem sobrenome', () => {
        let nome = `usuario${faker.person.firstName()}`
        let senha = `${faker.internet.password()}`
        cadastroPage.realizarCadastro(nome, ' ', faker.phone.number(), faker.internet.email(nome), senha, senha)
        cy.get('[data-testid="warning"] > .r-jwli3a').should('contain', 'Please enter lastName')
    });

    it('Deve dar erro ao tentar cadastrar sem email', () => {
        let nome = `usuario${faker.person.firstName()}`
        let senha = `${faker.internet.password()}`
        cadastroPage.realizarCadastro(nome, faker.person.lastName(), faker.phone.number(), ' ', senha, senha)
        cy.get('[data-testid="warning"] > .r-jwli3a').should('contain', 'Please enter an email')
        });

    it('Deve dar erro ao tentar cadastrar sem senha', () => {
        let nome = `usuario${faker.person.firstName()}`
        let senha = `${faker.internet.password()}`
        cadastroPage.realizarCadastro(nome, faker.person.lastName(), faker.phone.number(), faker.internet.email(nome), ' ', senha)
        cy.get('[data-testid="warning"] > .r-jwli3a').should('contain', 'Please enter password')
    });
    
    it('Deve dar erro ao tentar cadastrar senha e confirmação de senha diferentes', () => {
        let nome = `usuario${faker.person.firstName()}`
        let senha = `${faker.internet.password()}`
        cadastroPage.realizarCadastro(nome, faker.person.lastName(), faker.phone.number(), faker.internet.email(nome), senha, 'senhaErrada')
        cy.get('[data-testid="warning"] > .r-jwli3a').should('contain', 'Password and confirm password do not match')
    });

});

