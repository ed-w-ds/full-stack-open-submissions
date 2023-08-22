import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
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

// thunk action creators
export const setNotificationWithTimeout = (notification, timeout) => {
    return async dispatch => {
        dispatch(setNotification(notification))
        setTimeout(() => {
            dispatch(removeNotification())
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer