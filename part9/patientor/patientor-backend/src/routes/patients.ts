import express, {Request, Response, NextFunction} from 'express';
import patientService from '../services/patientService';
import { NewEntrySchema } from '../utils';
import {z} from 'zod';
import { NewPatientEntry, Patient } from '../types';

const router = express.Router();

router.get('/',(_req,res) => {
    res.send(patientService.getNonSensitivePatientInfo())
})

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
    try {
      NewEntrySchema.parse(req.body);
      console.log(req.body);
      next();
    } catch (error: unknown) {
      next(error);
    }
};
  
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
});

router.get('/:id', (req,res) => {
  const id: string = req.params.id;
  const patient = patientService.getPatientById(id);
  res.json(patient)
});

router.use(errorMiddleware);

export default router;