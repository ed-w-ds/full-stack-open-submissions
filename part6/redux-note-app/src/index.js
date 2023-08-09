// notes app with redux
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

store.dispatch({
    type: 'NEW_NOTE',
    payload: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
    }
})

store.dispatch({
    type: 'NEW_NOTE',
    payload: {
        content: 'state changes are made with actions',
        important: false,
        id: 2
    }
})

const App = () => {
    return(
      <div>
        <ul>
          {store.getState().map(note=>
            <li key={note.id}>
              {note.content} <strong>{note.important ? 'important' : ''}</strong>
            </li>
          )}
          </ul>
      </div>
    )
  }

const root = document.getElementById('root');

const renderApp = () => {
  ReactDOM.render(<App />, root);
};

renderApp();
store.subscribe(renderApp);

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