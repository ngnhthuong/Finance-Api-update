const mongoose = require("mongoose");

const payment_peopleChema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "memberModel" },
  notes: String,
  money: Number,
});
const payment_peopleModel = mongoose.model(
  "paymentPeople",
  payment_peopleChema
);

module.exports = payment_peopleModel;
