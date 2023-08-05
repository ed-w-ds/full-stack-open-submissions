/* eslint no-undef: 0 */
// describe('template spec', () => {
//     it('passes', () => {
//         cy.visit('https://example.cypress.io')
//     })
// })

describe('Blog app', function() {

    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('login')
    })
})