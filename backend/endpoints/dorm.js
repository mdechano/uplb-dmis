const { DormController } = require('../controllers/index').controllers;
const Router = require('express').Router;

const Dorm = Router();

Dorm.post('/', DormController.addDorm);
Dorm.put('/:id', DormController.editDorm);
Dorm.delete('/', DormController.deleteDorm);
Dorm.get('/search', DormController.searchDorm);
Dorm.get('/:id', DormController.findDorm);
Dorm.get('/', DormController.findAll);

module.exports = Dorm; 