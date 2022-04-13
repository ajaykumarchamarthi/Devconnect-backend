const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tag: {
    type: String,
    required: true,
  },
});

questionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-password -__v -passwordChangedAt -passwordResetToken",
  });
  next();
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
