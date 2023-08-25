const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productId: {
    type: String,
  },
  productName: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  productGroup: {
    type: String,
  },
  quantityType: {
    type: String,
    enum: ["pieces", "kilograms"],
  },
  productType: {
    type: String,
    enum: ["chicks", "chicken", "medicine", "feed"],
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = productSchema;