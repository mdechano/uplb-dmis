const { AttendantController } = require('../controllers/index').controllers;
const Router = require('express').Router;

const Attendant = Router();

Attendant.post('/', AttendantController.addAttendant);
Attendant.put('/:id', AttendantController.editAttendant);
Attendant.delete('/', AttendantController.deleteAttendant);
Attendant.get('/search', AttendantController.searchAttendant);
Attendant.get('/:id', AttendantController.findAttendant);
Attendant.get('/', AttendantController.findAll);


module.exports = Attendant; 
