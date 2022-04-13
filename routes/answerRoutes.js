const express = require("express");
const router = express.Router();

const answerController = require("../controller/answerController");
const authController = require("../controller/authController");
const commentController = require("./../controller/commentController");

router.post("/postAnswer", authController.protect, answerController.postAnswer);
router.get("/getAllAnswers", answerController.getAllAnswers);

router.post(
  "/postComment",
  authController.protect,
  commentController.createComment
);

router.get("/getAllComments", commentController.getAllComments);

router.patch("/like", authController.protect, answerController.createLike);
router.patch("/unlike", authController.protect, answerController.createUnlike);

module.exports = router;
