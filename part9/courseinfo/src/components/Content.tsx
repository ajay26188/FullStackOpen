import Part from "./Part";
import type { CoursePart } from "../types";

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
    return (
        <div>
            {courseParts.map(course => (
                <Part key={course.name} course={course}/>
            ) 
            )}
        </div>
    )
}

export default Content;