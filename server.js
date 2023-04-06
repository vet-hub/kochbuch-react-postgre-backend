const express = require('express');
const app = express();
var cors = require('cors');

require('dotenv').config();			// !!! for reading  .env
const port = process.env.PORT || 8080;
console.log('PORT', process.env.PORT);

app.use(cors());		// Enable All CORS Requests

app.listen(port, () => {
	console.log(`listening on port ${port}`);
})


/* 
	express.Router  vs 	Basic routing
	https://expressjs.com/en/guide/routing.html
	Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

	The app will now be able to handle requests to /api and /api/user, as well as call the timeLog middleware function that is specific to the route. 

const userRouter = require("./user_router")			// my router.js
app.use("/api", userRouter)								// by /api -> router

*/

/* 
	understanding - all users-routes - require from /routes/users <- middlewares - from /controller/users  
*/

/*
	app.get('/users', async (req, res) => {
		try {
			// await is only valid in async functions
			const { rows } = await pool.query('SELECT * from users');
			res.json({ data: rows });
		} catch (err) {
			console.log(err.message);
			res.sendStatus(500);
		}
		// res.json({ message: 'all users' });
		// res.send(`Hello ${req.url}`)
	})
*/


const pool = require('./dbclient');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const categRouter = require('./routes/categs');

/* 
app.get('/', (req, res) => {
	res.send('from app.get('/') Hello World!')
})

// Why do we have to put api in front of routes?
app.use('/api/users', userRouter);

*/


// home page redirect
app.use('/', indexRouter);

// users-routes 	- require from /routes/users 		<- middlewares - from /controller/users  
app.use('/users', userRouter);

// categs-routes 	- require from /routes/categs		<- middlewares - from /controller/categs  
app.use('/categs', categRouter);

app.use((req, res, next) => {
	res.status(404).send("Sorry can't find that!")
 })