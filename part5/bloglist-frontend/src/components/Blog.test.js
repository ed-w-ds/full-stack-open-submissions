import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container

    beforeEach(() => {
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

        container = render(
            <Blog
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
            />
        ).container
    })

    test('renders content Title and Author by default', async () => {

        const titleAuthor = container.querySelector('.titleAuthor')
        expect(titleAuthor).toHaveTextContent('Test Title')
        expect(titleAuthor).toHaveTextContent('Test Author')
        const details = container.querySelector('.details')
        expect(details).toHaveStyle('display: none')
    })
})