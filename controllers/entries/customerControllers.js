const { ObjectId } = require("mongodb");
const { customersCollection } = require("../../collections/collections");

const getCustomers = async (req, res) => {
  try {
    const query = {};
    const cursor = customersCollection.find(query);
    const result = await cursor.toArray();
    // send response
    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    })
  }
};

const getCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await customersCollection.findOne(query);
    // send response
    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    })
  }
}

module.exports = {
  getCustomers,
  getCustomer,
}