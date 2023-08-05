/* eslint-disable */
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, updateBlog, deleteBlog, user}) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenShowDetails = { display: showDetails ? '' : 'none' }
  const buttonLabel = showDetails ? 'hide' : 'view'

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = () => {
    setLikes(likes + 1)
    updateBlog(blog.id, { ...blog, likes: likes + 1 }, blog.user.name)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      deleteBlog(blog.id)
    }    
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
      <div style={hideWhenShowDetails} className="details">
        <p className='likes'>Likes: {blog.likes} <button onClick={ handleLike }>like</button></p>
        {blog.url? <p>Url: {blog.url}</p> : null}
        {(blog.user?.name) ? <p>{blog.user.name}</p> : null}
        {/* {<button onClick={ handleDelete } >remove</button>} */}
        {user.name === blog.user?.name ? <button onClick={ handleDelete } >remove</button> : null}
      </div>
      <button onClick={toggleShowDetails}>{ buttonLabel }</button>
    </div>  
  )  
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog