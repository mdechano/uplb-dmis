const { DormController } = require('../controllers/index').controllers;
const Router = require('express').Router;

const Dorm = Router();

//Manager.post('/upload', ApplicantController.uploadImage);
Dorm.post('/', DormController.addManager);
Dorm.put('/:id', DormController.editManager);
Dorm.delete('/', DormController.deleteManager);
Dorm.get('/search', DormController.searchManager);
Dorm.get('/:id', DormController.findManager);
Dorm.get('/', DormController.findAll);


module.exports = Dorm; 
