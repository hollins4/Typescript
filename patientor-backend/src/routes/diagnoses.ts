import express from "express";
import diagnoses from "../services/diagnosesServices";

const router = express.Router();

router.get("/", (_req,res) => {
    //console.log(diagnoses.getEntries);
    res.send(diagnoses.getEntries());
});

router.get("/:code", (req,res) => {
    const code = req.params.code;
    const diagnosis = diagnoses.findById(code);
    if (diagnoses)
        res.send(diagnosis);
    else
        res.sendStatus(404);
});


router.post("/", (_req, res) => {
    res.send("Saving a diagnoses");
});

export default router;