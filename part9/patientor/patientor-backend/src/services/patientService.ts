import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatientEntry, Entry } from '../types';

import {v1 as uuid} from 'uuid';
const idForPatient = uuid();
const entries: Entry[] = []

const getPatients = ():Patient[] => {
  return patients;
};

const getNonSensitivePatientInfo = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => 
        ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        })
        )
}

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: idForPatient,
    entries,
    ...patient
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
}

const getPatientById = (id: string) => {
  return patients.find(patient => patient.id === id);
}


export default {
  getPatients,
  getNonSensitivePatientInfo,
  addPatient,
  getPatientById
};