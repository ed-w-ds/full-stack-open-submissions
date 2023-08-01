import { useState } from 'react'

const Blog = ({blog}) => {

  const [showDetails, setShowDetails] = useState(false)

  const hideWhenShowDetails = { display: showDetails ? '' : 'none' }
  const buttonLabel = showDetails ? 'hide' : 'view'

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
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
        <p>Likes: {blog.likes} <button>like</button></p>
        <p>Url: {blog.url}</p>
        {blog.user?.name ? <p>{blog.user.name}</p> : null}
      </div>
      <button onClick={toggleShowDetails}>{ buttonLabel }</button>
    </div>  
  )  
}


export default Blog