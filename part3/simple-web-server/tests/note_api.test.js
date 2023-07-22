const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

// supertest takes care that the application being tested is started at the port it uses internally
const api = supertest(app)

const Note = require('../models/note')

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false,
    },
    {
        content: 'Browser can execute only Javascript',
        important: true,
    },
]

beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(initialNotes[0])
    await noteObject.save()
    noteObject = new Note(initialNotes[1])
    await noteObject.save()
})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 10000) // 10 seconds, in case the test takes longer than the defaault jest timeout of 5 seconds

// closes the database connection after each test
afterAll(async () => {
    mongoose.connection.close()
})

test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    // execution gets here only after the HTTP request is complete
    // the result of the HTTP request is saved in the response variable
    expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    // response.body.map(r => r.content) create an array containg the content of every note
    // returned by the API
    const contents = response.body.map(r => r.content)
    expect(contents).toContain(
        'Browser can execute only Javascript'
    )
})
