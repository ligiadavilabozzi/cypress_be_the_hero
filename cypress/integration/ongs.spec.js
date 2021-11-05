/// <reference types="cypress" /> 

describe('Ongs',()=>{
    it('The Ongs must be able to register.', ()=>{
    
        cy.visit('http://localhost:3000/register')
        cy.get('[data-cy=name]').type('Dogs & Cats Lovers')
        cy.get('[data-cy=email]').type('dogsandcats@gmail.com')
        cy.get('[data-cy=whatsapp]').type('11999999999')
        cy.get('[data-cy=city]').type('São Paulo')
        cy.get('[data-cy=uf]').type('SP')

        cy.intercept('POST', '**/ongs').as('postOng')

        cy.get('[data-cy=submit]').click()

        cy.wait('@postOng')
        .its('response.body')
        .should('have.property', 'id')

    })

    it('The ong must be able to log into the system',()=>{
  
        cy.visit('http://localhost:3000/');
        cy.get('[data-cy="id"]').type(Cypress.env('createdOngId'))
        cy.get('[data-cy="button-login').click()
    })

    it('The ong must be able to disconnected', () =>{
        
        cy.login()
        cy.get('[data-cy="button-logout"]').click()
    }); 


    it('The ong must be able to register new cases', () =>{
        cy.login() 

        cy.get('[data-cy="register-newIncident"]').click();

        cy.get('[data-cy=title]').type('Preciso de ajuda')
        cy.get('[data-cy="description"]').type('Sou um cachorrinho de 2 anos e preciso de ajuda com meus gastos')
        cy.get('[data-cy="value"]').type(500)
        
        cy.intercept('POST', '**/incidents').as('newIncident')

        cy.get('[data-cy="button-registerIncident"]').click();

        cy.wait('@newIncident').then((xhr)=>{
            expect(xhr.response.statusCode).to.eq(200); 
            expect(xhr.response.body).has.property('id'); 
            expect(xhr.response.body.id).is.not.null;
        })     
    }); 

    it('The ong must be able to delete a case', () =>{

        cy.createNewIncident()
        cy.login(); 
        
        cy.intercept('DELETE', '**/incidents/**').as('deleteIncident')
        
        cy.get('[data-cy="button-delete"]').click()

        cy.wait('@deleteIncident').then((xhr)=>{
            expect(xhr.response.statusCode).to.eq(204); 
            expect(xhr.response.body).to.be.empty
        })
        
    }); 

})