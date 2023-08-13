import { useEffect } from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
// import noteService from './services/notes'
// import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   noteService
  //     .getAll().then(notes => dispatch(setNotes(notes)))
  // }, []) // eslint-disable-line react-hooks/exhaustive-deps 

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes()) 
  }, [dispatch]) 

  return(
    <div>
      <NewNote />
      <VisibilityFilter />
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
