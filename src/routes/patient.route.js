import express from "express";

import {
    createPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient,
} from "../controller/patient.controller.js";

const patientRoutes = express().route();

patientRoutes.route("/").get(getPatients).post(createPatient);

patientRoutes
    .route("/:id")
    .get(getPatient)
    .update(updatePatient)
    .delete(deletePatient);

export default patientRoutes;
