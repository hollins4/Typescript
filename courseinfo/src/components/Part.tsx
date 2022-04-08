import { CoursePart } from "../App"

type Part = {
    course: CoursePart
}

const Part = ({course}: Part) => {

    switch(course.type) {
        case "normal":
            return (
                <div>
                    <p>
                        <b>{course.name}</b> <br />
                        {course.description}    
                    </p>
                </div>
            )
        case "groupProject": 
            return (
                <div>
                    <p>
                        <b>{course.name}</b> <br />
                        project exercises: {course.groupProjectCount}
                    </p>
                </div>
            )
        case "submission":
            return (
                <div>
                    <p>
                        <b>{course.name}</b> <br />
                        submit to {course.exerciseSubmissionLink}
                    </p>
                </div>
            )
        case "special":
            return (
                <div>
                    <p>
                        <b>{course.name}</b> <br />
                        required skills:  {course.requirements.join(', ')}
                    </p>
                </div>
            )
        default:
            return course
    }

}

export default Part