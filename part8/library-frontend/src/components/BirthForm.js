import { useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthForm = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            console.log(error)
        },
    })

    const authorsResult = useQuery(ALL_AUTHORS)

    if (authorsResult.loading) {
        return <div>loading...</div>
    }

    const authors = authorsResult.data.allAuthors

    const submit = async (event) => {
        event.preventDefault()

        if (name === '') {
            console.log('name is required')
            return
        }
        if (born === '') {
            console.log('birth year is required')
            return
        }

        console.log('edit author...')
        editAuthor({ variables: { name, setBornTo: born } })

        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    {/* <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    /> */}
                    <select value={name} onChange={({ target }) => setName(target.value)}>
                        <option value='' disabled>Select author</option>
                        { authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>) }
                    </select>
                </div>
                <div>
                    born
                    <input
                        type="number"
                        value={born}
                        onChange={({ target }) => setBorn(parseInt(target.value))}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default BirthForm