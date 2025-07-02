import { useParams } from "react-router-dom";
import type {  Diagnosis, Patient } from "../types"
import patientService from '../services/patients'
import { useEffect, useState } from "react";
import EntryView from "./EntryView";
import { Button } from "@mui/material";


const PatientView = ({diagnoses}: {diagnoses: Diagnosis[]}) => {
    const [patient, setPatient] = useState<Patient | null  >(null);

    const id = useParams().id;
    useEffect(() => {
        if (!id) return ;
        patientService.findById(id as string).then(data => setPatient(data));
    },[id])

    if (!patient) {
        return null;
    }
    //console.log(patient);
    //console.log(diagnoses)

    return (
        <div >
            <h2>{patient.name}</h2>
            <p>
                ssn: {patient.ssn}
            <br/>
                occupation: {patient.occupation}
            </p>
            <h3>entries</h3>

            {patient.entries.map(entry => (
                <EntryView key={entry.id} entry={entry} diagnoses={diagnoses} patient={patient}  />
                /*
                <div key={entry.id}>
                    <p>{entry.date} {entry.description}</p>
                    <ul>
                        {matchedDiagnoses.map(c => (
                        <li key={c.code}>{c.code} {c.name}</li>
                        ))}
                    </ul>
                </div>
                */
            ))}
            <Button variant="contained" color="primary">
            Add new entry
            </Button>
            
        </div>
    )
}

export default PatientView;