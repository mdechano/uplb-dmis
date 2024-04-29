const User = require('./endpoints/user');
const Resident = require('./endpoints/resident');
const Manager = require('./endpoints/manager');
const Attendant = require('./endpoints/attendant');
const Dorm = require('./endpoints/dorm');
const Picture = require('./endpoints/picture')
const Router = require('express').Router;

const router = Router();

router.use('/user', User); //localhost:3001/user
router.use('/resident', Resident);
router.use('/manager', Manager);
router.use('/attendant', Attendant);
router.use('/dorm', Dorm);
router.use('/picture', Picture);

module.exports = router;