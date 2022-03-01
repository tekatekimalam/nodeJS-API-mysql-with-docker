import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";
import Response from "./domain/response.js";
import logger from "./util/logger.js";

// Untuk meload seluruh environment variabel yang kita punya
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(new Response(200, "OK", "Patient API v 1.0.0"));
});

app.listen(PORT, () =>
    logger.info(`Server running on: ${ip.address()}:${PORT}`)
);

// https://www.youtube.com/watch?v=_JNTTgRDyBQ&t=1230s&ab_channel=GetArrays 42:25
