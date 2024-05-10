const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    categoriesIncome: { type: String },
    date: { type: Date },
    value: { type: Number, default: 0 },
    note:  { type: String, default: "_" },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: false },
  }
);

const IncomeModel = mongoose.model("incomeModel", incomeSchema);

module.exports = IncomeModel;
