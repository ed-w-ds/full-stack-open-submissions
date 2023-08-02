import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Note from './Note'

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
})