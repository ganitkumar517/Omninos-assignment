const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL = "";
    await mongoose.connect(mongoURL, {
      userNewParser: true,
      useUnifieldTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to mongoDB", error);
  }
};

module.exports = connectDB;
