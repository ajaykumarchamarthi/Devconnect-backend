const Question = require("./../models/questionModel");
const catchAsync = require("./../utils/catchAsync");

exports.postQuestion = catchAsync(async (req, res, next) => {
  const { question, userId, tag, questionExplanation } = req.body;
  const newQuestion = await Question.create({
    question,
    user: userId,
    tag,
    questionExplanation,
  });
  res.status(201).json({
    status: "success",
    data: {
      newQuestion,
    },
  });
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  let query = Question.find().populate({
    path: "answers",
    select: "likes answer -question",
  });

  if (req.query.sort) {
    console.log("Query Sort Started");
    const sortBy = req.query.sort.split(",").join(" ");
    console.log(sortBy);
    query = query.sort(sortBy);
    console.log("sort implemented successfully");
  } else {
    query = query.sort("-createdAt");
  }

  const questions = await query;

  res.status(200).json({
    status: "success",
    data: {
      questions,
    },
  });
});
