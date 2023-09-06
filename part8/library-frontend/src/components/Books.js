import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)

  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
  })

  if (!props.show) {
    return null
  }

  if (booksResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data.allBooks
  console.log('books', books)

  // The flat() method of Array instances creates a new array 
  // with all sub-array elements concatenated into it recursively up to the specified depth.
  const genres = books.map(b => b.genres).flat()
  const uniqueGenres = [...new Set(genres)]
  console.log('uniqueGenres', uniqueGenres)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {/* {uniqueGenres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
        <button onClick={() => setGenre(null)}>all genres</button> */}
        <GenresFilter setGenre={setGenre} props={props} />
      </div>
    </div>
  )
}

const GenresFilter = ({ setGenre, props }) => {
  // Fetch genres and calculate uniqueGenres outside of Books component
  const booksResult = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  const genres = booksResult.data ? booksResult.data.allBooks.map(b => b.genres).flat() : []
  const uniqueGenres = [...new Set(genres)]

  return (
    <div>
      {uniqueGenres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}


export default Books
