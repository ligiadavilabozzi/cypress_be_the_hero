//acoes de interação com a página
//classe de páginas que tem as interações 
//acoes
//acessar o login 
//preencher o login

//como é const a gente não importa e sim requerer o conteúdo da const

const el = require('./elements').ELEMENTS;

class Login {
    accessLogin() {
        cy.visit('http://localhost:3000/');
    }
    
    fillLogin() {
        cy.get(el.id).type(Cypress.env('createdOngId'))
        cy.get(el.buttonLogin).click()
    }
}

export default new Login();
