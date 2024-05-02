const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI;
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to mongoDB", error);
  }
};

module.exports = connectDB;
