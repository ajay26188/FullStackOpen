import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Recommendation = (props) => {
    const result = useQuery(ALL_BOOKS)
  
    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const books = result.data.allBooks.filter(book => book.genres.includes(props.recommendation))
    return (
        <div>
            <h2>recommendations</h2>
            <p>in genre <strong>{props.recommendation}</strong></p>

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
        </div>
    )
}

export default Recommendation