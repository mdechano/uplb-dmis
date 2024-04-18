const User = require('./endpoints/user');
const Resident = require('./endpoints/resident');
const Manager = require('./endpoints/manager');
const Dorm = require('./endpoints/dorm');
const Router = require('express').Router;

const router = Router();

router.use('/user', User); //localhost:3001/user
router.use('/resident', Resident);
router.use('/manager', Manager);
router.use('/dorm', Dorm);

module.exports = router;