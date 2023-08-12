import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

// stored in redux store as state.notes
const noteSlice = createSlice({
  // name replaces action type prefix
  name: 'notes',
  initialState,
  reducers: {
    // action creators are generated for each case reducer function
    // stored in redux store as type notes/createNote
    createNote(state, action) {
      const content = action.payload
      // we can now use immutable data structures
      // because immer library takes care of cloning - https://immerjs.github.io/immer/
      // basically object freezing out of the box
      state.push({
        content,
        important: false,
        id: generateId(),
      })
    },
    // stored in redux store as type notes/toggleImportanceOf
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }

      console.log(state)
      console.log('JSON parse state', JSON.parse(JSON.stringify(state)))

      return state.map(note =>
        note.id !== id ? note : changedNote 
      )     
    }
  },
})

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer

// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   },
// ]

// const noteReducer = (state = initialState, action) => {
//   switch(action.type) {
//     case 'NEW_NOTE':
//       return [...state, action.payload]
//     case 'TOGGLE_IMPORTANCE':
//       const id = action.payload.id
//       const noteToChange = state.find(n => n.id === id)
//       const changedNote = { 
//         ...noteToChange, 
//         important: !noteToChange.important 
//       }
//       return state.map(note =>
//         note.id !== id ? note : changedNote 
//       )
//     default:
//       return state
//     }
//   } 

// const generateId = () =>
//   Number((Math.random() * 1000000).toFixed(0))

// // action creators
// export const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       important: false,
//       id: generateId()
//     }
//   }
// }

// export const toggleImportanceOf = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     payload: { id }
//   }
// }  

// export default noteReducer