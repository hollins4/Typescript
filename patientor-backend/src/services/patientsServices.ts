/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import patients from "../../data/patients";
import { v1 as uuid } from "uuid";
import { Patients, NewPatientEntry, PublicPatient, Entry } from "../types";

const getEntries = (): Patients[] => {
    return patients;
};

const findById = (id: string): Patients | undefined => {
    const entry = patients.find(d => d.id === id);
    return entry;
  };

const getNonSensitiveEntries = (): PublicPatient[] => {
    return patients.map( ({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const savePatient = (entries: NewPatientEntry): Patients => {
    const id: string = uuid();

    const newPatient = {
        id: id,
        ...entries
    };
    patients.push(newPatient);
    return newPatient;
};

const saveEntry2 = (id: string, entry: Entry): Patients | undefined => {
    const patient = patients.find(p => p.id === id);

    if (patient)
        patient.entries.push(entry);

    return patient;
};

export default { getEntries, getNonSensitiveEntries, savePatient, saveEntry2, findById };

