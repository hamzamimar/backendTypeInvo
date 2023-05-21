const Rate = require('../models/ServiceRates');

// exports.getAllRates = async (req, res) => {
//   try {
//     const rates = await Rate.find();
//     res.status(200).json(rates);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.getAllRates = async (req, res) => {
  try {
    const service = req.query.service;
    const rates = await Rate.find({ service: service });
    res.status(200).json(rates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getRateById = async (req, res) => {
  try {
    const rate = await Rate.findById(req.params.id);
    res.status(200).json(rate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRate = async (req, res) => {
  const { service, serviceType, customerType, governmentPrice, printPrice, totalPrice } = req.body;

  try {
    const rate = new Rate({ service, serviceType, customerType, governmentPrice, printPrice, totalPrice });
    await rate.save();
    res.status(201).json(rate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRate = async (req, res) => {
  const { service, serviceType, customerType, governmentPrice, printPrice, totalPrice } = req.body;

  try {
    const rate = await Rate.findById(req.params.id);
    if (rate) {
      rate.service = service || rate.service;
      rate.serviceType = serviceType || rate.serviceType;
      rate.customerType = customerType || rate.customerType;
      rate.governmentPrice = governmentPrice || rate.governmentPrice;
      rate.printPrice = printPrice || rate.printPrice;
      rate.totalPrice = totalPrice || rate.totalPrice;

      await rate.save();
      res.status(200).json(rate);
    } else {
      res.status(404).json({ message: 'Rate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRate = async (req, res) => {
  try {
    const rate = await Rate.findByIdAndDelete(req.params.id);
    if (!rate) {
      res.status(404).json({ Status: 'Err' });
    }
    res.json({ Status: 'Success' }); 
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
