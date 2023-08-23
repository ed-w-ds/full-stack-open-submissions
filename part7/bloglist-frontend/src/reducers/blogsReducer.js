import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            console.log('action.payload in blogSlice/setNotes', action.payload)
            return action.payload
        }
    },
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        const sortedBlogs = await blogs.sort((a, b) => b.likes - a.likes)
        console.log('sortedBlogs in initializeBlogs', sortedBlogs)
        dispatch(setBlogs(sortedBlogs))
    }
}

export const createNewBlog = (blogObject, user) => {
    return async dispatch => {
        const newBlog = await blogService.createBlog(blogObject)
        const updatedBlog = {
            ...newBlog,
            user: {
                name: user.name
            }
        }
        console.log('newBlog in createNewBlog red', newBlog)
        dispatch(appendBlog(updatedBlog))
    }
}

export default blogSlice.reducer