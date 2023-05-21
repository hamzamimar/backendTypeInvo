const mongoose = require('mongoose');

const mainCompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  taxNumber: { type: String, required: true },
  location: { type: String },
  logo: { type: String }
});

const MainCompany = mongoose.model('MainCompany', mainCompanySchema);

module.exports = MainCompany;
