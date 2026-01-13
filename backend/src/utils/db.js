const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✔ MongoDB connected successfully");
  } catch (error) {
    console.log("❌ database connection failed");
    console.log(error.message);
  }
};

module.exports = connectDb;
