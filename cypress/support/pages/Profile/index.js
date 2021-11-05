const el = require('./elements').ELEMENTS

class Profile {
    logout() {
        cy.get(el.buttonLogout).click()
    }

    deleteRegister(){
        cy.intercept('DELETE', '**/incidents/**').as('deleteIncident')
        cy.get(el.buttonDelete).click()
        cy.wait('@deleteIncident').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(204);
            expect(xhr.response.body).to.be.empty
        })
    }

}

export default new Profile(); 


