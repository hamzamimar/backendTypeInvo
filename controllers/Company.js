const { validationResult } = require('express-validator');
const companyData = require('../models/Company');

// Add new company
exports.addCompany = async (req, res) => {
    console.log('i rand')
  try {
    const company = new companyData(req.body);
    await company.save();
    res.status(201).json({ data : company , Status: 'Success' }); 
  } catch (error) {
    res.status(400).json({  Status: 'Err' }); 
  }
};

// Edit existing company
exports.editCompany = async (req, res) => {
  try {
    const company = await companyData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!company) {
      res.status(404).json({  Status: 'Err' }); 
    }
    res.json({ data: company,Status: 'Success' }); 
  } catch (error) {
    res.status(400).json({  Status: 'Err' }); 
  }
};

// Delete company
exports.deleteCompany = async (req, res) => {
  try {
    const company = await companyData.findByIdAndDelete(req.params.id);
    if (!company) {
      res.status(404).json({ Status: 'Err' });
    }
    res.json({ data: company,Status: 'Success' }); 
  } catch (error) {
    res.status(500).send(error);
  }
};

// Find company by ID
exports.findCompanyById = async (req, res) => {
  try {
    const company = await companyData.findById(req.params.id);
    if (!company) {
      res.status(404).json({ data: company,Status: 'Success' }); 
    }
    res.send(company);
  } catch (error) {
    res.status(500).json({ Status: 'Err' })
  }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await companyData.find();
    res.send(companies);
  } catch (error) {
    res.status(500).send(error);
  }
};
