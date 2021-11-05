/// <reference types="cypress" /> 

describe('Ongs',()=>{
    it('The Ongs must be able to register.', ()=>{
    
        cy.visit('http://localhost:3000/register')
        cy.get('[data-cy=email]').type('dogsandcats@gmail.com')
        cy.get('[data-cy=whatsapp]').type('1199999999')
        cy.get('[data-cy=cidade]').type('São Paulo')
        cy.get('[data-cy=uf]').type('SP')

        cy.get('[data-cy=submit]').click()

        cy.intercept('POST', '**/ongs').as('postOng')

        cy.wait('@postOng').then(({xhr}) =>{
            expect(xhr.statusCode).be.equal(200)
        })

    }); 

        

        

    it('The ong must be able to log into the system',()=>{

    })
})