const Pool = require('pg').Pool
const dotenv = require('dotenv');
dotenv.config();

// save creds in .env 
const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT,
})

exports.addSales = (names, values) => {
    pool.query(`INSERT INTO sales (${names}) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`, values, (error, results) => {
        if (error) {
            throw error;
        }
        return true;
    });
};
