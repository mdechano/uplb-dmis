const { ManagerController } = require('../controllers/index').controllers;
const Router = require('express').Router;

const Manager = Router();

//Manager.post('/upload', ApplicantController.uploadImage);
Manager.post('/', ManagerController.addManager);
Manager.put('/:id', ManagerController.editManager);
Manager.delete('/', ManagerController.deleteManager);
Manager.get('/search', ManagerController.searchManager);
Manager.get('/:id', ManagerController.findManager);
Manager.get('/', ManagerController.findAll);


module.exports = Manager; 
