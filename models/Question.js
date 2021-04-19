const {model, Schema} = require('mongoose')

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: String,
    required: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    answers: [
        {
            title: {
                type: String,
                required: true
            },
            correct: Boolean
        }
    ],
    form: {
        type: Schema.Types.ObjectId,
        ref: 'Form'
    }
})

module.exports = model('Question', questionSchema)
