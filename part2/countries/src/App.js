import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ShowCountries from './components/ShowCountries'

function App() {

  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))

  const handleSearch = (event) => {
    console.log(event.target.value.toLowerCase());
    setNewSearch(event.target.value.toLowerCase())
  }

  return (
    <div className="App">
      <div>
        find countries <input value={newSearch} onChange={handleSearch} />
        <ShowCountries countries={filteredCountries} setSearchFilter={setNewSearch}/>
      </div>
    </div>
  );
}

export default App;
