const express = require("express")
const router = express.Router()
const {registerUser,loginUser,getUser,logoutUser} = require("../controllers/user.controller")


router.post("/", registerUser)

router.post("/login", loginUser)

router.get("/me", getUser)

router.post("/logout", logoutUser)

module.exports = router