const express = require('express');
const bankSchema = require('../schemas/bankSchema');
const router = express.Router();
const mongoose = require('mongoose');
const Bank = new mongoose.model("Bank", bankSchema);
const generateNewUniqueId = require('../lib/utils');

// get all bank
router.get("/", async (req, res) => {
  try {
    const bank = await Bank.find({});  //.select({ _id: 0, __v: 0 })  //.limit(2)

    res.status(200).json({
      success: true,
      data: bank,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// get a single bank
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bank = await Bank.findOne({ _id: id });
    res.status(200).json({
      success: true,
      data: bank,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// add a bank
router.post('/', async (req, res) => {
  try {
    const newBankId = await generateNewUniqueId(Bank, "bank", "BNK");

    const newBank = new Bank({
      bankId: newBankId,
      ...req.body, // Assuming your request body contains bank data
    });

    await newBank.save();

    res.status(200).json({
      success: true,
      message: 'Bank is added successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});
// edit a bank
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBank = req.body;
    await Bank.findByIdAndUpdate({ _id: id }, { $set: updatedBank }, {});

    res.status(200).json({
      success: true,
      message: 'Bank is updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
});

// delete a bank
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Bank.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Bank is deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;