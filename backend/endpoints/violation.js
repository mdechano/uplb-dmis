const { ViolationController } = require('../controllers/index').controllers;
const Router = require('express').Router;

const Violation = Router();

Violation.post('/', ViolationController.addViolation);
Violation.put('/:id', ViolationController.editViolation);
Violation.delete('/', ViolationController.deleteViolation);
// Manager.get('/search', ViolationController.searchManager);
Violation.get('/:id', ViolationController.findViolation);
Violation.get('/', ViolationController.findAll);


module.exports = Violation; 
