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
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'


import './index.css'

// routing
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  const [reload, setReload] = useState(false)
  // const [errorMessage, setErrorMessage] = useState(null)
  // const [successMessage, setSuccessMessage] = useState(null)
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
      // setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
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

  // // add blog
  // const addBlog = async (blogObject) => {
  //   console.log('adding blog', blogObject)
  //   console.log('user', user)
  //   console.log('user name', user.name)

  //   try {
  //     blogFormRef.current.toggleVisibility()

  //     const blog = await blogService.createBlog(blogObject)

  //     const updatedBlog = {
  //       ...blog,
  //       user: {
  //         name: user.name
  //       }
  //     }
  //     setBlogs(blogs.concat(updatedBlog))
  //     setTitle('')
  //     setAuthor('')
  //     setUrl('')
  //     // setSuccessMessage(`A new blog ${blog.title} by ${blog.author} added`)
  //     // setTimeout(() => {
  //     //   setSuccessMessage(null)
  //     // }, 5000)
  //   } catch (exception) {
  //     console.log('Error adding blog')
  //     console.log(exception)

  //     // setErrorMessage('Error adding blog')
  //     // setTimeout(() => {
  //     //   setErrorMessage(null)
  //     // }, 5000)
  //     dispatch(setNotificationWithTimeout('Error adding blog', 5))
  //   }
  // }


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
      // setSuccessMessage(`Blog ${blog.title} by ${blog.author} updated`)
      // setTimeout(() => {
      //   setSuccessMessage(null)
      // }, 5000)
    } catch (exception) {
      console.log('Error updating blog')
      console.log('exception', exception)

      // setErrorMessage('Error updating blog')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
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
      // setSuccessMessage('Blog deleted')
      // setTimeout(() => {
      //   setSuccessMessage(null)
      // }, 5000)
    } catch (exception) {
      console.log('Error deleting blog')
      console.log('exception', exception)

      // setErrorMessage('Error deleting blog')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      dispatch(setNotificationWithTimeout('Error deleting blog', 5))
    }
  }

  const ShowUsers = () => {
    const users = useSelector(state => state.users)
    console.log('users in showusers', users)

    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>user</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <Router>
      {/* <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" /> */}
      <div>
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
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
          <p>{user.name} logged-in <button onClick={ logout }>logout</button></p>
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
            <Route path="/users" element={<ShowUsers />} />
          </Routes>
        </>
      }
    </Router>
  )
}

export default App