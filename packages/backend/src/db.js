const Pool = require("pg").Pool;

const db = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOSTNAME,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT),
  ssl: !!process.env.POSTGRES_SSL,
});

module.exports = {
  db,
};
