import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    console.log('update', id, newObject)
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = (id) => {
    console.log('delete', id)
    return axios.delete(`${baseUrl}/${id}`)
}

const noteService = { getAll, create, update, deletePerson }

export default noteService