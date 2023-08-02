import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content Title and Author by default', async () => {
    const updateBlog = jest.fn()
    const deleteBlog = jest.fn()

    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test Url',
        likes: 0,
        user: {
            name: 'Test User'
        }
    }

    const component = render(
        <Blog
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
        />
    )

    const titleAuthor = component.container.querySelector('.titleAuthor')
    expect(titleAuthor).toHaveTextContent('Test Title')
    expect(titleAuthor).toHaveTextContent('Test Author')
    const details = component.container.querySelector('.details')
    expect(details).toHaveStyle('display: none')
})