const clientUser = require('../models/ClientUser');
const { check, validationResult } = require('express-validator');
const addUser = async (req, res) => {
    try {
      const { name, activatedLanguage, accountType, email, password } = req.body;
      
      // Perform validation checks using the check function
      await Promise.all([
        check('name', 'Name is required').notEmpty().run(req),
        check('activatedLanguage', 'Activated language is required').notEmpty().run(req),
        check('accountType', 'Account type is required').notEmpty().run(req),
        check('email', 'Email is required').notEmpty().run(req),
        check('email', 'Invalid email format').isEmail().run(req),
        check('password', 'Password is required').notEmpty().run(req),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }).run(req),
      ]);
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),Status:'Err' });
      }
  
      const user = new clientUser({ name, activatedLanguage, accountType, email, password });
      const result = await user.save();
      res.status(201).json({result, Status:'Success'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error', Status:'Err' });
    }
  };
  
  const updateUser = async (req, res) => {
    console.log('running')
    try {
      const { id } = req.params;
      const { name, activatedLanguage, accountType, email, password } = req.body;
  
      // Check if the user exists
      const user = await clientUser.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found', Status:'Err' });
      }
  
      // Perform validation checks using the check function
      await Promise.all([
        check('name', 'Name is required').notEmpty().optional().run(req),
        check('activatedLanguage', 'Activated language is required').notEmpty().optional().run(req),
        check('accountType', 'Account type is required').notEmpty().optional().run(req),
        check('email', 'Invalid email format').isEmail().optional().run(req),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }).optional().run(req),
      ]);
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),Status:'Err' });
      }

      user.name = name || user.name;
      user.activatedLanguage = activatedLanguage || user.activatedLanguage;
      user.accountType = accountType || user.accountType;
      user.email = email || user.email;
      user.password = password || user.password;
      const result = await user.save();
  
      res.status(200).json({ result, Status:'Success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error', Status:'Err' });
    }
  };
  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the user exists
      const user = await clientUser.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found', Status:'Err' });
      }
  console.log('tes', user)
      // Delete the user
      await user.deleteOne()
  
      res.status(200).json({ message: 'User deleted successfully', Status:'Success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error', Status:'Err' });
    }
  };
  
  
  module.exports = { addUser, updateUser , deleteUser };
