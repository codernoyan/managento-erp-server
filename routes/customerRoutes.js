const express = require('express');
const { getCustomers, getCustomer } = require('../controllers/entries/customerControllers');
const { Routes } = require('react-router-dom');
const router = express.Router();

// get all customers
router.get('/', getCustomers);

// get a single customer
Routes.get('/:id', getCustomer);

module.exports = router;