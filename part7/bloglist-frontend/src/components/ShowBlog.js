/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { createNewComment, initializeBlogs } from '../reducers/blogsReducer'

// import blogService from '../services/blogs'

const ShowBlog = ({updateBlog, deleteBlog, user}) => {
    const dispatch = useDispatch()
    const id = useParams().id
    console.log('id', id)
    const blogs = useSelector(state => state.blogs)
    console.log('blogs', blogs)
    const blog = blogs.find(blog => blog.id === id)
    console.log('blog', blog)

    const [likes, setLikes] = useState(blog ? blog.likes : 0);

    // we could try getting the likes from the blog object in the store
    const handleLike = () => {
        setLikes(likes + 1)
        if (blog.user?.name) {
            updateBlog(blog.id, { ...blog, likes: likes + 1 }, blog.user.name)
        }
        else {
            updateBlog(blog.id, { ...blog, likes: likes + 1 }, '')
        }
        dispatch(setNotificationWithTimeout(`you voted '${blog.title}' by ${blog.author}`, 5))
    }

    const navigate = useNavigate();
    const handleDelete = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            deleteBlog(blog.id)
        }
        navigate('/')
        dispatch(setNotificationWithTimeout(`you deleted '${blog.title}'`, 5))
    }

    const addComment = (event) => {
        event.preventDefault()
        const eve = event.target.Comment.value
        const commentObject = {
            comment: eve
        }
        dispatch(createNewComment(blog.id, commentObject))
        dispatch(setNotificationWithTimeout(`you commented '${eve}' on '${blog.title}'`, 5))
        event.target.Comment.value = ''
    }

    const getComments = () => {
        if (blog.comments) {
            return (
                <>
                    <h3>Comments</h3>
                    <CommentForm />
                    <ul>
                        {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
                    </ul>
                </>
            )
        }
        else {
            return (
                <>
                    <h3>Comments</h3>
                    <CommentForm />
                    <p>No comments yet... Be the first to add one!</p>
                </>
            )
        }
    }

    // reformat
    const CommentForm = () => {
        return (
            <form onSubmit={addComment}>
                <input
                    id='comment-input'
                    name="Comment"
                    placeholder='comment'
                />
                <button type="submit">add comment</button>
            </form>
        )
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    
    return (
        <div style={blogStyle} className='blog'>
            <p className='titleAuthor'><b>Title:</b> {blog.title} || <b>Author:</b> {blog.author}</p>
            <p className='likes'>Likes: {blog.likes} <button onClick={ handleLike }>like</button></p>
            {blog.url? <p>Url: {blog.url}</p> : null}
            {(blog.user?.name) ? <p>{blog.user.name}</p> : null}
            {/* {<button onClick={ handleDelete } >remove</button>} */}
            {user.name === blog.user?.name ? <button onClick={ handleDelete } >remove</button> : null}
            {getComments()}
        </div>
    )
}

export default ShowBlog