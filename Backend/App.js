const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./database/db");
const User = require("./model/User");

const app = express();
app.use(bodyParser.json());
db();
//login Api

app.post("/login", async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.userId }, "secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

app.post("/signup", async (req, res) => {
  const { userId, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      userId: userId,
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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running on port");
});
