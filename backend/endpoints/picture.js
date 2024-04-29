const { PictureController } = require('../controllers/index').controllers;
const Router = require('express').Router;

// initialize User router
const Picture = Router();

// access controllers

Picture.post('/', PictureController.uploadImage);
Picture.get('/:id', PictureController.renderImage);


module.exports = Picture;