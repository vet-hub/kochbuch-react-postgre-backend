const express = require('express');
const app = express();

require('dotenv').config();			// !!! for reading  .env
const port = process.env.PORT || 8080;
console.log('PORT', process.env.PORT);

app.get('/', (req, res) => {
	res.send('Hello World!');
})

app.listen(port, () => {
	console.log(`listening on port ${port}`);
})


app.get('/', (req, res) => {
	res.send('Hello World!')
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
	zur Transparenz - all users-routes - require from /routes/users <- middlewares - from /controller/  

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

const userRouter = require('./routes/users');
// users-routes 	- require from /routes/users 		<- middlewares - from /controller/users  
app.use('/api/users', userRouter);

const categRouter = require('./routes/categs');
// categs-routes 	- require from /routes/categs		<- middlewares - from /controller/categs  
app.use('/api/categs', categRouter);