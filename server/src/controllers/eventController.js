import Event from "../models/eventModel.js";

// Get events

const getEvents = async (req, res) => {
  const events = await Event.find();
  //  add a method to list events by date
  // const today = new Date();
  //               today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 so that we only compare the date part
  //               const events = await Events.find({
  //                   date: {
  //                       $gte: today, // $gte means "greater than or equal to"
  //                   },
  //               }).sort({ date: 1 })
  res.status(200).json(events);
};

// Create events

const createEvents = async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ error: "Please add text field" });
  } else {
    try {
      const newEvent = { ...req.body, user: req.user.id };
      const createdEvent = await Event.create(newEvent);
      res.status(201).json(createdEvent);
    } catch (error) {
      res.status(500).json({ error: "Failed to create the event" });
    }
  }
};

// Update events
const updateEvents = async (req, res) => {
  // Get event id
  const eventId = req.params.eventId;
  console.log("Received Event ID for update:", eventId);
  // if no event id found
  if (!eventId) {
    return res
      .status(400)
      .json({ error: "Event ID is missing from the request parameters" });
  } else {
    try {
      const event = await Event.findOneAndUpdate({ _id: eventId }, req.body, {
        new: true,
      });
      console.log(event);
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the event" });
    }
  }
};

// Delete events
const deleteEvents = async (req, res) => {
  try {
    // Get event id
    const eventId = req.params.eventId;
    await Event.deleteOne({ _id: eventId });
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: "Unknown server error" });
  }
};

export { getEvents, createEvents, updateEvents, deleteEvents };
