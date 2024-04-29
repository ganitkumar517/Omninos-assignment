const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL =
      "mongodb+srv://jeetmehra517:qP2sVz5t33TT46LI@cluster0.bbm00l3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
