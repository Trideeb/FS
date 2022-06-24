require('dotenv').config()
const { request, response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))
const Person = require('./models/person')
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  var jsonLength = Object.keys(persons).length;
  var today = new Date();
  const option1 = { weekday: 'long' };
  const option2 = { month: 'long' }
  response.send(`
  <div>
    <p>Phonebook has info for ${jsonLength} people</p>
    <p>${new Intl.DateTimeFormat('en-US', option1).format(today)} ${new Intl.DateTimeFormat('en-US', option2).format(today)}
    ${today.getDate()} ${today.getFullYear()} ${today.toTimeString()}</p>
  </div>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person)
        response.json(person)
      else
        response.stataus(404).end()
    })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = ({
    name: body.name,
    number: body.number
  })

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number
  })

  if (body.name == undefined && body.number == undefined) {
    return response.status(400).json({
      error: 'Enter a valid name and number'
    })
  }

  person.save().then(person => {
    response.json(person)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})