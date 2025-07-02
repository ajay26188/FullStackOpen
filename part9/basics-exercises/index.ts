import express from 'express';
const app = express();

app.use(express.json())

import {calculateBmi} from './bmiCalculator';
import {  calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const { weight, height } = req.query;
    
    if (!height || !weight) {
        res.send ({
            error: "parameters missing"
          });
    }
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        res.send ({
            error: "malformatted parameters"
          });
    }

    const parsedHeight = Number(height);
    const parsedWeight = Number(weight);

    const result = calculateBmi(parsedHeight, parsedWeight);
    res.send({
        weight,
        height,
        result
    });
});

app.post('/exercises', (req,res) => {
    //console.log(req.body)
    const {daily_exercises, target} = req.body;
    
    if (!daily_exercises || !target) {
        res.status(400).send({ error: 'parameters missing' });
      }
    
      if (
        !Array.isArray(daily_exercises) ||
        daily_exercises.some(d => typeof d !== 'number') ||
        typeof target !== 'number'
      ) {
        res.status(400).send({ error: 'malformatted parameters' });
      }

    const result = calculateExercises(target, daily_exercises)
    res.send(result)
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});