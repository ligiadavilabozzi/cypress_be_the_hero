const el = require('./elements').ELEMENTS; 

class Register{
    accessRegister(){
        cy.visit('http://localhost:3000/register')
    }

    fillRegister(){
        cy.get(el.name).type('Dogs & Cats Lovers')
        cy.get(el.email).type('dogsandcats@gmail.com')
        cy.get(el.whatsapp).type('11999999999')
        cy.get(el.city).type('São Paulo')
        cy.get(el.uf).type('SP')

        cy.intercept('POST', '**/ongs').as('postOng')

        cy.get(el.submit).click()

        cy.wait('@postOng')
        .its('response.body')
        .should('have.property', 'id')
    }
}

export default new Register()