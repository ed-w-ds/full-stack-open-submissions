import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'initial notification',
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer