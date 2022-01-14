// requiring employee as user to avoid confusion
const User = require('../models/employeeSchema');

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
    return res.redirect('/employee/sign');
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
