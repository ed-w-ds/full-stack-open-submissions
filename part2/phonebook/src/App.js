import { useState } from 'react'

import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'
    , id: 1,
    number: '123-456-7890' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  const displayPersons = () => {  
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newSearch)) 
    return filteredPersons.map(person => <li key={person.id}>{person.name} {person.number}</li>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with<input onChange={ handleSearch }/></div>
      <h2>Add a new</h2>
      <form onSubmit={ addPerson }>
        <div>
          name: <input onChange={ handleNameChange }/>
        </div>
        <div>
          number: <input onChange={ handleNumberChange }/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App