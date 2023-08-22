import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const dispatch = useDispatch()

    const addBlog = (event) => {
        event.preventDefault()
        console.log('addBlog', newBlog, newAuthor, newUrl)

        createBlog({
            // the parameters that are passed to the addBlog function in app.js
            // that is passed as createBlog to this component
            // the three parameters are passed as an object
            title: newBlog,
            author: newAuthor,
            url: newUrl
        })

        setNewBlog('')
        setNewAuthor('')
        setNewUrl('')

        dispatch(setNotificationWithTimeout(`a new blog ${newBlog} by ${newAuthor} added`, 5))
    }

    return (
        <div>
            <h2>Create a new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        id='title-input'
                        value={newBlog}
                        onChange={(event) => setNewBlog(event.target.value)}
                        placeholder='title'
                    />
                </div>
                <div>
                    author:
                    <input
                        id='author-input'
                        value={newAuthor}
                        onChange={(event) => setNewAuthor(event.target.value)}
                        placeholder='author'
                    />
                </div>
                <div>
                    url:
                    <input
                        id='url-input'
                        value={newUrl}
                        onChange={(event) => setNewUrl(event.target.value)}
                        placeholder='url'
                    />
                </div>
                <button id="submit-button" type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm


