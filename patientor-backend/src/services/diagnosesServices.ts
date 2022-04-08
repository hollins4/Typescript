import diagnosesList from "../../data/diagnoses";

import { DiagnosesEntry } from "../types";

const diagnoses: Array<DiagnosesEntry> = diagnosesList;

const getEntries = (): Array<DiagnosesEntry> => {
    return diagnoses;
};

const findById = (code: string): Array<DiagnosesEntry> | unknown => {
    const diagnosis = diagnoses.find(diagnosis => diagnosis.code = code);
    return diagnosis;
};

const addDiagnoses = () => {
    return null;
};

export default {
    getEntries,
    findById,
    addDiagnoses
};