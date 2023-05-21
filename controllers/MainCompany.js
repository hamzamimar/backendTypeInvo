const MainCompany = require('../models/MainCompany');

exports.createMainCompany = async (req, res) => {
  try {
    const { name, phone, email, taxNumber, location, logo } = req.body;

    // Check if the company already exists
    const existingCompany = await MainCompany.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    // Create a new company
    const mainCompany = new MainCompany({
      name,
      phone,
      email,
      taxNumber,
      location,
      logo
    });

    // Save the company to the database
    const savedCompany = await mainCompany.save();

    res.status(201).json(savedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getMainCompany = async (req, res) => {
    try {
      // Find the main company
      const mainCompany = await MainCompany.findOne();
  
      if (!mainCompany) {
        return res.status(404).json({ message: 'Main company not found' });
      }
  
      res.status(200).json(mainCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.editMainCompany = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phone, email, taxNumber, location, logo } = req.body;
  
      // Find the company to edit by ID
      const mainCompany = await MainCompany.findById(id);
      if (!mainCompany) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      // Update the company's fields
      if (name) mainCompany.name = name;
      if (phone) mainCompany.phone = phone;
      if (email) mainCompany.email = email;
      if (taxNumber) mainCompany.taxNumber = taxNumber;
      if (location) mainCompany.location = location;
      if (logo) mainCompany.logo = logo;
  
      // Save the updated company to the database
      const savedCompany = await mainCompany.save();
  
      res.status(200).json(savedCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
