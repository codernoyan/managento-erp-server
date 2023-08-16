const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const { dbConnect } = require('./mongodb/mongodb.config');
const customerRoutes = require('./routes/customerRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const productsRoutes = require('./routes/productRoutes');
const bankRoutes = require('./routes/bankRoutes');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// run mongodb
dbConnect();

// entry routes
app.use('/customers', customerRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productsRoutes);
app.use('/banks', bankRoutes);

// default get route
app.get("/", (req, res) => {
  res.send("ERP Solutions server is running");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});