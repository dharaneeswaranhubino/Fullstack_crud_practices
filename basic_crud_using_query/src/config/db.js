const mysql = require("mysql2/promise");
require("dotenv").config();

const mySqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS_KEY,
  database: process.env.DB_NAME,
});

module.exports = mySqlPool;
