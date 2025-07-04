import { NewPatientEntry, Gender } from "./types";
import { z } from 'zod';

export const NewEntrySchema = z.object({
    "name": z.string(),
    "dateOfBirth": z.string(),
    "ssn": z.string(),
    "gender": z.nativeEnum(Gender),
    "occupation": z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewEntrySchema.parse(object);
};






