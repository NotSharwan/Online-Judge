const produce = async (submission) => {
  // TODO: Implement message queue producer
  console.log("Producing message for submission:", submission._id);
  return processSubmission(submission);
};

const processSubmission = async (submission) => {
  // TODO: Replace with actual judge implementation
  console.log(`Processing submission ${submission._id}...`);
  setTimeout(async () => {
    submission.verdict = "Accepted";
    await submission.save();
    console.log(`Updated verdict: ${submission.verdict}`);
  }, 3000);
};

module.exports = { produce };
