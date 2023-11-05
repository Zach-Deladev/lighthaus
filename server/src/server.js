const express = require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/error.middleware")
const port = process.env.PORT || 5000
const colors = require("colors")

// Database connection
connectDB();

// Initialise express

const app = express();

// Add middleware

app.use(express.json())

// Routes references 

app.use("/api/events", require("./routes/events.routes"))
app.use("/api/users", require("./routes/user.routes"))
// Error handler

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));