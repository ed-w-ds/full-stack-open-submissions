import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'
    , id: 1 }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (checkName(newName) || newName === '') {
      alert(`${newName} is already added to phonebook`)
      return 
    }
    const personObject = {
      name: newName,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
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

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={ addPerson }>
        <div>
          name: <input onChange={ handleNameChange }/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.id}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App