const clientUser = require('../models/ClientUser');

const getAllUsers = async (req, res) => {
  try {
    const users = await clientUser.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the user exists
      const user = await clientUser.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({data:user, Status:'Success'});
    } catch (error) {
      console.error(error);
      if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid user ID' , Status:'Err'});
      }
      res.status(500).json({ error: 'Server error' ,Status:'Err' });
    }
  };
  
module.exports = { getAllUsers, getUserById };
