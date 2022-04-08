interface Metrics {
    h: number;
    w: number;
}

export const calculateBmi = (h: number, w: number)  => {

    const bmi = w / ((h / 100) ** 2);
    console.log(bmi);
    if (bmi < 18.5)
        return "underweight";
    else if (bmi < 25)
        return "healthy weight";
    else if (bmi < 30)
        return "overweight";
    else 
        return "obese";
};

export const parseArguments = (args: Array<string>): Metrics => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])) ) {
        return {
            h : Number(process.argv[2]),
            w : Number(process.argv[3])
        };
    } else {
        throw new Error("At least one value not a number");
    }
};

try {
    const {h, w} = parseArguments(process.argv);
    console.log(calculateBmi(h, w));
} catch (error: unknown) {
    let errorMessage = "Something went wrong! Error: ";
    if (error instanceof Error) {
        errorMessage += error.message;
        console.log(errorMessage);
    }
}



