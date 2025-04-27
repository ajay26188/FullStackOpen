import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0)) //crreating a zer-filled array of desired length

  const generateRandomNum = () => {
    //this will generate random numbers between
    //0 to 7 . 7 inclusive
    const randomNum = Math.floor((Math.random()*8))
    setSelected(randomNum)
  }

  const voteCount = () => {
    const copyVoteCount = [...votes]
    copyVoteCount[selected] += 1
    //console.log(copyVoteCount)
    setVotes(copyVoteCount)

    console.log(votes)
  }

  //finding the maximum element from an array
  const highestVote = Math.max(...votes)
  //finding the index of an element in array
  const highestVoteIndex = votes.indexOf(highestVote)
  console.log(highestVoteIndex)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <button onClick={voteCount}>vote</button>
      <button onClick={generateRandomNum}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {anecdotes[highestVoteIndex]}
      <br />
      has {highestVote} votes
      
    </div>
  )
}

export default App