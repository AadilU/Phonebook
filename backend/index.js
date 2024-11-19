require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
const app = express()
const Contact = require('./models/Contact')

// eslint-disable-next-line
morgan.token('type', function (req, res) { return `${JSON.stringify(req.body)}`})

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id"})
    }

    if(error.name == "ValidationError") {
        return response.status(400).send({error: error.message})
    }

    next(error)
}

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts);
    })
})

app.get('/info', (request, response) => {
    const currDate = new Date();
    Contact.find({}).then(contacts => {
        response.send(`<p>Phonebook has info for ${contacts.length} people<br/>${currDate}</p>`)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    Contact.findById(id).then(contact => {
        response.json(contact);
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Contact.findByIdAndDelete(id)
    // eslint-disable-next-line
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', async (request, response, next) => {
    const contact = request.body

    Contact.findOneAndUpdate({name: contact.name}, {number: contact.number}, { new: true, runValidators: true })
    .then(updatedContact => {
        if(updatedContact) {
            response.json(updatedContact)
        }
        else {
            const newContact = Contact({
                name: contact.name,
                number: contact.number
            })

            newContact.save().then(savedContact => {
                response.json(savedContact)
            })
            .catch(error => next(error))
        }
    })
    .catch(error => next(error))
})
  
app.use(unknownEndpoint)
app.use(errorHandler)

// eslint-disable-next-line
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("App running");
})