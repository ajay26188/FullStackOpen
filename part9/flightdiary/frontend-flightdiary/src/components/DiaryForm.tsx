import { useState } from "react";
import { createDiary } from "../services/diaryService";
import { Weather, type DiaryEntry, type NewDiaryEntry, Visibility } from "../types";
import Notify from './Notify';
import axios from 'axios';

interface Props {
  diaries: DiaryEntry[],
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const DiaryForm = ({diaries, setDiaries}: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility | ''>('');
  const [weather, setWeather] = useState<Weather | ''>('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
       const newDiary = await createDiary({
        date,
        visibility,
        weather,
        comment
      } as NewDiaryEntry);

      diaries = diaries.concat(newDiary);
      setDiaries(diaries);

      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
      setErrorMessage('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (typeof error.response?.data === 'string') {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage('Unknown Axios error');
        }
      } else {
        setErrorMessage('Unknown error occurred');
      }
      setTimeout(() => setErrorMessage(''), 10000);
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={diaryCreation}>
        <div>
          date <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
        </div>

        <div>
          visibility 
          {Object.values(Visibility).map(v => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>

        <div>
          weather
          {Object.values(Weather).map(w => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>

        <div>
          comment <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
