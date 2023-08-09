/* eslint-disable */
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  // useEffect(() => {
  //   callDispatch()
  // }, [])

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  // subscribe: storeNow has length +1 of the number of dispatches 
  store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
  })

  // const dispatch = (action) => {
  //   store.dispatch(action)
  // }

  // const callDispatch = () => {
  //   for (let i = 0; i < 5; i++) {
  //     dispatch({ type: 'GOOD' })
  //   }
  //   for (let i = 0; i < 4; i++) {
  //     dispatch({ type: 'OK' })
  //   }
  //   for (let i = 0; i < 2; i++) {
  //     dispatch({ type: 'BAD' })
  //   }
  // }


  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok  {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
