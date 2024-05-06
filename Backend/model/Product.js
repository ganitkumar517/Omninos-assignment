const mongoose = require("mongoose");

// Define the schema for Product
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cart: { type: Boolean, default: false },
  book: { type: Boolean, default: false },
});

// Create and export the Product model
module.exports = mongoose.model("Product", productSchema);
