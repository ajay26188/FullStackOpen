import type { DiaryEntry } from "../types";

const Diaries = ({diaries}: {diaries:DiaryEntry[]}) => {
    return (
        <div>
            <h2>Diary entries</h2>
            {diaries.map(diary => (
                <div key ={diary.id}>
                    <p><strong>{diary.date}</strong></p>
                    <p>
                        visibility: {diary.visibility}
                    <br/>
                       weather: {diary.weather}
                    <br/>
                        comment: {diary.comment} 
                    </p>
                </div>
                
            ))}
            
        </div>
    )
}

export default Diaries;