const {Schema, model} = require('mongoose')

const formSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questions: [
        {
            title: {
                required: true,
                type: String
            },
            answers: [
                {
                    title: {
                        required: true,
                        type: String
                    }
                }
            ],
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Form', formSchema)
