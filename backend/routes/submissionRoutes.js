const express = require("express");
const authMiddleware = require("../../backend/middleware/authMiddleware");
const submissionService = require("../services/submissionService");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const submissions = await submissionService.getSubmissionsByUserName(req.user.username);
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:problemId", authMiddleware, async (req, res) => {
  try {
    const submissions = await submissionService.getSubmissionsByProblemId(req.params.problemId);
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const submissionData = {
      problem_id: req.body.problemId,
      code: req.body.code,
      language: req.body.language,
      user_id: req.user.userId
    };

    const submission = await submissionService.submit(submissionData);
    res.status(201).json(submission);
  } catch (error) {
    console.error("Submission Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
