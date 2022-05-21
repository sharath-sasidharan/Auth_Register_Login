const mongoose = require("mongoose");
require('dotenv').config()
const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Database connected successfully"))
    .catch((error) => {
      console.log(error);
      console.log("Database connection Failed");
      process.exit(1);
    });
};

module.exports = connectDB;
