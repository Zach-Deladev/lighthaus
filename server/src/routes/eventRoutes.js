import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getEvents,
  createEvents,
  updateEvents,
  deleteEvents,
} from "../controllers/eventController.js";

const router = express.Router();

// get events
router.get("/", getEvents);

// Create events

router.post("/", protect, createEvents);

// Update events

router.put("/", protect, updateEvents);

// Delete events

router.delete("/", protect, deleteEvents);

export default router;
