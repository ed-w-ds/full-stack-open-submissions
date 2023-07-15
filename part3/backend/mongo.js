const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
    }

const password = process.argv[2]

const url = `mongodb+srv://ed-w-ds:${password}` + 
`@atlascluster.it5xmyb.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Phonebook = mongoose.model('Phonebook', noteSchema)

if (process.argv.length === 3) {
    // note that you have to use Phonebook instead of phonebook since phonebook is an instance of Phonebook
    // this is becuase Phonebook is the model and phonebook is the instance of the model (document)
    Phonebook.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}
else if (process.argv.length === 5) {
    const note = new Phonebook({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    note.save().then(result => {
        console.log('added', `${process.argv[3]}`, 'number', `${process.argv[4]}`, 'to phonebook')
        mongoose.connection.close()
    })
}
else {
    console.log('Please provide the name and number as arguments: node mongo.js <password> <name> <number>')
    process.exit(1)
}
