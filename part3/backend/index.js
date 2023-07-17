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

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id).then(phonebook => {
    response.json(phonebook)
  })
  .then (phonebook => {
    if (phonebook) {
      response.json(phonebook)
    }
    else {
      response.status(404).end()
    }
  })
  .catch(error => {
    next(error)
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
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const phonebook = new Phonebook({
    name: body.name,
    number: body.number,
  })

    phonebook.save().then(savedPerson => {
      response.json(savedPerson)
    })

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body


  const phonebook = {
    name: body.name,
    number: body.number,
  }

  console.log(phonebook)
  console.log(request.params.id)
  // new: true - the updated phonebook is returned by the method
  Phonebook.findByIdAndUpdate(request.params.id, phonebook, { new: true })
  // the response is the updated phonebook
    .then(updatedPhonebook => {
      response.json(updatedPhonebook)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  Phonebook.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  // if the error is cast error, then it is a bad request
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})





