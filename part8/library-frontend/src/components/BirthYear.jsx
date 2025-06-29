import { useState } from "react"
import { ALL_AUTHORS, SET_BIRTH_YEAR } from "../queries"
import { useMutation } from "@apollo/client"
import Select from 'react-select'

const BirthYear = ({authors}) => {
    const [selectedOption, setSelectedOption] = useState(null)
    const [born, setBorn] = useState('')

    const [updateAuthor] = useMutation(SET_BIRTH_YEAR, {
        refetchQueries: [{query: ALL_AUTHORS}]
    })

    const handleBirthYear = (event) => {
        event.preventDefault()

        if (!selectedOption) return

        updateAuthor({variables: {
            name: selectedOption.value,
            setBornTo: Number(born)
        }})

        setSelectedOption(null)
        setBorn('')
    
    }

    const filterAuthors = authors.filter(author => author.born === null)
    const options = filterAuthors.map(author => ({
        value: author.name,
        label: author.name
    }))

    return (
        <div>
            <h2>Set birthyear</h2>
        <form onSubmit={handleBirthYear}>
            <div>
                <Select 
                options={options}
                value={selectedOption}
                onChange={setSelectedOption}
                />
            </div>
            <div>
                born
                <input 
                    type="number"
                    value= {born}
                    onChange={({target}) => setBorn(target.value)}
                />
            </div>
            <button type="submit">update author</button>
        </form>
        </div>
    )
}

export default BirthYear