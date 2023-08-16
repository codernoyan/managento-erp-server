const express = require('express');
const { getCustomers } = require('../controllers/entries/customerControllers');
const router = express.Router();

// get all customers
router.get('/', getCustomers);

// get a single customer


module.exports = router;