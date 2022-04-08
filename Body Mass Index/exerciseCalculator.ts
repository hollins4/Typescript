interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
  }

const parseArgumentsCalculator = (args: Array<string>) => {
    if (args.length < 4) throw new Error('Too few arguments have been provided');

    const valuesArray = args.splice(2);
    
    const hasOnlyNumber = valuesArray.every(arg => !isNaN(Number(arg)));
    
    if (!hasOnlyNumber) {
        throw new Error ('At least one value not a number');
    }
    
    return [...valuesArray.map(i => Number(i))];
};

export const calculateExercises = (array: Array<number>, targetValue: number): Result => {

    const average = array.reduce((a,b) => (a + b), 0) / array.length;
    const target = targetValue;
    let ratingDescription;
    
    if (average <= target - 1) 
        ratingDescription = "Poor effort, please try harder";
    else if (average <= target)
        ratingDescription = "Not too bad but could be better";
    else if (average > target)
        ratingDescription = "Goals have been met";
    else 
        ratingDescription = "Congratulations on exeeding expectations";

    const results = {
        periodLength: array.length,
        trainingDays: array.filter(day => day > 0).length,
        success: average >= target,
        rating: Math.round(average),
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };

    return results;
};

try {
    const exerciseArray = parseArgumentsCalculator(process.argv);
    console.log(calculateExercises(exerciseArray, 2));
    
} catch (error) {
    let errorMessage = "Something went wrong, Error: ";
    if (error instanceof Error) {
        errorMessage += error.message;
        console.log(errorMessage);
    }
    
}


