const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({
  bankId: {
    type: String,
  },
  bankName: {
    type: String,
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  cratedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = bankSchema;