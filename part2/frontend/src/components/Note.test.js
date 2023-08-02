import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('clicking the button calls event handler once', async () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    const mockHandler = jest.fn()

    render(
        <Note note={note} toggleImportance={mockHandler} />
    )

    const user = userEvent.setup()
    // to find the element that contains the text, we can use findByText
    // find by text returns a promise, so we need to use await if we use it
    // OR USE getByText('text', {exact: false })
    const button = screen.getByText('make not important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    // Method 2
    const { container } = render(<Note note={note} />)
    const div = container.querySelector('.note')
    expect(div).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    // debug for wanted element to a console
    // screen.debug(div)

    //method 3
    // render(<Note note={note} />)
    // const element = screen.getByTestId('note')
    // expect(element).toHaveTextContent(
    //     'Component testing is done with react-testing-library'
    // )

    // Method 1
    // render(<Note note={note} />)
    // const element = screen.getByText('Component testing is done with react-testing-library')
    // expect(element).toBeDefined()

    // for debugging the whole DOM
    // screen.debug()
})

// query by text returns null if no element is found
test('does not render this', () => {
    const note = {
        content: 'This is a reminder',
        important: true
    }

    render(<Note note={note} />)

    const element = screen.queryByText('do not wan this thing to be rendered')
    expect(element).not.toBeInTheDocument()
})