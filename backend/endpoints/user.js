const { UserController } = require('../controllers/index').controllers;
const Router = require('express').Router;

// initialize User router
const User = Router();

// access controller
User.post('/', UserController.login); 
User.put('/', UserController.changeRoleandDorm);
User.put('/change-resident-role/:id', UserController.changeResidentRole);
User.put('/change-completed-profile', UserController.changeCompletedProfile);
User.get('/check-if-logged-in', UserController.checkifloggedin);
User.get('/', UserController.findAll);
User.delete('/', UserController.logout);
User.delete('/delete-user', UserController.deleteUser);

module.exports = User;