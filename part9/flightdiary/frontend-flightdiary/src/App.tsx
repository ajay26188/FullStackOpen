import { useEffect, useState } from 'react'
import './App.css'
import Diaries from './components/Diaries'
import DiaryForm from './components/DiaryForm'

import type { DiaryEntry } from './types'
import { getAllDiaries } from './services/diaryService'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  },[])

  return (
    <>
      <DiaryForm diaries={diaries} setDiaries={setDiaries}/>
      <Diaries diaries={diaries}/>
    </>
  )
}

export default App
