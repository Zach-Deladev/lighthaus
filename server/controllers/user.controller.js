const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.models");

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Please add all fields." });
  } else {
    res.json({ message: "register user" });
  }
};

// Login User
const loginUser = async (req, res) => {
  res.json({ message: "Login user" });
};

// Get user data

const getUser = async (req, res) => {
  res.json({ message: "Show user data" });
};

// logout User
const logoutUser = async (req, res) => {
  res.json({ message: "Logout user" });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
};
