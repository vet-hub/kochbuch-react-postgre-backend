const express = require('express');
const { body, validationResult } = require('express-validator');

// class to create modular, mountable route handlers. | "express.Router class" vs "Basic routing"
const userRouter = express.Router(); 

const {
  getUsers,
  getOneUser,
  putUser,
  postUser,
  deleteUser,
} = require('../controllers/users');

userRouter.get('/', getUsers);

userRouter.get('/:id', getOneUser);

userRouter.post(
  '/',
  body('firstname').isLength({ min: 2 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }
    next();
  },
  postUser
);

userRouter.delete('/:id', deleteUser);

userRouter.put('/:id', putUser);

module.exports = userRouter;		// for '/users' in server.js