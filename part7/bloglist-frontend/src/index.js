/*eslint linebreak-style: ["error", "unix"]*/
/*eslint indent: ["error", 4]*/
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'

import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import store from './store'

console.log('store.getState()', store.getState())
console.log('store.getState().notification', store.getState().notification)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
)


// ReactDOM.createRoot(document.getElementById('root')).render(<App />)