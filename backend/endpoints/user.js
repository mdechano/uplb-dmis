const { UserController } = require('../controllers/index').controllers;
const Router = require('express').Router;

// initialize User router
const User = Router();

// access controller
User.post('/', UserController.login); 
User.put('/', UserController.changeRoleandDorm);
User.get('/check-if-logged-in', UserController.checkifloggedin);
User.get('/', UserController.findAll);
User.delete('/', UserController.logout);

module.exports = User;