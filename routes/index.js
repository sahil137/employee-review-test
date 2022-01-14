const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const employeeRoute = require('./employeeRoute');

router.get('/', homeController.home);
router.use('/employee', employeeRoute);
module.exports = router;
