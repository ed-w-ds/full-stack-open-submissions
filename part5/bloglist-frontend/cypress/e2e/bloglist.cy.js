/* eslint no-undef: 0 */
// describe('template spec', () => {
//     it('passes', () => {
//         cy.visit('https://example.cypress.io')
//     })
// })

describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

        cy.visit('')
    })

    it('Login form is shown', function() {
        cy.contains('login')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username-input').type('mluukkai')
            cy.get('#password-input').type('salainen')
            cy.get('#login-button').click()

            cy.contains('Matti Luukkainen logged-in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username-input').type('mluukkai')
            cy.get('#password-input').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'Matti Luukkainen logged-in')
        })
    })
})