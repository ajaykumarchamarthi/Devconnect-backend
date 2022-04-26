const express = require("express");
const router = express.Router();

const applyJobController = require("./../controller/applyJobController");
const jobController = require("./../controller/jobController");

router.get("/getAllJobs", jobController.getAllJobs);
router.post("/postJob", jobController.postJob);

router.post("/applyJob", applyJobController.applyJob);

module.exports = router;
