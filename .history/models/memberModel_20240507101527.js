const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  member: String,
});
const memberModel = mongoose.model("incomeModel", incomeSchema);

module.exports = memberSchema;
