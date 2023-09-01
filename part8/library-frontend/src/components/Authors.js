import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../queries'

const Authors = ( {show} ) => {

  const authorsResult = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (authorsResult.loading) {
    return <div>loading...</div>
  }

  const authors = authorsResult.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born? a.born : null}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
