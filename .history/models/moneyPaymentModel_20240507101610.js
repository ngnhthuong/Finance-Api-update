const mongoose = require("mongoose");

// const memberSchema = new mongoose.Schema({
//   member: String,
// });

// const paymentSchema = new mongoose.Schema({
//   member: String,
//   notes: String,
//   money: Number,
// });

const lstMoneyPaymentSchema = new mongoose.Schema({
  name: String,
  member: [{ type: mongoose.Schema.Types.ObjectId, ref: "memberModel" }],
  payment_people: [
    { type: mongoose.Schema.Types.ObjectId, ref: "payment_peopleModel" },
  ],
});

const lstMoneyPayment = mongoose.model(
  "lstMoneyPayment",
  lstMoneyPaymentSchema
);

module.exports = lstMoneyPayment;
