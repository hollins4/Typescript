import { CoursePart } from '../App';
import Part from "./Part";

interface coursePartProps {
    courseParts: CoursePart[]
}

//let indexValue: number = Math.round(Math.random() * 5)
//indexValue++;

const Content = ({ courseParts }: coursePartProps) => {
    return (
        <div>
            {courseParts.map( (course, index) => {
                    return <Part key={index} course={course} />
                })}

        </div>
    )
}
//<div key={indexValue}>{course.name}</div>
export default Content;