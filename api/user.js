const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = await User.findOne({ username }).exec();
    if (user) {
      const isCorrect = bcrypt.compare(password, user.password);
      if (isCorrect) {
        const token = jwt.sign({ username }, process.env.TOKEN_KEY, {
          expiresIn: "2h",
        });
        user.token = token;
        res.json(user);
      } else {
        res.json({ text: "Wrong password provided." });
      }
    } else {
      res.json({ text: "Wrong username or password." });
    }
  } else {
    res.json({ text: "Please enter username and password." });
  }
});

router.post("/register", async (req, res) => {
  const { username, name, password, capability } = req.body;
  if (username && name && password && capability) {
    const isExist = await User.findOne({ username }).exec();
    if (isExist) return res.json({ text: "Username already exists." });
    const encryptedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign(
      {
        username,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    const user = new User({
      username,
      password: encryptedPassword,
      name,
      capability,
      token,
    });
    user.save((err) => {
      if (err) {
        res.json({ text: "Something went wrong while adding the user." });
      } else {
        res.json(user);
      }
    });
  } else {
    res.json({ text: "Please fill all the information." });
  }
});

module.exports = router;
