// requiring employee as user to avoid confusion
const User = require('../models/employeeSchema');

module.exports.signUp = function (req, res) {
  return res.render('signup');
};

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
    return res.redirect('/employee/login');
  } catch (error) {
    console.log(`Error in creating Employee: ${error}`);
    res.redirect('back');
  }
};
