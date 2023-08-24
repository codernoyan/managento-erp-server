const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const supplierSchema = require('../schemas/supplierSchema');
const Supplier = mongoose.model("Supplier", supplierSchema);
const generateNewUniqueId = require('../lib/utils');
// generate new unique id
// async function generateNewUniqueId() {
//   const maxCounterDocument = await Supplier.findOne(
//     { supplierId: { $regex: /^SPR\d+$/ } },
//     { supplierId: 1 },
//     { sort: { supplierId: -1 } }
//   ).lean();

//   if (maxCounterDocument) {
//     const currentCounter = parseInt(maxCounterDocument.supplierId.slice(3));
//     return `SPR${(currentCounter + 1).toString().padStart(4, '0')}`;
//   } else {
//     return 'SPR0001';
//   }
// }

// get all supplier
router.get("/", async (req, res) => {
  try {
    const supplier = await Supplier.find({});  //.select({ _id: 0, __v: 0 })  //.limit(2)

    res.status(200).json({
      success: true,
      data: supplier,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// get a single supplier
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const supplier = await Supplier.findOne({ _id: id });
    res.status(200).json({
      success: true,
      data: supplier,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// add a supplier
router.post('/', async (req, res) => {
  try {
    const newSupplierId = await generateNewUniqueId(Supplier, "supplier", "SPR");

    const newSupplier = new Supplier({
      supplierId: newSupplierId,
      ...req.body, // Assuming the request body contains customer data
    });

    await newSupplier.save();

    res.status(200).json({
      success: true,
      message: 'Supplier is added successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// edit a supplier
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedSupplier = req.body;
    await Supplier.findByIdAndUpdate({ _id: id }, { $set: updatedSupplier }, {});

    res.status(200).json({
      success: true,
      message: 'Supplier is updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
});

// delete a supplier
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Supplier.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Supplier is deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;