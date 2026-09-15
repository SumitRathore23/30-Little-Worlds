const express = require("express");

const {
  getStories,
  getFeaturedStory,
  getStoryBySlug,
  getAdminStories,
  createStory,
  updateStory,
  deleteStory,
} = require("../controllers/storyController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getStories);
router.get("/featured", getFeaturedStory);

// Admin route
router.get("/admin/all", protect, getAdminStories);

// Public story reading
router.get("/:slug", getStoryBySlug);

// Admin story management
router.post("/", protect, createStory);
router.put("/:id", protect, updateStory);
router.delete("/:id", protect, deleteStory);

module.exports = router;