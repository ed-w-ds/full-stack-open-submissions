const mongoose = require('mongoose')

// you must install this library
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
        // type: String,
        // required: true,
        // minlength: 5
    },
    genres: [
        { type: String }
    ]
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', schema)