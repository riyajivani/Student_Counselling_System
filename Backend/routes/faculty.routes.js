const express = require("express")
const router = express.Router()
const facultyController = require("../Controllers/faculty.controller")
const { validate4signup ,validate4login } = require("../utils/joi.validate")


router.post("/createfaculty",validate4signup,facultyController.createFaculty)
router.post("/login",validate4login,facultyController.facultyLogin)


module.exports = router