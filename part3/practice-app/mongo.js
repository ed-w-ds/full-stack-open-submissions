const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
    }

const password = process.argv[2]

const url = `mongodb+srv://ed-w-ds:${password}` + 
`@atlascluster.it5xmyb.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'Mongoose makes things easy',
    important: true
})

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

// note that you have to use Note instead of note since note is an instance of Note
// this is becuase Note is the model and note is the instance of the model (document)
Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})


