/*eslint linebreak-style: ["error", "unix"]*/
/*eslint indent: ["error", 2]*/
/*eslint quotes: ["error", "single"]*/
/* eslint no-unused-vars: 0 */
import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUserWithTimeout } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'

import Blog from './components/Blog'
import ShowBlog from './components/ShowBlog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

import { Container, Table, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Button, Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

import './index.css'

// routing
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams
} from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [reload, setReload] = useState(false)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const user = useSelector(state => state.user)

  // get all blogs
  useEffect(() => {
    const getBlogs = async () => {
      if (!user) {
        return
      }
      dispatch(initializeBlogs())
    }
    getBlogs()
  }, [user, reload]) //setsuccessmessage
  // add success message in the dependency array
  // so the blog list is updated when a blog has more likes than the blog above
  const blogs = useSelector(state => state.blogs)
  console.log('blogs in app', blogs)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserWithTimeout(user))
      // setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // get all users
  useEffect(() => {
    const getTheUsers = async () => {
      const users = await userService.getAllUsers()
      console.log('users in app', users)
      dispatch(getUsers(users))
    }
    getTheUsers()
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUserWithTimeout(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      dispatch(setNotificationWithTimeout('Wrong credentials', 5))
    }
  }

  // login and logout
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username-input"
          placeholder="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password-input"
          placeholder="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          autoComplete = "on"
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.reload()
  }

  // show blogs
  const showBlogs = () => (
    <div id="blog">
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      )}
    </div>
  )

  //update blog
  const updateBlog = async (id, blogObject, blogUserName) => {
    try {
      const blog = await blogService.updateBlog(id, blogObject)
      const updatedBlog = await {
        ...blog,
        user: {
          name: blogUserName
        }
      }

      // IMPORTANT setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
      blogs.map(blog => blog.id !== id ? blog : updatedBlog)
      reload ? setReload(false) : setReload(true)
    } catch (exception) {
      console.log('Error updating blog')
      console.log('exception', exception)

      dispatch(setNotificationWithTimeout('Error updating blog', 5))
    }
  }

  // delete blog
  const deleteBlog = async (id) => {
    console.log('deleting blog', id)

    try {
      await blogService.deleteBlog(id)

      // setBlogs(blogs.filter(blog => blog.id !== id))
      blogs.filter(blog => blog.id !== id)
      reload ? setReload(false) : setReload(true)
    } catch (exception) {
      console.log('Error deleting blog')
      console.log('exception', exception)

      dispatch(setNotificationWithTimeout('Error deleting blog', 5))
    }
  }

  const ShowUsers = () => {
    const users = useSelector(state => state.users)
    console.log('users in showusers', users)

    return (
      <div>
        <h2>Users</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>user</TableCell>
                <TableCell>blogs created</TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {users.map(user =>
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.blogs.length}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  const ShowUserBlogs = () => {
    const id = useParams().id
    const users = useSelector(state => state.users)
    const user = users.find(user => user.id === id)
    console.log('user in showuserblogs', user)

    if (!user) {
      return null
    }
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}
        </ul>
      </div>
    )
  }

  // export default function BasicButtons() {
  //   return (
  //     <Stack spacing={2} direction="row">
  //       <Button variant="text">Text</Button>
  //       <Button variant="contained">Contained</Button>
  //       <Button variant="outlined">Outlined</Button>
  //     </Stack>
  //   );
  // }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      color: 'white'
    },
  })

  return (
    <Container>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {/* <Router> */}
        <div className='navStyle'>
          <Link to="/">home</Link>
          <Link to="/users">users</Link>
          { user === null
            ? null
            : <><b>{user.name} logged-in</b>
              <Button variant="contained" onClick={logout}>logout</Button>
            </>}
        </div>

        {user === null ?
          <>
            <Notification />
            <h2>Log in to application</h2>
            {loginForm()}
          </>
          :
          <>
            <Notification />
            <h2>blogs</h2>
            <Routes>
              <Route path="/" element={
                <>
                  <Togglable buttonLabel="add new blog" ref={ blogFormRef }>
                    <BlogForm
                      user = {user}
                      onSubmit={ () => setReload(!reload) }
                    />
                  </Togglable>
                  {showBlogs()}
                </>
              } />
              <Route path="/users" element={ <ShowUsers /> } />
              <Route path="/users/:id" element={ <ShowUserBlogs /> } />
              <Route path="/blogs/:id" element={ <ShowBlog
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />} />
            </Routes>
          </>
        }
        {/* </Router> */}
      </ThemeProvider>
    </Container>
  )
}

export default App