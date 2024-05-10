const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  id: Number,
  member: String,
});

const paymentSchema = new mongoose.Schema({
  id: Number,
  member: String,
  notes: String,
  money: Number,
});

const lstMoneyPaymentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  member: [memberSchema],
  payment_people: [paymentSchema],
});

const lstMoneyPaymentModel = mongoose.model(
  "lstMoneyPayment",
  lstMoneyPaymentSchema
);

module.exports = lstMoneyPaymentModel;
