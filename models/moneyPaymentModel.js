const mongoose = require("mongoose");

const lstMoneyPaymentSchema = new mongoose.Schema({
  name_group: { type: String },
  member: [
    {
      member_name: { type: String },
    },
  ],
  pay_list: [
    {
      member_id: { type: String },
      member_name: { type: String },
      value: { type: Number, default: 0 },
      note: { type: String, default: "_"},
    },
  ],
});

const lstMoneyPaymentModel = mongoose.model(
  "moneyPaymentModel",
  lstMoneyPaymentSchema
);

module.exports = lstMoneyPaymentModel;
