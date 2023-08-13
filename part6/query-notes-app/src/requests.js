import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

export const getNotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}

export const createNote = (content) => {
    return axios.post(baseUrl, content).then(res => res.data)
}

export const updateNote = updatedNote =>
    axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then(res => res.data)