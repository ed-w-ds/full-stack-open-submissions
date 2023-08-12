import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'initial notification',
    reducers: {
        // action creators are generated for each case reducer function
        setNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return ''
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer