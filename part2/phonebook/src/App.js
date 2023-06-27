import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
    

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (checkName(newName) || newName === '') {
      alert(`${newName} is already added to phonebook`)
      return 
    }
    if (newNumber === '') {
      alert(`Please enter a number`)
      return
    }

    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    console.log(persons)
  }
  const checkName = (name) => {
    // checks if there is a name in the persons array that matches the name given
    return persons.some(person => person.name === name)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value.toLowerCase());
    setNewSearch(event.target.value.toLowerCase())
  }

  const displayPersons = () => {  
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newSearch)) 
    return filteredPersons.map(person => <li key={person.id}>{person.name} {person.number}</li>)
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleSearch={handleSearch}/>

      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <ul>
        {displayPersons()}
      </ul>
    </div>
  )
}

export default App