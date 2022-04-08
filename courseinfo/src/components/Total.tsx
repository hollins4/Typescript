interface coursePartProps {
    courseParts:  Array<coursePartsFields>,
}

type coursePartsFields = {
    name: string,
    exerciseCount: number
}

const Total = ({ courseParts } : coursePartProps) => {
    const coursePartsTotal: number = courseParts.reduce( (prev, curr) => prev + curr.exerciseCount, 0)
    return (
        <div>
            <p>Number of exercises: {coursePartsTotal}</p>
        </div>
    )
}

export default Total;