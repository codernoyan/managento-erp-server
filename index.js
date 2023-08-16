const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// default get route
app.get("/", (req, res) => {
  res.send("ERP Solutions server is running");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});