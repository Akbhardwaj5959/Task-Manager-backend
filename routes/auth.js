const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const user = await User.create({ username, email, password });
    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ "email": email });
    console.log(user);
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

