const express = require("express")
const router = express.Router()
const {getEvents, createEvents, updateEvents, deleteEvents} = require("../controllers/events.controller")

// Get events

router.get("/", getEvents)

// Create events

router.post("/", createEvents)

// Update events

router.put("/", updateEvents)

// Delete events

router.delete("/", deleteEvents)


module.exports = router;