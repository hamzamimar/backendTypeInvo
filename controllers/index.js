const User = require('../models/User');

exports.helloWorld = async (req, res) => {
  const user = new User({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  });
  await user.save();
  res.send('Hello, world!');
};
