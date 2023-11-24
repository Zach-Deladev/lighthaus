import Events from "../models/events.model";

// Get events

const getEvents = async (req, res) => {
  const events = await Events.find();
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
      const createdEvent = await Events.create(newEvent);
      res.status(201).json(createdEvent);
    } catch (error) {
      res.status(500).json({ error: "Failed to create the event" });
    }
  }
};

// Update events
const updateEvents = async (req, res) => {
  // Get event id
  const eventId = req.body._id;

  // if no event id found
  if (!eventId) {
    return res
      .status(400)
      .json({ error: "Event ID is missing from the request parameters" });
  } else {
    try {
      const event = await Events.findOneAndUpdate({ _id: eventId }, req.body);
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
    const eventId = req.body._id;
    await Events.deleteOne({ _id: eventId });
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: "Unknown server error" });
  }
};

module.exports = {
  getEvents,
  createEvents,
  updateEvents,
  deleteEvents,
};
