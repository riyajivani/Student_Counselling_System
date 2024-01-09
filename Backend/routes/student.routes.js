const express = require("express")
const router = express.Router()
const studentController = require("../Controllers/student.controller")
const { validate4signup ,validate4login } = require("../utils/joi.validate")


router.post("/createstudent",validate4signup,studentController.createstudent)
router.post("/login",validate4login,studentController.studentLogin)


module.exports = router