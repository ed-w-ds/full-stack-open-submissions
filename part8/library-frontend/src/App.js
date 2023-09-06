import { useState, useEffect } from 'react'

import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import BirthForm from './components/BirthForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  useEffect(() => {
    console.log(page)
  }, [page])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const showWhenLoggedIn = { display: token ? '' : 'none' }
  const showWhenLoggedOut = { display: token ? 'none' : '' }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')} style={showWhenLoggedIn}>add book</button>
        <button onClick={() => setPage('login')} style={showWhenLoggedOut}>login</button>
        <button onClick={logout} style={showWhenLoggedIn}>logout</button>
      </div>

      <Authors show={page === 'authors'} />
      <BirthForm show={page === 'authors'} token={token}/>

      <Books show={page === 'books'} /> 

      <LoginForm
        show={page === 'login'}
        page={page}
        token={token}
        setToken={setToken}
        setPage={setPage}
      />

      <NewBook show={page === 'add'} />

    </div>
  )
}

export default App
