import NewNote from './components/NewNote'
import Notes from './components/Notes'

const App = () => {

  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}

export default App

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
