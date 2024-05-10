const financeModel = require("../models/financeModel");
const moneyPaymentModel = require("../models/moneyPaymentModel");
const dotenv = require("dotenv");
const validIdMogo = require("../utils/validMongoDB");
dotenv.config();

module.exports = {
  createRecords: async (req, res) => {
    try {
      const { name, member, payment_people } = req.body;

      const newListMoneyPayment = new moneyPaymentModel({
        name,
        member,
        payment_people,
      });

      await newListMoneyPayment.save();

      res
        .status(201)
        .json({ message: "List money payment created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
