const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

questionSchema.virtual("answers", {
  ref: "Answer",
  localField: "_id",
  foreignField: "question",
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
