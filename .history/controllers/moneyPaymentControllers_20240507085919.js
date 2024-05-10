const financeModel = require("../models/financeModel");
const moneyPaymentModel = require("../models/moneyPaymentModel")
const dotenv = require("dotenv");
const CryptoJS = require("crypto-js");
const validIdMogo = require("../utils/validMongoDB");
dotenv.config();

module.exports = {

//   login: async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const user = await financeModel.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       const decryptedPassword = CryptoJS.AES.decrypt(
//         user.password,
//         process.env.SECRET
//       ).toString(CryptoJS.enc.Utf8);
//       if (password !== decryptedPassword) {
//         return res.status(401).json({ message: "Invalid password" });
//       }
//       res.status(200).json({
//         message: "Login successful",
//         user,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         message: `Internal Server Error: ${error.message}`,
//         data: null,
//       });
//     }
//   },

  
};
