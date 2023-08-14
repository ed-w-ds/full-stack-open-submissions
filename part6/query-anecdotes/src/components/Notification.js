// import NotificationContext from '../CreateContext'
import { useNotificationValue } from '../CreateContext'
// import { useContext } from 'react'

const Notification = () => {
  const notification = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
      <div style={style}>
        {notification
          ? notification
          : 'No new notifications'
        }
      </div>
  )
}

export default Notification
