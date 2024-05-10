const mongoose = require("mongoose");

const moneyTeamSchema = new mongoose.Schema(
  {
    id: { type: String },
    name_group: { type: String },
    member: { type: String },
    date: { type: Date, required: true },
    value: { type: Number, default: 0 },
    note: { type: String, default: "_" },
  },
  {
    timestamps: true,
  }
);

const MoneyTeamModel = mongoose.model("moneyTeamModel", moneyTeamSchema);

module.exports = MoneyTeamModel;
