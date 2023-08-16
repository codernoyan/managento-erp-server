const { client } = require("../mongodb/mongodb.config");

// customers collection
const customersCollection = client.db("erpSolutions").collection("customers");
// suppliers collection
const suppliersCollection = client.db("erpSolutions").collection("suppliers");
// products collection
const productsCollection = client.db("erpSolutions").collection("products");
// banks collection
const banksCollection = client.db("erpSolutions").collection("banks");

module.exports = {
  customersCollection,
  suppliersCollection,
  productsCollection,
  banksCollection,
};