import { ALL_BOOKS_BY_GENRE } from "../queries"
import { useQuery } from "@apollo/client"
import Buttons from "./Buttons"
import { useState } from "react"

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const { data, loading } = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre }
  })

  if (!props.show) return null
  if (loading) return <div>loading...</div>

  const books = data.allBooks

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <strong>{genre}</strong></p>}


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
      <Buttons setGenre={setGenre} />
    </div>
  )
}

export default Books
