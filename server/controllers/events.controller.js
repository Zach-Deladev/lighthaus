

const Events = require("../models/events.model")

// Get events 

const getEvents = async (req, res) => {
    const events = await Events.find()
    res.status(200).json(events)
}

// Create events

const createEvents = async (req, res) => {

  if (!req.body.title) {
    res.status(400).json({ error: "Please add text field" });
  } else {
    try {
      const event = await Events.create(req.body);
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to create the event" });
    }
  }
}

// Update events
const updateEvents = async(req, res) => {

     // Get event id 
     const eventId = req.body._id;

     // if no event id found
     if (!eventId) {
         return res.status(400).json({ error: "Event ID is missing from the request parameters" });
       } else {
         try {
             const event = await Events.findOneAndUpdate({_id: eventId}, req.body)
             console.log(event)
             res.json(event)
 
         } catch (error) {
             res.status(500).json({ error: "Failed to update the event" });
         }
       }
 

}

// Delete events
const deleteEvents = async(req, res) => {
   
        try {
             // Get event id 
            const eventId = req.body._id;
            await Events.deleteOne({_id: eventId})
            res.status(200).send();
        } catch (error) {
            res.status(500).json({ error: "Unknown server error" });
        }  
}

module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}