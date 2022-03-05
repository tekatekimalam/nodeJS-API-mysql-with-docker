import database from "../config/db.config.js";
import Response from "../domain/response.js";
import QUERY from "../query/patient.query.js";
import logger from "../util/logger.js";

const httpStatus = {
    OK: { code: 200, status: "OK" },
    CREATED: { code: 201, status: "CREATED" },
    NO_CONTENT: { code: 204, status: "NO_CONTENT" },
    BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
    NOT_FOUND: { code: 404, status: "NOT_FOUND" },
    INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

export const getPatients = (req, res) => {
    database.query(QUERY.SELECT_PATIENTS, (error, result) => {
        if (!result) {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `No patient found`
                )
            );
        } else {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `Patient retrieved`,
                    { patients: results }
                )
            );
        }
    });
};

export const createPatient = (req, res) => {
    database.query(
        QUERY.CREATE_PATIENT,
        Object.values(req.body),
        (error, result) => {
            if (!result) {
                res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
                    new Response(
                        httpStatus.INTERNAL_SERVER_ERROR.code,
                        httpStatus.INTERNAL_SERVER_ERROR.status,
                        `Error occurd`
                    )
                );
            } else {
                const patient = {
                    id: results.InsertedId,
                    ...req.body,
                    created_at: new Date(),
                };
                res.status(httpStatus.OK.code).send(
                    new Response(
                        httpStatus.CREATED.code,
                        httpStatus.CREATED.status,
                        `Patient created`,
                        { patients }
                    )
                );
            }
        }
    );
};

export const getPatient = (req, res) => {
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, result) => {
        if (!result[0]) {
            res.status(httpStatus.NOT_FOUND.code).send(
                new Response(
                    httpStatus.NOT_FOUND.code,
                    httpStatus.NOT_FOUND.status,
                    `Patient not found`
                )
            );
        } else {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `Patient retrieved`,
                    result[0]
                )
            );
        }
    });
};

export const updatePatient = (req, res) => {
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, result) => {
        if (!result[0]) {
            res.status(httpStatus.NOT_FOUND.code).send(
                new Response(
                    httpStatus.NOT_FOUND.code,
                    httpStatus.NOT_FOUND.status,
                    `Patient not found`
                )
            );
        } else {
            database.query(
                QUERY.UPDATE_PATIENT,
                [...Object.values(req.body), req.params.id],
                (error, result) => {
                    if (!error) {
                        res.status(httpStatus.OK.code).send(
                            new Response(
                                httpStatus.OK.code,
                                httpStatus.OK.status,
                                `Patient updated`,
                                { id: req.params.id, ...req.body }
                            )
                        );
                    } else {
                        res.status(httpStatus.NOT_FOUND.code).send(
                            new Response(
                                httpStatus.INTERNAL_SERVER_ERROR.code,
                                httpStatus.INTERNAL_SERVER_ERROR.status,
                                `Patient not found`
                            )
                        );
                    }
                }
            );
        }
    });
};

export default httpStatus;
