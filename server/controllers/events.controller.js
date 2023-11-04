
// Async handler
const asyncHandler = require("express-async-handler")


// Get events 
const getEvents = asyncHandler( async(req, res) => {
    res.status(200).json({message: "Get events"})
})
// Create events

const createEvents = asyncHandler( async(req, res) => {
   if(!req.body.text) {
res.status(400)
throw new Error("Please add text field")

   }
    res.status(200).json({message: "Create events"})
})

// Update events
const updateEvents = asyncHandler( async(req, res) => {
    res.status(200).json({message: `Update goal  ${req.params.id}`})
})

// Delete events
const deleteEvents = asyncHandler( async(req, res) => {
    res.status(200).json({message: `Delete goal  ${req.params.id}`})
})

module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}