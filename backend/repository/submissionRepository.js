const Submission = require("../models/Submission");

const createSubmission = async (data) => {
  const submission = new Submission({
    userId: data.user_id,
    problemId: data.problem_id,
    code: data.code,
    language: data.language,
    verdict: "Pending"
  });
  return await submission.save();
};

const getSubmissionById = async (id) => {
  return await Submission.findById(id).populate("userId problemId");
};

const getSubmissionsByUserName = async (username) => {
  return await Submission.find({ "userId.username": username }).populate("userId problemId");
};

const getSubmissionsByProblemId = async (problemId) => {
  return await Submission.find({ problemId }).populate("userId problemId");
};

const getSubmissionsByProblemUserName = async ({ problemId, username }) => {
  return await Submission.find({
    problemId,
    "userId.username": username
  }).populate("userId problemId");
};

module.exports = {
  createSubmission,
  getSubmissionById,
  getSubmissionsByUserName,
  getSubmissionsByProblemId,
  getSubmissionsByProblemUserName
};
