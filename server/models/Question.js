const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  answerAt: {
    type: String,
    default: "",
  },
  ansText: {
    type: String,
    default: "",
  },
  askedBy: String,
  queText: String,
  isAnswered: {
    type: Boolean,
    default: false,
  },
});

const questionModel = mongoose.model("Question", questionSchema);
module.exports = questionModel;
