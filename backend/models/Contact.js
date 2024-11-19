require("dotenv").config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURL)
.then(() => {
    console.log("Connected")
})
.catch((err) => {
    console.log(err)
})

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: (v) => {
                return /^\d{2,3}-\d+$/.test(v);
            }
        },
        required: true
    },
})

contactSchema.set('toJSON', {
transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact