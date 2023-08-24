const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const customerSchema = require('../schemas/customerSchemas');
const Customer = new mongoose.model("Customer", customerSchema);
const generateNewUniqueId = require('../lib/utils');

// // generate new unique id
// async function generateNewUniqueId() {
//   const maxCounterDocument = await Customer.findOne(
//     { customerId: { $regex: /^CSR\d+$/ } },
//     { customerId: 1 },
//     { sort: { customerId: -1 } }
//   ).lean();

//   if (maxCounterDocument) {
//     const currentCounter = parseInt(maxCounterDocument.customerId.slice(3));
//     return `CSR${(currentCounter + 1).toString().padStart(4, '0')}`;
//   } else {
//     return 'CSR0001';
//   }
// }

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
    const newCustomerId = await generateNewUniqueId(Customer, "customer", "CSR");

    const newCustomer = new Customer({
      customerId: newCustomerId,
      ...req.body, // Assuming your request body contains customer data
    });

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