/// <reference types="cypress" /> 

import Login from '../support/pages/Login'
import Register from '../support/pages/Register'
import Profile from '../support/pages/Profile'
import NewIncident from '../support/pages/NewIncident'

describe('Ongs', () => {
    it.only('The Ongs must be able to register.', () => {
        Register.accessRegister();
        Register.fillRegister();
    })

    it.only('The ong must be able to login into the system', () => {
        Login.accessLogin()
        Login.fillLogin()
    })

    it.only('The ong must be able to disconnected', () => {
        cy.login()
        Profile.logout();
    });

    it.only('The ong must be able to register new cases', () => {
        cy.login()
        NewIncident.registerNewIncident(); 
        NewIncident.fillNewIncident();
    });

    it.only('The ong must be able to delete a case', () => {
        cy.createNewIncident()
        cy.login();
        Profile.deleteRegister();
    });

})