const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const employeeRoute = require('./employeeRoute');
const adminRoute = require('./adminRoutes');

router.get('/', homeController.home);
router.use('/employee', employeeRoute);
router.use('/admin', adminRoute);
module.exports = router;
