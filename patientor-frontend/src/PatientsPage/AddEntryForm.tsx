import React from "react";
import { Grid } from "@material-ui/core";
import { TextField, SelectField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { HealthCheckOption, EntryType } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Formik, Form, Field } from 'formik';
import Button from '@mui/material/Button';



type EntryFormValues = Omit<HealthCheckEntry, "id" | "type">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}
  
  
const healthCheckOptions: HealthCheckOption[] = [
    { value: HealthCheckRating.Healthy, label: HealthCheckRating[0] },
    { value: HealthCheckRating.LowRisk, label: HealthCheckRating[1] },
    { value: HealthCheckRating.HighRisk, label: HealthCheckRating[2] },
    { value: HealthCheckRating.CriticalRisk, label: HealthCheckRating[3] }
];


const entryTypeOptions: EntryType[] = [
  { value: "Hospital", label: "Hospital Entry"},
  { value: "OccupationalHealthcare", label: "Occupational Healthcare Entry"},
  { value: "HealthCheck", label: "Health Check Entry"}
];
  

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();


    return (
      <Formik
        initialValues={{
          description: "",
          date: "",
          specialist: "",
          diagnosisCodes: [],
          healthCheckRating: HealthCheckRating.LowRisk,
          type: "HealthCheck",
          employerName: "",
          discharge: {
            date: "",
            criteria: ""
          },
          sickLeave: {
            date: "",
            criteria: ""
          }
          
          //'discharge.date': "",
          //'discharge.criteria': "",
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const invalidDataFormatError = "Invalid date format";
          const errors: { [field: string]: string } = {};
          const isDate = (date: string): boolean => {
            return Boolean(Date.parse(date));
          };
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          } else if (!isDate(values.date)) {
            errors.date = invalidDataFormatError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.diagnosisCodes) {
            errors.diagnosisCodes = requiredError;
          }
          if (!values.discharge.date && values.type === "Hospital") {
            errors["discharge.date"] = requiredError;
          } else if (!isDate(values.discharge.date) && values.type === "Hospital") {
            errors["discharge.date"] = invalidDataFormatError;
          }
          if (!values.discharge.criteria && values.type === "Hospital") {
            errors["discharge.criteria"] = requiredError;
          }
          if (!values.employerName && values.type === "OccupationalHealthcare") {
            errors.employerName = requiredError;
          }  
          if (values.healthCheckRating > 3 || values.healthCheckRating < 0) {
            errors.healthCheckRating = requiredError;
          }
          console.log(errors);
          return errors;
        }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        
        return (
          <Form className="form ui">
            <SelectField label="Entry Type" name="type" options={entryTypeOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            { values.type === "HealthCheck"
             ? <SelectField label="Health Check Rating" name="healthCheckRating" options={healthCheckOptions} />
             : null
            }
            {values.type === "Hospital"
             ? <div>
                <label >Discharge</label>
                <Field label="Date" placeholder="YYYY-MM-DD" name='discharge.date' component={TextField} />
                <Field label="Criteria" placeholder="Criteria" name='discharge.criteria' component={TextField} />
               </div>          
             : null
            }
            {values.type === "OccupationalHealthcare"

             ? <div>
                <Field label="Employer Name" placeholder="Employer Name" name="employerName" component={TextField} />
                <div>
                  <label >Sick Leave</label>
                  <Field label="Start Date" placeholder="YYYY-MM-DD" name="sickLeave.startDate" component={TextField} />
                  <Field label="End Date" placeholder="YYYY-MM-DD" name="sickLeave.endDate" component={TextField} />
                </div>
               </div>          
             : null
            }
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    );
  };

export default AddEntryForm;