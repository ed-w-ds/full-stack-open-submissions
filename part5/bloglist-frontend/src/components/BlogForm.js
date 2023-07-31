import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

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
    }

    return (
        <div>
            <h2>Create a new blog</h2>
            
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        value={newBlog}
                        onChange={(event) => setNewBlog(event.target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        value={newAuthor}
                        onChange={(event) => setNewAuthor(event.target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        value={newUrl}
                        onChange={(event) => setNewUrl(event.target.value)}
                    />
                </div>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm


