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

exports.dropSalesTable = () => {
    const salesDropQuery = `DROP TABLE IF EXISTS sales`;

    pool.query(salesDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

exports.createSalesTable = () => {
    const salesCreateQuery = `CREATE TABLE sales
  	(
  		ID SERIAL PRIMARY KEY,
	    Region VARCHAR(200),
	    Country VARCHAR(200),
	    Item_Type VARCHAR(255),
	    Sales_Channel VARCHAR(50),
	    Order_Priority VARCHAR(5),
	    Order_Date DATE,
	    Order_ID BIGINT,
	    Ship_Date DATE,
	    Units_Sold INT,
	    Unit_Price REAL,
	    Unit_Cost REAL,
	    Total_Revenue DOUBLE PRECISION,
	    Total_Cost DOUBLE PRECISION,
	    Total_Profit DOUBLE PRECISION
    )`;

    pool.query(salesCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
