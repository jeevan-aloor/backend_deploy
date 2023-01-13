const mongoose = require("mongoose");
const dotenv = require('dotenv')

const connection = mongoose.connect(
  process.env.mongourl
);

module.exports = {
  connection
};
