const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  member: String,
});
const memberModel = mongoose.model("memberModel", incomeSchema);

module.exports = memberModel;
