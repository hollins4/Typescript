import express from 'express';
import { calculator } from './calculator';
const app = express();

app.use(express.json())

app.get('/ping', (_req, res) => {
    res.send('pong');
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

app.post('/calculate', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
    const { value1, value2, op } = req.body;
  
    if ( !value1 || isNaN(Number(value1))) {
        return res.send({ error: '...'}).status(400);
    }
    
    // more validations here...

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculator(value1, value2, op);
    return res.send(result);
  });

