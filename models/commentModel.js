const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Comment is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
  },
});

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "answer",
    select: "_id answer",
  });
  next();
});

module.exports = new mongoose.model("Comment", commentSchema);
