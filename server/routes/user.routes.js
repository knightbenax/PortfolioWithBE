// const router = require('express').Router();
const users = require('../controllers/user.controller');

// // Retrieve all users
// router.get('/', users.findAll);

// // Retrieve a single user with id
// router.get('/:id', users.findOne);

// // Create a new user
// router.post('/', users.create);

// // Update a user with id
// router.put('/:id', users.update);

// // Delete a user with id
// router.delete('/:id', users.delete);

// // Delete all users
// router.delete('/', users.deleteAll);

const express = require('express');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

router.route('/api/users')
  .get(userCtrl.findAll) 
  .post(userCtrl.create);

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.findOne) 
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.delete); 

router.param('userId', userCtrl.findOne); 

module.exports = router;