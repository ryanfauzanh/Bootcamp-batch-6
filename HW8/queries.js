const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "countries",
  password: "040499",
  port: 5433,
});

module.exports = pool;
