const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  member: String,
});

const paymentSchema = new mongoose.Schema({
  member: String,
  notes: String,
  money: Number,
});

const lstMoneyPaymentSchema = new mongoose.Schema({
  name: String,
  member: [memberSchema],
  payment_people: [paymentSchema],
});

const lstMoneyPaymentModel = mongoose.model(
  "lstMoneyPayment",
  lstMoneyPaymentSchema
);

module.exports = lstMoneyPaymentModel;
