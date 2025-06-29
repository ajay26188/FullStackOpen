const Buttons = ({setGenre}) => {
    return (
        <div>
            <button onClick={() => setGenre('refactoring')}>refactoring</button>
            <button onClick={() => setGenre('agile')}>agile</button>
            <button onClick={() => setGenre('patterns')}>patterns</button>
            <button onClick={() => setGenre('design')}>design</button>
            <button onClick={() => setGenre('crime')}>crime</button>
            <button onClick={() => setGenre('classic')}>classic</button>
            <button onClick={() => setGenre(null)}>all genres</button>
        </div>
    )
}

export default Buttons