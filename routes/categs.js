const express = require('express');
const { body, validationResult } = require('express-validator');

// class to create modular, mountable route handlers. | "express.Router class" vs "Basic routing"
const categRouter = express.Router(); 

const {
  getCategs,
  getOneCategResipes,
  getOneCateg,
  putCateg,
  postCateg,
  deleteCateg,
} = require('../controllers/categs');

categRouter.get('/', getCategs);

// categRouter.get('/:id', getOneCateg);

categRouter.get('/category/:cate_name', getOneCategResipes);

categRouter.post('/', postCateg);   // ? express-validator

categRouter.delete('/:id', deleteCateg);

categRouter.put('/:id', putCateg);

module.exports = categRouter;		// as '/categ' in server.js