import { createContext, useReducer, useContext } from 'react'

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificatonAndDispatch = useContext(NotificationContext)
  return notificatonAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificatonAndDispatch = useContext(NotificationContext)
  return notificatonAndDispatch[1]
}

export default NotificationContext