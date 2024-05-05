const { PictureController } = require('../controllers/index').controllers;
const Router = require('express').Router;

// initialize User router
const Picture = Router();

// access controllers

Picture.post('/', PictureController.uploadImage);
Picture.get('/render-image', PictureController.renderImage);


module.exports = Picture;