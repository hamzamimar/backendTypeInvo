const express = require('express');
const router = express.Router();
const { helloWorld } = require('../controllers');
const { check } = require('express-validator');
const { login } = require('../controllers/authController')
const auth = require('../middleware/authMiddleware');
const { addUser, deleteUser, updateUser } = require('../controllers/AddingUser');
const { getAllUsers, getUserById } = require('../controllers/GetAllClientUsers');
const { addCompany, getAllCompanies, findCompanyById, deleteCompany, editCompany } = require('../controllers/Company');
const { createRate, getAllRates, updateRate, deleteRate, getRateById } = require('../controllers/ServiceRates');
const { createMainCompany, editMainCompany, getMainCompany } = require('../controllers/MainCompany');
router.get('/', helloWorld);
router.get('/client-users', getAllUsers);
router.get('/company', getAllCompanies);
router.get('/client-user/:id', getUserById);
router.post('/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login
);
router.post('/add-user', addUser);
router.delete('/client-user/:id', deleteUser);
router.patch('/client-user/:id', updateUser);
router.post('/add-company', addCompany);
router.get('/company/:id',findCompanyById );
router.delete('/company/:id', deleteCompany);
router.patch('/company/:id', editCompany);
// router.get('/protected', auth, (req, res) => {
//   res.json({ msg: 'Welcome to the protected route!' });
// });

// Service Rates
router.post('/add-rates', createRate);
router.patch('/update-rate/:id', updateRate);
router.get('/get-rates', getAllRates);
router.get('/get-rate/:id', getRateById);
router.delete('/delete-rate/:id', deleteRate);

// Main Company
router.post('/add-main-company', createMainCompany);
router.patch('/main-company/:id', editMainCompany);
router.get('/get-main-company', getMainCompany);
module.exports = router;
