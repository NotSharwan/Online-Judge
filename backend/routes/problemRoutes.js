const express = require("express");
const Problem = require("../models/Problem");
const authMiddleware = require("../../backend/middleware/authMiddleware");

const router = express.Router();

// Create a problem (Admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newProblem = new Problem(req.body);
    await newProblem.save();
    res.status(201).json(newProblem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all problems
router.get("/", async (req, res) => {
    try {
      const problems = await Problem.find();
      res.json(problems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get a specific problem by ID
router.get("/:id", async (req, res) => {
    try {
      console.log("Fetching problem with ID:", req.params.id);
  
      const problem = await Problem.findById(req.params.id);
      if (!problem) {
        console.log("Problem not found in database.");
        return res.status(404).json({ error: "Problem not found" });
      }
  
      res.json(problem);
    } catch (error) {
      console.error("Error fetching problem:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
// Update a problem (Admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedProblem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProblem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a problem (Admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Problem.findByIdAndDelete(req.params.id);
    res.json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
