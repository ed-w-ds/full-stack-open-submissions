import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

// redux toolkit solves the problem of having to write a lot of boilerplate code
// to create the store, action creator, the reducer functions etc.
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

// configure store instead of createStore
// and no need to combine reducers
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)


// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import { createStore, combineReducers } from 'redux'
// import { Provider } from 'react-redux'

// import App from './App'
// import noteReducer from './reducers/noteReducer'
// import filterReducer from './reducers/filterReducer'

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// })

// const store = createStore(reducer)

// console.log(store.getState())

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     {/* <App /> */}
//     <div></div>
//   </Provider>
// )

// const renderApp = () => {
//   ReactDOM.render(<App />, root);
// };

// renderApp();
// store.subscribe(renderApp);

// // notes app with redux
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore } from 'redux';

// import noteReducer from './reducers/noteReducer'

// const store = createStore(noteReducer)

// store.dispatch({
//     type: 'NEW_NOTE',
//     payload: {
//         content: 'the app state is in redux store',
//         important: true,
//         id: 1
//     }
// })

// store.dispatch({
//     type: 'NEW_NOTE',
//     payload: {
//         content: 'state changes are made with actions',
//         important: false,
//         id: 2
//     }
// })

// const App = () => {
//     return(
//       <div>
//         <ul>
//           {store.getState().map(note=>
//             <li key={note.id}>
//               {note.content} <strong>{note.important ? 'important' : ''}</strong>
//             </li>
//           )}
//           </ul>
//       </div>
//     )
//   }

// const root = document.getElementById('root');

// const renderApp = () => {
//   ReactDOM.render(<App />, root);
// };

// renderApp();
// store.subscribe(renderApp);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore } from 'redux';

// const counterReducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//     case 'ZERO':
//       return 0;
//     default:
//       return state;
//   }
// };

// const store = createStore(counterReducer);

// const App = () => {
//   return (
//     <div>
//       <div>{store.getState()}</div>
//       <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>plus</button>
//       <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>minus</button>
//       <button onClick={() => store.dispatch({ type: 'ZERO' })}>zero</button>
//     </div>
//   );
// };

// const root = document.getElementById('root');

// const renderApp = () => {
//   ReactDOM.render(<App />, root);
// };

// renderApp();
// store.subscribe(renderApp);