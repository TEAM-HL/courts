const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    origin: {
        type: String
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post