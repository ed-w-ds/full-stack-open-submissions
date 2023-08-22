import { configureStore } from '@reduxjs/toolkit'

// import blogsService from './services/blogs'
// import { setBlogs } from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'

// blogsService.getAll().then(blogs =>
//     store.dispatch(setBlogs(blogs))
// )

const store = configureStore({
    reducer: {
        // blogs: blogsReducer,
        notification: notificationReducer
    }
})

export default store