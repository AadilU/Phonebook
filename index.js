const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
const app = express()

morgan.token('type', function (req, res) { return `${JSON.stringify(req.body)}`})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.use(cors())

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

let contacts = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(contacts);
})

app.get('/info', (request, response) => {
    console.log("test");
    const currDate = new Date();
    response.send(`<p>Phonebook has info for ${contacts.length} people<br/>${currDate}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const contact = contacts.find(n => n.id === id);

    if(!contact) {
        response.status(404).end();
    }
    else {
        response.json(contact);
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    contacts = contacts.filter(c => c.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random()*(100))
    const contact = request.body
    contact.id = String(id)

    if(!contact.name || !contact.number) {
        return response.status(400).json({
            error: "needs name and number"
        })
    }

    if(contacts.find(c => c.name === contact.name)) {
        return response.status(400).json({
            error: "name already in phonebook"
        })
    }

    contacts = contacts.concat(contact)
    response.json(contact)
})
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("App running");
})