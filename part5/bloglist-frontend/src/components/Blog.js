import { useState } from 'react'

const Blog = ({blog, updateBlog, deleteBlog}) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenShowDetails = { display: showDetails ? '' : 'none' }
  const buttonLabel = showDetails ? 'hide' : 'view'

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = () => {
    setLikes(likes + 1)
    updateBlog(blog.id, { ...blog, likes: likes + 1 })
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
    <div style={blogStyle}>
      <p><b>Title:</b> {blog.title} || <b>Author:</b> {blog.author}</p>
      <div style={hideWhenShowDetails}>
        <p>Likes: {blog.likes} <button onClick={ handleLike }>like</button></p>
        <p>Url: {blog.url}</p>
        {blog.user?.name ? <p>{blog.user.name}</p> : null}
        <button onClick={ handleDelete } >remove</button>
      </div>
      <button onClick={toggleShowDetails}>{ buttonLabel }</button>
    </div>  
  )  
}


export default Blog