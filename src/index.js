import express from "express";
import ip from 'ip'
import dotenv from 'dotenv'
import cors from 'cors'

// Untuk meload seluruh environment variabel yang kita punya
dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()

// Middleware
app.use(cors( {origin: '*'}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send({message: 'UP'})
})

app.listen(PORT, () => console.log(`Server running on: ${ip.address()}:${PORT}`))