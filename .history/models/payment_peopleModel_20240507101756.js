const mongoose = require("mongoose");

const payment_peopleChema = new mongoose.Schema({
  member: String,
});
const payment_peopleModel = mongoose.model(
  "paymentPeople",
  payment_peopleChema
);

module.exports = payment_peopleModel;
