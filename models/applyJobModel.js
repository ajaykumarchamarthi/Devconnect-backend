const mongoose = require("mongoose");

const applyJobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

applyJobSchema.pre(/^find/, function (next) {
  this.populate({
    path: "companyId",
    select: "-companyLogo -createdAt",
  });
});

const applyJob = new mongoose.model("applyJob", applyJobSchema);
module.exports = applyJob;
