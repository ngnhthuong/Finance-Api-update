const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  id: { type: Number },
  member: { type: String },
  notes: { type: String },
  money: { type: Number },
});

const moneyPaymentSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  member: [{ type: String }],
  average: { type: Number, default: 0 },
  payment_people: [paymentSchema],
});

const MoneyPaymentModel = mongoose.model(
  "MoneyPaymentModel",
  moneyPaymentSchema
);

module.exports = MoneyPaymentModel;
