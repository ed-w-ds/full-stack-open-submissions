import { useState } from 'react'

const handleSearch = (event) => {
    console.log(event.target.value.toLowerCase());
    setNewSearch(event.target.value.toLowerCase())
}

const Filter = ({ handleSearch }) => <div>filter shown with<input onChange={ handleSearch }/></div>



export default Filter