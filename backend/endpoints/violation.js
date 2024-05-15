const { ViolationController } = require('../controllers/index').controllers;
const Router = require('express').Router;

const Violation = Router();

Violation.post('/', ViolationController.addViolation);
Violation.put('/:id', ViolationController.editViolation);
Violation.delete('/', ViolationController.deleteViolation);
Violation.get('/:id', ViolationController.findViolation);
Violation.get('/', ViolationController.findAll);


module.exports = Violation; 
