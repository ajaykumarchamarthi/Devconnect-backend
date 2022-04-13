const express = require("express");
const router = express.Router();

const questionController = require("./../controller/questionController");

router.post("/postQuestion", questionController.postQuestion);
router.get("/getAllQuestions", questionController.getAllQuestions);

module.exports = router;
