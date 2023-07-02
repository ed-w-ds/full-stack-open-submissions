import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import noteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  console.log('render', persons.length, 'persons')

  useEffect(hook, [])

  // const [persons, setPersons] = useState(notes)

  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (checkName(newName) && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const person = persons.find(person => person.name === newName)
      const changedPerson = { ...person, number: newNumber }
      noteService
        .update(person.id, changedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : response.data))
          setNewName('')
          setNewNumber('')
        })
      return
    }
    if (checkName(newName)) {
      alert(`${newName} is already added to phonebook`)
      return 
    }
    if (newName === '') {
      alert(`Please enter a name`)
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

    noteService 
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      }
    )

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

  const deletePerson = (event) => {
    console.log("event target dawg ", event.target.id);
    const id = Number(event.target.id)
    const person = persons.find(person => person.id === id)
    console.log(person);
    if (window.confirm(`Delete ${person.name}?`)) {
      noteService
        .deletePerson(id)
        .then(response => {
          console.log(response);
          setPersons(persons.filter(person => person.id !== id))
          displayPersons()
        }
      )
    }
  }


  const displayPersons = () => {  
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newSearch)) 
    return filteredPersons.map(person => <li key={person.id}>{person.name} {person.number} <button id={ person.id } onClick={ deletePerson } >Delete</button> </li> )
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleSearch={handleSearch}/>

      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>

      <Persons displayPersons={displayPersons} />
      
    </div>
  )
}

export default App