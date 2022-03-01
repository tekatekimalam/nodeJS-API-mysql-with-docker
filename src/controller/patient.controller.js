import database from "../config/db.config.js";
import Response from "../domain/response.js";
import QUERY from "../query/patient.query.js";
import logger from "../util/logger.js";

const httpResponse = {
    OK: { code: 200, status: "OK" },
    CREATED: { code: 201, status: "CREATED" },
    NO_CONTENT: { code: 204, status: "NO_CONTENT" },
    BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
    NOT_FOUND: { code: 404, status: "NOT_FOUND" },
    INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

export default httpResponse;
