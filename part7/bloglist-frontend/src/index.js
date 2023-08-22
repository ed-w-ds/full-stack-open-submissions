/*eslint linebreak-style: ["error", "unix"]*/
/*eslint indent: ["error", 4]*/
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'

import App from './App'
import store from './store'

console.log('store.getState()', store.getState())
console.log('store.getState().notification', store.getState().notification)



ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)


// ReactDOM.createRoot(document.getElementById('root')).render(<App />)