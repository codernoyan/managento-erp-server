const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productSchema = require('../schemas/productSchema');
const Product = new mongoose.model("Product", productSchema);
const generateNewUniqueId = require('../lib/utils');

// get all product
router.get("/", async (req, res) => {
  try {
    const product = await Product.find({});  //.select({ _id: 0, __v: 0 })  //.limit(2)

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// get a single product
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// add a product
router.post('/', async (req, res) => {
  try {
    const newProductId = await generateNewUniqueId(Product, "product", "PR");

    const newProduct = new Product({
      productId: newProductId,
      ...req.body, // Assuming your request body contains product data
    });

    await newProduct.save();

    res.status(200).json({
      success: true,
      message: 'Product is added successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});
// edit a product
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = req.body;
    await Product.findByIdAndUpdate({ _id: id }, { $set: updatedProduct }, {});

    res.status(200).json({
      success: true,
      message: 'Product is updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
});

// delete a product
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Product.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Product is deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;