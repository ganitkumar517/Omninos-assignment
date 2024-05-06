const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./database/db");
const User = require("./model/User");
const cors = require("cors");
const Todo = require("./model/Todo");
const Product = require("./model/Product");

const app = express();
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();

db();
//login Api

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Token not provided" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden - Invalid token" });
    }
    req.name = decoded.name;
    next();
  });
};

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ name: user.name, email: user.email }, "secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

app.post("/signup", async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name: name,
      password: password,
      email: email,
    });
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup Failed", error: error.message });
  }
});

app.post("/decodeToken", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, "secret");

    res.status(200).json({ decoded });
  } catch (error) {
    console.error("Error decoding token:", error);
    res
      .status(500)
      .json({ message: "Failed to decode token", error: error.message });
  }
});

app.get("/products", authenticateToken, async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    query = { title: { $regex: search, $options: "i" } };
  }
  try {
    const products = await Product.find(query);

    for (let i = 1; i <= 15; i++) {
      const productData = {
        title: `Product ${i}`,
        price: Math.floor(Math.random() * 100) + 1,
        image: `https://via.placeholder.com/150?text=Product+${i}`,
        cart: false,
        book: false,
      };

      const existingProduct = await Product.findOne({
        title: productData.title,
      });

      if (!existingProduct) {
        const product = await Product.create(productData);
        products.push(product);
      }
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error saving products:", error);
    res
      .status(500)
      .json({ message: "Failed to save products", error: error.message });
  }
});
app.put("/products/:id/cart", authenticateToken, async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.cart = !product.cart;
    await product.save();

    res.status(200).json({ message: "Product cart status updated", product });
  } catch (error) {
    console.error("Error updating product cart status:", error);
    res.status(500).json({
      message: "Failed to update product cart status",
      error: error.message,
    });
  }
});
app.put("/products/:id/cart/book", authenticateToken, async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.book = !product.book;
    await product.save();

    res.status(200).json({ message: "Product cart status updated", product });
  } catch (error) {
    console.error("Error updating product cart status:", error);
    res.status(500).json({
      message: "Failed to update product cart status",
      error: error.message,
    });
  }
});

app.get("/cart/products", authenticateToken, async (req, res) => {
  try {
    const cartProducts = await Product.find({ cart: true });

    res.status(200).json({ products: cartProducts });
  } catch (error) {
    console.error("Error fetching cart products:", error);
    res.status(500).json({
      message: "Failed to fetch cart products",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
