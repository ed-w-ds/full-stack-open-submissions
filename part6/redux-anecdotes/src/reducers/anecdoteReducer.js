import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

export const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      console.log('action.payload', action.payload) 
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      console.log('anecdoteToChange', JSON.stringify(anecdoteToChange))
      const changedAnecdote = {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    appendAnecdote(state, action) {
      return state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const {  createAnecdote, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer

// console.log('JSON parse state', JSON.parse(JSON.stringify(state)))

// action creators
// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//       id: generateId(),
//       votes: 0
//     }
//   }
// }