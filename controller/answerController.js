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
  const answers = await Answer.find();

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
  });
  res.status(201).json({
    status: "success",
  });
});
