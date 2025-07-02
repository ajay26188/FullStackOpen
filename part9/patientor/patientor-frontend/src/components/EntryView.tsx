import type { Diagnosis, Entry, Patient } from "../types";

import { Card, CardContent, Typography, List, ListItem } from "@mui/material";

interface Props {
    entry: Entry,
    diagnoses: Diagnosis[],
    patient: Patient
}

const EntryView = ({entry, diagnoses, patient}: Props) => {
    const diagnosisCodes = patient.entries[0]?.diagnosisCodes
    ? [...patient.entries[0].diagnosisCodes]
    : [];

    //console.log(diagnosisCodes)

    const matchedDiagnoses: Diagnosis[] = diagnosisCodes.length > 0
    ? diagnoses.filter(d => diagnosisCodes.includes(d.code))
    : [];
    /**
     * Helper function for exhaustive type checking
     */
    const assertNever = (value: never): never => {
        throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    const renderCommonContent = () => (
        <>
          <Typography variant="subtitle2">{entry.date}</Typography>
          <Typography variant="body2">{entry.description}</Typography>
          {diagnosisCodes.length > 0 && (
            <List dense>
              {matchedDiagnoses.map(c => (
                <ListItem key={c.code} sx={{ pl: 2 }}>
                  {c.code} – {c.name}
                </ListItem>
              ))}
            </List>
          )}
        </>
    );

    const renderEntry = () => {
        switch (entry.type) {
            case "OccupationalHealthcare":
                return (
                    <>
                      {renderCommonContent()}
                      <Typography variant="body2">Employer: {entry.employerName}</Typography>
                      {entry.sickLeave && (
                        <Typography variant="body2">
                          Sick Leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
                        </Typography>
                      )}
                    </>
                  );
        
                case "HealthCheck":
                    return (
                        <>
                          {renderCommonContent()}
                          <Typography variant="body2">Health Rating: {entry.healthCheckRating}</Typography>
                        </>
                      );
                
        
                case "Hospital":
                    return (
                        <>
                          {renderCommonContent()}
                          <Typography variant="body2">
                            Discharge on {entry.discharge.date}: {entry.discharge.criteria}
                          </Typography>
                        </>
                      );
        
            default:
                return assertNever(entry);
        }
    } 
    

    return (
        <>
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                {renderEntry()}
            </CardContent>
        </Card>
        </>
        
        
    )
}

export default EntryView;