import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/phoneServices'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => 
        console.error(error)
      )
  }, [])

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const addData = (event) => {
    event.preventDefault()
    const checkPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if(checkPerson === undefined) {
      const dataObject = {
        name: newName,
        number: newNumber
      }
      personService 
        .create(dataObject)
        .then(response =>
          setPersons(persons.concat(response)))
          notify(`Added ${dataObject.name}`)
    }
    else if(checkPerson && checkPerson.number !== newNumber) {
      if(window.confirm(`Are you sure you want update ${checkPerson.name}'s number with a new one?`)) {
        const personUpdate = { ...checkPerson, number: newNumber }
        personService
          .update(checkPerson.id, personUpdate)
          .then(returnedPerson =>{
            setPersons(
              persons
                .map(person =>
                  person.id !== checkPerson.id 
                    ? person 
                    : returnedPerson
              )
            )
            notify(`Updated info of ${checkPerson.name}`)
            })
            .catch(error => {
              notify(
                `the person '${checkPerson.name}' has already been removed from the server`, 'alert'
              )
              setPersons(persons.filter(p => p.id !== checkPerson.id))
            })
      }
    }
    else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  const deleteData = (id) => {
    const person = persons.find(person => person.id === id)
    if(window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
          persons.map(person => person.id !== id ? person : returnedPerson)
          notify(`Deleted ${person.name}`)
        })
      setPersons(persons)
    }
  }

  const handleDataChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setfilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filtername={filterName} handleFilterChange={handleFilterChange} />
      <Notification notification={notification} />
      <PersonForm addData={addData} newName={newName} newNumber={newNumber} handleDataChange={handleDataChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())).map(person => (
      <Person key={person.name} person={person} deleteData={deleteData}/> ))}
    </div>
  )
}

export default App