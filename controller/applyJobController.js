const Job = require("./../models/applyJobModel");
const catchAsync = require("./../utils/catchAsync");

exports.applyJob = catchAsync(async (req, res, next) => {
  const { companyId, name, emailAddress, contactNumber } = req.body;
  const newJobCandidate = Job.create({
    companyId,
    name,
    emailAddress,
    contactNumber,
  });

  res.status(201).json({
    status: "applied successfully",
    data: {
      newJobCandidate,
    },
  });
});
