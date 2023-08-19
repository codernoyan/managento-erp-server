const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const customerSchema = require('../schemas/customerSchemas');
const Customer = new mongoose.model("Customer", customerSchema);

// get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find({});  //.select({ _id: 0, __v: 0 })  //.limit(2)

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// get a single customer
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findOne({ _id: id });
    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// add a customer
router.post('/', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();

    res.status(200).json({
      success: true,
      message: 'Customer is added successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// edit a customer
router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedDoc = req.body;
    await Customer.findByIdAndUpdate({ _id: id }, {
      $set: updatedDoc,
    }, {});
    res.status(200).json({
      success: true,
      message: 'Customer is updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// delete a customer
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Customer is deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;