/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patients from "../services/patientsServices";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patients.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    const patient = patients.findById(id);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post("/", (req,res) => {
    try {
        const patientEntryData = req.body;
        patientEntryData.entries = [];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = toNewPatientEntry(patientEntryData);
        const addedEntry = patients.savePatient(newPatientEntry);
        res.json(addedEntry);

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.send("Something went wrong: " + error.message);
        }
    }
});

router.post("/:id/entries", (req,res) => {
    console.log('Entry request was received');
    const id = req.params.id;
    const patient = patients.findById(id);

    if (patient) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const savedEntry = patients.saveEntry2(id, req.body);
        res.send(savedEntry);
    }
    else
        res.sendStatus(404);
});

export default router;
