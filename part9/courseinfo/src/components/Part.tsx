import type { CoursePart } from "../types";

const Part = ({course}: {course: CoursePart}) => {
    /**
     * Helper function for exhaustive type checking
     */
    const assertNever = (value: never): never => {
        throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    let content;
    switch (course.kind) {
    case "basic":
        content = <div>
            <p><strong>{course.name} {course.exerciseCount}</strong>
            <br/>
            <em>{course.description}</em>
            </p>
            </div>
        break;

        case "group":
        content = <div>
            <p><strong>{course.name} {course.exerciseCount}</strong> 
            <br/>
            project exercises {course.groupProjectCount}
            </p>
            </div>
        break;

        case "background":
        content = <div>
            <p><strong>{course.name} {course.exerciseCount}</strong>
            <br/>
            <em>{course.description}</em>
            <br/>
            submit to {course.backgroundMaterial}
            </p>
            </div>
        break;

        case "special":
        content = <div>
            <p><strong>{course.name} {course.exerciseCount}</strong>
            <br/>
            <em>{course.description}</em>
            <br/>
            required skills: {course.requirements.join(', ')}
            </p>
            </div>
        break;

    default:
        return assertNever(course);
}

    return (
        <div>
            {content}
        </div>
    )
}

export default Part;