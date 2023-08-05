/* eslint no-undef: 0 */
// describe('template spec', () => {
//     it('passes', () => {
//         cy.visit('https://example.cypress.io')
//     })
// })

describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        cy.visit('')
    })

    it('Login form is shown', function() {
        cy.contains('login')
    })
})