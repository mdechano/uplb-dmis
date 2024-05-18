const { ReceiptController } = require('../controllers/index').controllers;
const Router = require('express').Router;

const Receipt = Router();

Receipt.post('/', ReceiptController.addReceipt);
Receipt.put('/:id', ReceiptController.editReceipt);
Receipt.delete('/', ReceiptController.deleteReceipt);
Receipt.get('/:id', ReceiptController.findReceipt);
Receipt.get('/', ReceiptController.findAll);


module.exports = Receipt; 
