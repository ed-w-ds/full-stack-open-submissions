// loaders
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'

// import css to index not app
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// for optimization, JS uses uglifyjs, which compresses/minifies code
// it is called automatically if build is run with NODE_ENV=production