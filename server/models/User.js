const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  name: String,
  password: String,
  capability: String,
  token: String,
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
