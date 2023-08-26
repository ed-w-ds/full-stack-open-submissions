import { useSelector } from 'react-redux'

import { Alert } from '@mui/material'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    console.log('notification', notification)

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        margin: 10
    }

    if (notification === '') {
        style.display = 'none'
    }
    else {
        style.display = ''
    }

    return (
        <div style={style}>
            <Alert severity="success">
                {notification}
            </Alert>
        </div>
    )
}

export default Notification