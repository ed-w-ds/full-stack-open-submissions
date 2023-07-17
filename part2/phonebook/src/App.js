import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import noteService from './services/notes'
import { set } from 'mongoose'

const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  console.log('render', persons.length, 'persons')

  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const SuccessNotification = ({ message }) => {
    const style = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      margin: 10
    }
    useEffect(() => {
      const timer = setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    }, [message])
  
    if (message === null) {
      return null
    }
    
    return (
      <div className="success" style={ style }>
        {message}
      </div>
    )
  }

  
  const ErrorNotification = ({ message }) => {

    const style = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      margin: 10
    }

    useEffect(() => {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    }, [message])

    if (message === null) {
      return null
    }

    return (
      <div className="error" style={ style }>
        {message}
      </div>
    )
  }

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
        .catch(error => {
          alert(
            console.log(error)
            `the person '${person.name}' was already deleted from server`
          )
          setPersons(persons.filter(person => person.id !== changedPerson.id))
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
      // response is the new person object
      .then(response => {
        setSuccessMessage(`Added ${newName}`)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log("err", error)
        console.log("err.res", error.response)
        console.log(error.response.data)
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
      })

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
    event.preventDefault()
    const id = event.target.id
    console.log("id, dwase", id)
    console.log("persons", persons)
    const person = persons.find(person => person.id === id)
    console.log("person", person)
    console.log("person.name", person.name)
    if (window.confirm(`Delete ${person.name}?`)) {
      noteService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  //   if (window.confirm(`Delete ${person.name}?`)) {
  //     noteService
  //       .deletePerson(id)
  //       setPersons(persons)
  //   }
  // }


  const displayPersons = () => {  
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newSearch)) 
    return filteredPersons.map(person => <li key={person.id}>{person.name} {person.number} <button id={ person.id } onClick={ deletePerson } >Delete</button> </li> )
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <SuccessNotification message={successMessage} />

      <ErrorNotification message={ errorMessage } />

      <Filter newSearch={newSearch} handleSearch={handleSearch}/>

      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>

      <Persons displayPersons={displayPersons} />
      
    </div>
  )
}

export default App