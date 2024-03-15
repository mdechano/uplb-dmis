const User = require('./endpoints/user');
const Router = require('express').Router;

const router = Router();

router.use('/user', User); //localhost:3001/user

module.exports = router;