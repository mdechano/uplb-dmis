const { ResidentController } = require('../controllers/index').controllers;
const Router = require('express').Router;

const Resident = Router();

Resident.post('/', ResidentController.addResident);
Resident.put('/:id', ResidentController.editResident);
Resident.delete('/', ResidentController.deleteResident);
Resident.get('/search', ResidentController.searchResident);
Resident.get('/:id', ResidentController.findResident);
Resident.get('/', ResidentController.findAll);


module.exports = Resident;