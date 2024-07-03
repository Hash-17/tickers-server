const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToDB = async () => {
  const connection = await mongoose.connect(process.env.URI);
  if (connection) {
    console.log("Connected to DB");
  }
};

module.exports = connectToDB;
