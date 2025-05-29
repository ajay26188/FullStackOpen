const express = require('express')
const app = express()

//THis line is for POST requests
app.use(express.json())

let persons = [
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

//Returing all phonebook entries
app.get('/api/persons', (request,response) => {
    response.json(persons)
})

//Creating 'http://localhost:3001/info' page
app.get('/info', (request,response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people <br /> ${new Date()}</p>`)
})

//Returning a single phonebook entry
app.get('/api/persons/:id', (request,response) => {
    const id = request.params.id

    //creating an array of IDs to check if 'id above' exists in the server
    const ids = persons.map(person => person.id)
    const findID = ids.find(i => i === id)
    console.log(findID)

    if (!findID) {
        response.status(404).json({
            error: 'person not found'
        })
    }
    person = persons.find(p => p.id === id)
    response.json(person)
})

//Functionality for deleting single phonebook entry
app.delete('/api/persons/:id',(request,response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

//Generating random IDs for new phonebook entries
const generateID = () => {
    const maxID = persons.length > 0 ? Math.max(...persons.map(p => Number(p.id))) : 0
    const newID = Math.floor(Math.random() * ((maxID+100)-maxID)+maxID)
    console.log(maxID)
    console.log(newID)
    return String(newID)
}

//Adding new phonebook entry
app.post('/api/persons',(request,response) => {
    const body = request.body
    console.log(body)
    const findName = persons.find(person => person.name === body.name)

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    if (findName) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateID(),
        name: body.name,
        number: body.number,  
    }
    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${3001}`) 
})