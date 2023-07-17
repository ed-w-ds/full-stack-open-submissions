// backend for the phonebook app
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Phonebook = require('./models/phonebook')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

let persons = []

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(phonebook => {
    response.json(phonebook)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Phonebook.findById(request.params.id).then(phonebook => {
    response.json(phonebook)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  const info = `<p>Phonebook has info for ${Phonebook.length} people</p>
  <p>${date}</p>`
  response.send(info)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (body.name === undefined) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (body.number === undefined) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  // if (persons.find(person => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }

  const phonebook = new Phonebook({
    name: body.name,
    number: body.number,
  })

    phonebook.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  Phonebook.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})





