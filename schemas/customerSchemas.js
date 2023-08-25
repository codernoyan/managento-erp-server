const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  customerId: {
    type: String,
  },
  customerType: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerAddress: {
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
  },
});
// }, { versionKey: false });

module.exports = customerSchema;