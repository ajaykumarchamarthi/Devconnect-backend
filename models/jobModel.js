const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyDescription: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
  },
  workLocation: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  companyWebsite: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Job = new mongoose.model("Job", jobSchema);
module.exports = Job;
