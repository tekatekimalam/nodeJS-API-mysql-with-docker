import express from "express";
import ip from 'ip'
import dotenv from 'dotenv'
import cors from 'cors'
import Response from "./domain/response.js";

// Untuk meload seluruh environment variabel yang kita punya
dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()

// Middleware
app.use(cors( {origin: '*'}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send(new Response(200, "OK", "Patient API v 1.0.0", {"data": { "patient": {"name": "Junior"}}}))
})

app.listen(PORT, () => console.log(`Server running on: ${ip.address()}:${PORT}`)) 