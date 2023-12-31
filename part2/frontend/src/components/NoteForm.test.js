import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const createNote = jest.fn()
    const user = userEvent.setup()

    render(<NoteForm createNote={createNote} />)

    // most flexible way to find an element is querySelector of the container
    // we would use id to find it
    //const { container } = render(<NoteForm createNote={createNote} />)
    // const input = component.container.querySelector('input')

    // getAllByRole returns an array of matching nodes
    // so if there are multiple textboxes, we would find them all
    // and then we could choose the correct one by index, since it returns an array
    // you can also use placeholderText, labelText, etc.
    // use if only one textbox
    // const input = screen.getByRole('textbox')
    const input = screen.getByPlaceholderText('write note content here')
    const sendButton = screen.getByText('save')

    await user.type(input, 'testing a form...')
    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})