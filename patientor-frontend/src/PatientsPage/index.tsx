/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import { Patient, Entry, HealthCheckEntry, /*HealthCheckRating*/ } from "../types";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
//import { HealthCheckOption } from "../AddPatientModal/FormField";
import { apiBaseUrl } from "../constants";
import { EntryDetails } from "./entry";
import AddEntryForm from "./AddEntryForm";
//import { Formik, Form, Field  } from 'formik';
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import Button from '@mui/material/Button';
//import { Grid } from "@material-ui/core";
//import { TextField, SelectField, DiagnosisSelection } from "../AddPatientModal/FormField";

type EntryFormValues = Omit<HealthCheckEntry, "id" | "type">;


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  openModal: () => void;
  closeModal: () => void;
  modalOpen: boolean;
}


const PatientsPage = () => {
    const { id }= useParams<{id: string}>();

    if (!id) 
        return null;

    const [{ patients }, dispatch] = useStateValue();
    const patient: Patient = patients[id];

    if (!patient.entries) {
        console.log('fetching');
        React.useEffect(() => {
    
            const fetchPatientList = async () => {
              try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { data: patientListFromApi } = await axios.get<Patient>(
                  `${apiBaseUrl}/patients/${id}`
                );
                dispatch(updatePatient(patientListFromApi));
              } catch (e) {
                console.error(e);
              }
            };
            void fetchPatientList();
        }, [dispatch]);
    }

  
    console.log('a run');

    return (
        <div>
            <div>
                <h1>{patient.name} 
                {patient.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
                </h1>
            </div>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <div>
              <h3>Entries</h3>
              <ul>
              {!patient.entries || patient.entries.length === 0
                ? <p>No Entries</p>
                : patient.entries.map( (entry: Entry, i: number) => {
                    
                    return (
                      <div key={i}>
                        <EntryDetails  entry={entry} />
                        <br />
                      </div>
                    );
                })   
              }
              </ul>
              </div>
              <NewEntryPage id={id}/>
        </div>
    );
};

const AddPatientModal = ({ modalOpen, onCancel, onSubmit, closeModal }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => closeModal()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      <AddEntryForm onSubmit={onSubmit} onCancel={onCancel} />
    </DialogContent>
  </Dialog>
);

export const NewEntryPage = ({ id }: { id: string }) => {

  const [ modalOpen, setModalOpen ] = useState<boolean>(false);
  const [, dispatch] = useStateValue();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const onSubmit = async (values: EntryFormValues) => {
    
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
    dispatch({ type: "ADD_ENTRY", payload: newEntry });
    setModalOpen(false);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if(axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        errorMessage = error.response.data.error;
      }
      console.log(errorMessage);
    }
  };
  
  const onCancel = (): void => {
    setModalOpen(false);
  };

  return (
    <div>
      <AddPatientModal 
        onSubmit={onSubmit} 
        onCancel={onCancel} 
        openModal={openModal} 
        closeModal={closeModal} 
        modalOpen={modalOpen}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientsPage;

