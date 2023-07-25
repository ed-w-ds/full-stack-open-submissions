/* eslint-disable */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    // salt rounds is the number of times the password is hashed, 
    // the higher the number the more secure the password,
    // the cost of hashing the password increases by 2 each round
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // do not store the password in plain text, but as a hash
    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter