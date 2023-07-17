const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Note = require('./models/note')

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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id, 
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  ) 
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})




// const express = require('express')
// const app = express()
// const cors = require('cors')
// require('dotenv').config()

// const Note = require('./models/note')

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(cors())
// app.use(express.static('build'))
// // json middleware has to be before the requestLogger and befre the routes
// // because then request.body would be empty/undefined
// // express.json is a built-in middleware function in Express. 
// // It parses incoming requests with JSON payloads and is based on body-parser.
// app.use(express.json())
// app.use(requestLogger)

// app.get('/api/notes', (req, res) => {
//   Note.find({}).then(notes => {
//     res.json(notes)
//   })
// })

// app.get('/api/notes/:id', (request, response, next) => {
//   Note.findById(request.params.id)
//   .then(note => {
//     if (note) {
//       response.json(note)
//     }
//     else {
//       response.status(404).end()
//     }
//   })
//   .catch(error => {
//     // 500 - internal server error
//     // 400 - bad request
//     // mongoose error handling
//     // response.status(400).send({ error: 'malformatted id' })
//     next(error)
//   })
// })

// app.post('/api/notes', (request, response, next) => {
//   const body = request.body

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   })

//   note.save().then(savedNote => {
//     response.json(savedNote)
//   })
//   .catch(error => next(error))
// })

// app.put('/api/notes/:id', (request, response, next) => {
//   const { content, important } = request.body

//   // new: true - the event handler receives the updated object as its parameter
//   // note is a regular JS object, not a mongoose object
//   Note.findByIdAndUpdate(
//     request.params.id, 
//     { content, important }, 
//     { new: true, runValidators: true, context: 'query'})
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })

// app.delete('/api/notes/:id', (request, response, next) => {
//   // findByIdAndRemove is provided by mongoose
//   Note.findByIdAndRemove(request.params.id)
//     .then(result => { // result is the deleted note
//       // .end() comes from the Node core
//       response.status(204).end()
//     })
//     .catch(error => next(error))
//   // HTTP 204 No Content success status response code indicates that the request has succeeded,
//   // but that the client doesn't need to go away from its current page.
// })

// // handler of requests with unknown endpoint
// app.use(unknownEndpoint)

// // errorHandler has to be the last loaded middleware
// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   }
//   else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }

// app.use(errorHandler)

// const PORT = process.env.PORT
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })





// //simple web server
// const repl = require('repl')

// const express = require('express') // this replaced:
// // const http = require('http')
// const app = express() // this replaced:
//   // const app = http.createServer((request, response) => {
//   //   response.writeHead(200, { 'Content-Type': 'application/json' })
//   //   response.end(JSON.stringify(notes))
//   // }) 
//   // and this above replaced this:
// // const app = http.createServer((request, response) => {
// //     response.writeHead(200, { 'Content-Type': 'text/plain' })
// //     response.end('Hello World')
// // })

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only JavaScript",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       important: true
//     }
//   ]
  
//   app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
//   })

//   app.get('/api/notes', (request, response) => {
//     response.json(notes)
//   })

//   app.get('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const note = notes.find(note => note.id === id)

//     if (note) {
//       response.json(note)
//       console.log(note)
//     }
//     else {
//       response.statusMessage = `Note with id ${id} not found`
//       console.log(response.statusMessage)
//       response.status(404).end()
//     }
//   })

//   const generateId = () => { 
//     const maxId = notes.length > 0
//       ? Math.max(...notes.map(n => n.id))
//       : 0
//     return maxId + 1
//   }


//   app.post('/api/notes', (request, response) => {
//     const body = request.body

//     if (!body.content) {
//       return response.status(400).json({ 
//         error: 'content missing' 
//       })
//     }

//     const note = {
//       content: body.content,
//       important: body.important || false,
//       date: new Date(),
//       id: generateId(),
//     }

//     notes = notes.concat(note)

//     response.json(note)
//   })

//   app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)

//     response.status(204).end()
//   })

// const PORT = 3001
// app.listen(PORT)
// console.log(`server running on port ${PORT}`)
