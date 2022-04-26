const Job = require("./../models/jobModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllJobs = catchAsync(async (req, res, next) => {
  const jobs = await Job.find();
  res.status(200).json({
    status: "success",
    data: {
      jobs,
    },
  });
});

exports.postJob = catchAsync(async (req, res, next) => {
  const {
    companyName,
    companyDescription,
    jobDescription,
    companyLogo,
    workLocation,
    salary,
    companyWebsite,
  } = req.body;
  const newJob = await Job.create({
    companyName,
    companyDescription,
    jobDescription,
    companyLogo,
    workLocation,
    salary,
    companyWebsite,
  });

  res.status(200).json({
    status: "success",
    data: {
      newJob,
    },
  });
});
