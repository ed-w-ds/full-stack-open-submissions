/* eslint-disable */
const testingRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
console.log('testing.js: testingRouter: ', testingRouter)

testingRouter.post('/reset', async (request, response) => {
    await Note.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})
