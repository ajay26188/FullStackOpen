require('dotenv').config()
const express = require('express')
const Person = require('./models/phonebook')

const cors = require('cors')
const app = express()
app.use(cors())

//THis line is for POST requests (middleware)
app.use(express.json())

/*
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
*/

// Serve static files from the 'dist' folder (built React frontend)
// This allows frontend and backend to be served from the same server in production
app.use(express.static('dist'));

//Returing all phonebook entries
/*
app.get('/api/persons', (request,response) => {
    response.json(persons)
})
*/
app.get('/api/persons', (request,response,next) => {
    Person.find({})
    .then(persons => {
        response.json(persons)
    })
    .catch(error => next(error))
})


//Creating 'http://localhost:3001/info' page
app.get('/info', (request,response,next) => {
    Person.countDocuments({})
    .then(count => {
        response.send(`<p>Phonebook has info for ${count} people <br /> ${new Date()}</p>`)
    })
    .catch(error => next(error))
})

//Returning a single phonebook entry
/*
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
*/

app.get('/api/persons/:id', (request,response,next) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

//Functionality for deleting single phonebook entry
/*
app.delete('/api/persons/:id',(request,response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})
*/
app.delete('/api/persons/:id',(request,response,next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

/*
//Generating random IDs for new phonebook entries
const generateID = () => {
    const maxID = persons.length > 0 ? Math.max(...persons.map(p => Number(p.id))) : 0
    const newID = Math.floor(Math.random() * ((maxID+100)-maxID)+maxID)
    console.log(maxID)
    console.log(newID)
    return String(newID)
}
*/
//Adding new phonebook entry
/*
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
*/
app.post('/api/persons',(request,response,next) => {
    const body = request.body
    //console.log(body)

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,  
    })
    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
    
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
  
    Person.findById(request.params.id)
      .then(person => {
        if (!person) {
          return response.status(404).end()
        }
  
        person.name = name
        person.number = number
  
        return person.save().then((updatedPerson) => {
          response.json(updatedPerson)
        })
      })
      .catch(error => next(error))
})

//This should be defined after all routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  // handler of requests with unknown endpoint
  app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}
  
  // this has to be the last loaded middleware, also all the routes should be registered before this!
  app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${3001}`) 
})