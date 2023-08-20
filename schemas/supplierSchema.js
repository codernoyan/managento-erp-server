const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
  supplierId: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  supplierAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = supplierSchema;