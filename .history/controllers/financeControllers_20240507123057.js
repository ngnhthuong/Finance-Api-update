const financeModel = require("../models/financeModel");
const dotenv = require("dotenv");
const CryptoJS = require("crypto-js");
const validIdMongo = require("../utils/validMongoDB");
dotenv.config();

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, confirmpassword } = req.body;
      const existingUser = await financeModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      if (password !== confirmpassword) {
        return res.status(400).json({ message: "Password does not match" });
      }
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET
      ).toString();
      const newFinanceUser = new financeModel({
        email,
        password: encryptedPassword,
      });
      await newFinanceUser.save();
      res.status(201).json({
        message: "Account created successfully",
        data: { email: newFinanceUser.email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `Internal Server Error: ${error.message}`,
        data: null,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await financeModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      ).toString(CryptoJS.enc.Utf8);
      if (password !== decryptedPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }
      res.status(200).json({
        message: "Login successful",
        user
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `Internal Server Error: ${error.message}`,
        data: null,
      });
    }
  },

  updatePremium: async (req, res) => {
    try {
      const { id } = req.params;
      validIdMongo(id);
      const user = await financeModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.premium = true;
      await user.save();
      res.status(200).json({
        message: "Update premium successfully",
        data: { email: user.email, premium: user.premium },
      });
    } catch (error) {
      res.status(500).json({
        message: `Internal Server Error: ${error.message}`,
        data: null,
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      validIdMongo(id);
        const user = await financeModel
          .findById(id)
          .populate("expenses")
          .populate("incomes")
          .populate("moneypayment");
        if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log(user);
      res.status(200).json({ message: "Get user successfully", data: user });
    } catch (error) {
      res.status(500).json({ message: `Internal Server Error ${error}`, data: null });
    }
  },
};
