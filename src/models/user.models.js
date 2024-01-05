const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean
        },
        CreatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }

    },
    {timestamps: true})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo