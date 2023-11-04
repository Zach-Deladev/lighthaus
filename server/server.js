const express = require("express")
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/error.middleware")
const port = process.env.PORT || 5000

// Initialise express

const app = express();

// Add middleware

app.use(express.json())

app.use(express.urlencoded({extended: false}))

// Routes references 

app.use("/api/events", require("./routes/events.routes"))

// Error handler

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));