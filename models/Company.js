const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    theOnlyIdentifier: {
    type: String,
    required: true
  },
  companyNameEnglish: {
    type: String,
    required: true
  },
  companyNameArabic: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  maxLimitOfCompanyDebt: {
    type: String,
    required: true
  },
  printingFee: {
    type: String,
    required: true
  },
  taxNumber: {
    type: String,
    required: true
  },
  repPhoneNumber: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const companyData = mongoose.model('companySchema', companySchema);

module.exports = companyData;
