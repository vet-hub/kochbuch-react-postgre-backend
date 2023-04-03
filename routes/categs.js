const express = require('express');
const { body, validationResult } = require('express-validator');

// class to create modular, mountable route handlers. | "express.Router class" vs "Basic routing"
const categRouter = express.Router(); 

const {
  getCategs,
  getOneCateg,
  putCateg,
  postCateg,
  deleteCateg,
} = require('../controller/categs');

categRouter.get('/', getCategs);

categRouter.get('/:id', getOneCateg);

categRouter.post('/', postCateg);   // ? express-validator

categRouter.delete('/:id', deleteCateg);

categRouter.put('/:id', putCateg);

module.exports = categRouter;		// as '/api/categ' in server.js