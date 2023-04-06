const express = require('express');
// class to create modular, mountable route handlers. | "express.Router class" vs "Basic routing"
const indexRouter = express.Router(); 

// GET home page.
indexRouter.get('/', function(req, res) {
	console.log('home redirect to /category');
	// res.redirect('/category');
	// res.redirect('/category/top-bewertet');
	res.redirect('/categs/category/1');
 });

 module.exports = indexRouter;		// as '/' homepage in server.js