export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface sickLeaveDetails {
    startDate: string,
    endDate: string
}

interface dischargeDetails {
    date: string,
    criteria: string
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    sickLeave?: sickLeaveDetails;
    employerName: string
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: dischargeDetails;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
    "id": string,
    "name": string,
    "dateOfBirth": string,
    "ssn": string,
    "gender": Gender,
    "occupation": string,
    "entries": Entry[]
}

export type NewPatientEntry = Omit<Patient, "id" | "entries">;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;