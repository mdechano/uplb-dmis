const { PictureController } = require('../controllers/index').controllers;
const Router = require('express').Router;

// initialize User router
const Picture = Router();

// access controllers

Picture.post('/', PictureController.uploadImage);
Picture.get('/', PictureController.renderImages);
Picture.put('/:id', PictureController.renderImage);

module.exports = Picture;