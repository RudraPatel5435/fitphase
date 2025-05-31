const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });

  if (!user) {
    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({ username, password: hashed });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send("Invalid credentials");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

router.post("/save", async (req, res) => {
  const { userId, data } = req.body;
  await User.findByIdAndUpdate(userId, data);
  res.send("Data saved");
});

router.post("/get", async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  res.json(user);
});

module.exports = router;
