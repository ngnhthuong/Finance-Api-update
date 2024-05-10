const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  member: [{ type: String }],
});
const memberModel = mongoose.model("member", incomeSchema);

module.exports = memberModel;
