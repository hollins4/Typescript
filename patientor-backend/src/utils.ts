import { Gender, NewPatientEntry, Entry } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name) )
        throw new Error("Incorrect or missing name");
    
    return name; 
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn))
        throw new Error("Incorrect or missing ssn");

    return ssn;
};

const parseOccupation = (occ: unknown): string => {
    if(!occ || !isString(occ))
        throw new Error("Incorrect or missing occupation");

    return occ;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error("Incorrect date or missing date: " + date);

    return date;  
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender))
        throw new Error("Incorrect gender selection or type");

    return gender;
};

const isArray = (text: unknown): text is Array<Entry> => {
    return text !== null && Array.isArray(text) && typeof text === "object";
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !isArray(entries))
        throw new Error("Incorrect or missing entries ");

    return entries;
};


type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown , gender: unknown , occupation: unknown, entries: unknown };

const toNewPatientEntry = (object: Fields): NewPatientEntry => {
    console.log("Object: ", object);
    const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };
    console.log("Object: ", newEntry);
    return newEntry;
};

export default toNewPatientEntry;

