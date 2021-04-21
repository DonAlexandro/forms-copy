const {Schema, model} = require('mongoose')

const keys = require('../keys')

const formSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    color: {
        type: String,
        default: keys.DEFAULT_COLOR
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Form', formSchema)
