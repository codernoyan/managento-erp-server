const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const customerRoutes = require('./routes/customerRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const productsRoutes = require('./routes/productRoutes');
const bankRoutes = require('./routes/bankRoutes');
const port = process.env.PORT || 5000;

// uri
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ufdxsbo.mongodb.net/${process.env.DB_USERNAME}?retryWrites=true&w=majority`;

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// database connection with mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database Connection Successful"))
  .catch((err) => console.log(err.message));

// entry routes
app.use('/customers', customerRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productsRoutes);
app.use('/banks', bankRoutes);

// default get route
app.get("/", (req, res) => {
  res.send("Managento ERP server is running");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});