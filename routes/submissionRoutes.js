const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Submission = require("../models/Submission");

const router = express.Router();

// Get all submissions (Admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const submissions = await Submission.find().populate("userId problemId");
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get submissions for a specific problem
router.get("/:problemId", authMiddleware, async (req, res) => {
  try {
    const { problemId } = req.params;
    const submissions = await Submission.find({ problemId, userId: req.user.userId }).populate("problemId");
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Submit Code
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    if (!problemId || !code || !language) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newSubmission = new Submission({
      userId: req.user.userId, // Extracted from authMiddleware
      problemId,
      code,
      language,
      verdict: "Pending", // Default status
    });

    await newSubmission.save();
    res.status(201).json(newSubmission);

    // Call judge function (to be implemented)
    processSubmission(newSubmission);
  } catch (error) {
    console.error("Submission Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Judge function (Mockup)
const processSubmission = async (submission) => {
  // TODO: Integrate Judge0 or Docker-based execution here
  console.log(`Processing submission ${submission._id}...`);
  setTimeout(async () => {
    // Simulating verdict update
    submission.verdict = "Accepted"; // Change based on real execution result
    await submission.save();
    console.log(`Updated verdict: ${submission.verdict}`);
  }, 3000);
};

module.exports = router;
