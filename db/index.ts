import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: "root",
  password: process.env.DB_PS,
  database: "next-app",
  port:3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool
