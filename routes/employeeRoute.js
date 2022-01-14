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
router.get(
  '/signout',
  passport.checkAuthentication,
  employeeController.signout
);

// ADMIN routes
router.get(
  '/admin/assignReview',
  passport.checkAuthentication,
  passport.checkAdmin,
  employeeController.assignReview
);

module.exports = router;
