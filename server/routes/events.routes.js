const express = require("express");
const router = express.Router();
const {
  getEvents,
  createEvents,
  updateEvents,
  deleteEvents,
} = require("../controllers/events.controller");

const { protect } = require("../middleware/auth.middleware");
// Get events

router.get("/", getEvents);

// Create events

router.post("/", protect, createEvents);

// Update events

router.put("/", protect, updateEvents);

// Delete events

router.delete("/", protect, deleteEvents);

module.exports = router;
