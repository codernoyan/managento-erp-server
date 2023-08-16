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
    res.send({
      success: false,
      error: err.message,
    })
  }
};

module.exports = {
  getCustomers,
}