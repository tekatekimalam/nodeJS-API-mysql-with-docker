import mysql from 'mysql'
import dotenv from 'mysql'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    limit: process.env.DB_LIMIT,
})

export default pool;