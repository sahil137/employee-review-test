// requiring employee as user to avoid confusion
const User = require('../models/employeeSchema');
const Review = require('../models/reviewSchema');

// render sign up page
module.exports.signUp = function (req, res) {
  return res.render('signup');
};

// render sign in page
module.exports.signIn = function (req, res) {
  return res.render('signin');
};

// create employee
module.exports.createEmployee = async function (req, res) {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (password != confirmPassword) {
      return res.redirect('back');
    }
    const employee = await User.findOne({ email });

    if (employee) {
      console.log('email already exists');
      return res.redirect('back');
    }
    const newEmployee = await User.create({
      name,
      email,
      password,
      isAdmin: false,
    });
    await newEmployee.save();
    if (!newEmployee) {
      console.log(`Error in creating employee`);
      return res.redirect('back');
    }
    return res.redirect('/employee/signin');
  } catch (error) {
    console.log(`Error in creating Employee: ${error}`);
    res.redirect('back');
  }
};

// create session
module.exports.createSession = function (req, res) {
  console.log(`Session created successfully`);
  return res.redirect('/');
};

// sign out
module.exports.signout = function (req, res) {
  req.logout();
  return res.redirect('/employee/signout');
};

// assign reviews to employees :: ADMIN

module.exports.assignReview = async function (req, res) {
  try {
    const users = await User.find({});
    return res.render('assign_review', { users });
  } catch (error) {
    console.log(`Error in assigning task: ${error}`);
    res.redirect('back');
  }
};

module.exports.assignReviewAction = async function (req, res) {
  const { employee, reviewer } = req.body;
  try {
    if (employee === reviewer) {
      console.log(`You cannot assign reviews to yourself`);
      return res.redirect('/employee/admin/assign-review');
    }

    const to = await User.findById(employee);
    const from = await User.findById(reviewer);

    to.myReviews.push(from);
    from.myEvaluations.push(to);
    to.save();
    from.save();

    console.log('Review Assigned Successfully');

    return res.redirect('back');
  } catch (error) {
    console.log(`Error in assigning review: ${error}`);
    res.redirect('back');
  }
};
