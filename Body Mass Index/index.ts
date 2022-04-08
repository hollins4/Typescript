/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {
    
    const height = req.query.height;
    const weight = req.query.weight;

    try {
        if (!height || !weight)
            throw new Error("Missing height or weight");

        if (isNaN(Number(height)) || isNaN(Number(weight)))
            throw new Error("Height and/or weight is not a number");
        
        const bmi = calculateBmi(Number(height),Number(weight));
        res.json({ height, weight, bmi });
        
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.send(error.message);
    }
});

app.post('/exercises', (req,res) => {
    

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const daily_exercises: Array<string> = req.body.daily_exercises;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const target: number = req.body.target;

    try {
        if (!daily_exercises || !target) 
            throw new Error('Missing parameters');

        const hasOnlyNumber: boolean = daily_exercises.every(n => !isNaN(Number(n)));
        
        if (!hasOnlyNumber)
            throw new Error('No invalid exercise data');

        const exerciseResults = calculateExercises(daily_exercises.map(n => Number(n)), Number(target));
        res.send(exerciseResults);

    } catch(error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.send(error.message);
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

