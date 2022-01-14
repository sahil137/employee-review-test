const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employee_review_dev');

const db = mongoose.connection;

db.on(
  'error',
  console.error.bind(console.error, 'Error in connecting to MongoDB')
);

db.once('open', function () {
  console.log('Connected to Database :: Mongodb');
});

exports.module = db;
