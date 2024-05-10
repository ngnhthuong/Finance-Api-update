const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  member: String,
});

module.exports = memberSchema;
