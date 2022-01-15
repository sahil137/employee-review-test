const express = require('express');
const router = express.Router();
const passport = require('passport');
const employeeController = require('../controllers/employeeController');

router.get('/signup', employeeController.signUp);
router.get('/signin', employeeController.signIn);

router.post('/create', employeeController.createEmployee);
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/employee/signin' }),
  employeeController.createSession
);
router.get(
  '/signout',
  passport.checkAuthentication,
  employeeController.signout
);

// --------------ADMIN ROUTES ------------------//

// render assign review page
router.get(
  '/admin/assign-review',
  passport.checkAuthentication,
  passport.checkAdmin,
  employeeController.assignReview
);

// assign review action
router.post(
  '/admin/assign-review',
  passport.checkAuthentication,
  passport.checkAdmin,
  employeeController.assignReviewAction
);

// admin view
router.get(
  '/admin/admin-view',
  passport.checkAuthentication,
  passport.checkAdmin,
  employeeController.adminView
);

// add employee
router.get(
  '/admin/add-employee',
  passport.checkAuthentication,
  passport.checkAdmin,
  employeeController.addEmployee
);

// add employee action
router.post(
  '/admin/add-employee',
  passport.checkAuthentication,
  passport.checkAdmin,
  employeeController.addEmployeeAction
);

module.exports = router;
