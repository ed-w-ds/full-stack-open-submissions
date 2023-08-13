import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

export const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      console.log('action.payload in andecdoteSlice/vote', action.payload) 
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      console.log('anecdoteToChange in anecdoteSlice/vote', JSON.stringify(anecdoteToChange))
      const changedAnecdote = {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    // createAnecdote(state, action) {
    //   state.push(action.payload)
    // },
    appendAnecdote(state, action) {
      // push works with immer if i don't use return
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

// removed createAnecdote action creator(s)
export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id, anecdote) => {
  return async dispatch => {
    const newObject = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(id, newObject)
    dispatch(vote(updatedAnecdote.id))
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