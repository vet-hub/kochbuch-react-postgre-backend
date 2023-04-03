const {Pool} = require("pg")


// require('dotenv').config();		in server.js for reading  .env
const {PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT} = process.env;

const pool = new Pool({
	user: PGUSER,
	host: PGHOST,
	database: PGDATABASE,
	password: PGPASSWORD,
	port: PGPORT
});

// OR ...?
// const {PGCONNECTIONSTRING} = process.env
// const pool = new Pool({	PGCONNECTIONSTRING })

// OR ...
/* 
const pool = new Pool({
	PGUSER,
	PGPASSWORD,
	PGDATABSE,
	PGPORT,
	PGHOST,
 });
 */

 module.exports = pool;
