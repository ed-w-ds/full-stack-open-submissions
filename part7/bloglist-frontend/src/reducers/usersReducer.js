import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        // action creators are generated for each case reducer function
        setUser(state, action) {
            return action.payload
        },
        removeUser() {
            return ''
        }
    }
})

export const { setUser, removeUser } = userSlice.actions

export const setUserWithTimeout = (user) => {
    return async dispatch => {
        dispatch(setUser(user))
        console.log('user in setUserWithTimeout', user)
        setTimeout(() => {
            dispatch(removeUser())
            window.localStorage.removeItem('loggedNoteappUser')
        }, 3600000) // 3600000 ms = 1 hour
    }
}

export default userSlice.reducer