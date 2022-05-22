const Comment = require("../models/commentModel");
const catchAsync = require("./../utils/catchAsync");

exports.createComment = catchAsync(async (req, res, next) => {
  const { userId, comments, answerId } = req.body;
  const newComment = await Comment.create({
    user: userId,
    comments,
    answer: answerId,
  });

  res.status(201).json({
    status: "success",
    data: {
      newComment,
    },
  });
});

exports.getAllComments = catchAsync(async (req, res, next) => {
  let query = Comment.find();
  query = query.sort("-createdAt");
  const comments = await query;

  res.status(200).json({
    status: "success",
    data: {
      comments,
    },
  });
});
