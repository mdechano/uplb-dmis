const { PaymentController } = require('../controllers/index').controllers;
const Router = require('express').Router;

const Payment = Router();

Payment.post('/', PaymentController.addPayment);
Payment.put('/:id', PaymentController.editPayment);
Payment.delete('/', PaymentController.deletePayment);
Payment.get('/:id', PaymentController.findPayment);
Payment.get('/', PaymentController.findAll);


module.exports = Payment; 
