const Answer = require("../models/answerModel");
const catchAsync = require("../utils/catchAsync");

exports.postAnswer = catchAsync(async (req, res, next) => {
  const { answer, questionId, userId } = req.body;

  const newAnswer = await Answer.create({
    answer,
    question: questionId,
    user: userId,
  });

  res.status(201).json({
    status: "Success",
    data: {
      newAnswer,
    },
  });
});

exports.getAllAnswers = catchAsync(async (req, res, next) => {
  let query = Answer.find();

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  const answers = await query;

  res.status(200).json({
    status: "Success",
    data: {
      answers,
    },
  });
});

exports.createLike = catchAsync(async (req, res) => {
  const { answerId, userId } = req.body;
  await Answer.findByIdAndUpdate(answerId, {
    $push: { likes: userId },
    $inc: { numOfLikes: 1 },
    new: true,
  });
  res.status(201).json({
    status: "success",
  });
});

exports.createUnlike = catchAsync(async (req, res) => {
  const { answerId, userId } = req.body;
  await Answer.findByIdAndUpdate(answerId, {
    $pull: { likes: userId },
    $inc: { numOfLikes: -1 },
  });
  res.status(201).json({
    status: "success",
  });
});
