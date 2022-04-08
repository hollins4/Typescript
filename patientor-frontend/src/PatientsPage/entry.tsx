import { Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import Card from '@mui/material/Card';



const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  
export const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

    switch(entry.type) {
        case "Hospital":
            return <HospitalEntryComponent entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryComponent entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntryComponent entry={entry} />;
        default:
            return assertNever(entry);
    }
};

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <Card>
            <div>{entry.date} <MedicalServicesIcon /></div>
            <div>{entry.description}</div>
            <FavoriteIcon />
            <div>{entry.discharge.criteria}</div>
            <div>{entry.discharge.date}</div>
            {!entry.diagnosisCodes 
                ? null 
                : <DiagnosisCodes dCodes={entry.diagnosisCodes} />
            }
        </Card>
    );
};

const OccupationalHealthcareEntryComponent: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
        <Card>
            <div>{entry.date} <WorkIcon /></div>
            <div>{entry.description}</div>
            <div>{entry.employerName}</div>
            <div>{entry.type}</div>
            {!entry.diagnosisCodes 
                ? null 
                : <DiagnosisCodes dCodes={entry.diagnosisCodes} />
            }
        </Card>
    );
};

const HealthCheckEntryComponent: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
        <Card>
            <div>{entry.date} <HealthAndSafetyIcon /></div>
            <div>{entry.description}</div>
            <FavoriteIcon />
            <div>{entry.healthCheckRating}</div>
            <div>{entry.type}</div>
            {!entry.diagnosisCodes 
                ? null 
                : <DiagnosisCodes dCodes={entry.diagnosisCodes} />
            }
        </Card>
    );
};


const DiagnosisCodes: React.FC<{ dCodes: string[] }> = ({ dCodes }) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <div>
            <h4>Diagnoses Codes</h4>
            {!dCodes
                ? null 
                : dCodes.map( (code: string, i: number) => {
                    return <div key={i}>{code} - {diagnoses[code].name}</div>;
            })}
        </div>
    );
};




