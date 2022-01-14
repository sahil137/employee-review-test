const express = require('express');
const router = express.Router();
const passport = require('passport');
const employeeController = require('../controllers/employeeController');

router.get('/signup', employeeController.signUp);
router.get('/signin', employeeController.signIn);

router.post('/create', employeeController.createEmployee);
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/users/login' }),
  employeeController.createSession
);

module.exports = router;
