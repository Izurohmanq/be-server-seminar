const mongoose = require('mongoose')
const { model, Schema } = mongoose

let ImageSchema = Schema (
    {
        name: {type: String},

    },
    {
        timestamp: true
    }
)

module.exports = model('Image', ImageSchema)