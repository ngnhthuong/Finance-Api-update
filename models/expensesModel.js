const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema(
  {
    categoriesExpenses: { type: String, required: true},
    date: { type: Date, required: true },
    value: { type: Number, default: 0 },
    note:  { type: String, default: "_"},
  },
  {
    timestamps: true,
  }
);

const ExpensesModel = mongoose.model("expensesModel", expensesSchema);

module.exports = ExpensesModel;
