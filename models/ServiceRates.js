const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  service: { type: String, required: true },
  serviceType: { type: String, required: true },
  customerType: { type: String, required: true },
  governmentPrice: { type: Number, required: true },
  printPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Rate', rateSchema);
