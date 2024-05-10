const mongoose = require("mongoose");

const lstMoneyPaymentSchema = new mongoose.Schema({
  name: { type: String },
  member: [{ type: mongoose.Schema.Types.ObjectId, ref: "memberModel" }],
  payment_people: [
    { type: mongoose.Schema.Types.ObjectId, ref: "payment_peopleModel" },
  ],
});

const lstMoneyPaymentModel = mongoose.model(
  "lstMoneyPayment",
  lstMoneyPaymentSchema
);

module.exports = lstMoneyPaymentModel;
