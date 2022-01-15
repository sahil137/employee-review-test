const User = require('../models/employeeSchema');

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

// assign review to employees :: ADMIN
module.exports.assignReviewAction = async function (req, res) {
  const { employee, reviewer } = req.body;
  try {
    if (employee === reviewer) {
      console.log(`You cannot assign reviews to yourself`);
      return res.redirect('/admin/assign-review');
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

// render admin view :: ADMIN
module.exports.adminView = async function (req, res) {
  try {
    const users = await User.find({});
    return res.render('admin_view', { users });
  } catch (error) {
    console.log(`Error in showing records: ${error}`);
    res.redirect('back');
  }
};

// render add employee page :: ADMIN
module.exports.addEmployee = function (req, res) {
  return res.render('add_employee_admin');
};

// add employee action :: ADMIN
module.exports.addEmployeeAction = async function (req, res) {
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
    return res.redirect('/admin/admin-view');
  } catch (error) {
    console.log(`Error in creating Employee: ${error}`);
    res.redirect('back');
  }
};
