const express = require("express")
const router = express.Router()
const facultyController = require("../Controllers/faculty.controller")
const { validate4signup ,validate4login } = require("../utils/joi.validate")
const queryController = require("../Controllers/query.controller")


router.put("/createfaculty",validate4signup,facultyController.createFaculty)
router.post("/login",validate4login,facultyController.facultyLogin)
router.get("/getstudents",facultyController.getStudentsByBatch)
router.get("/getquery",queryController.displayQueryToFaculty)


module.exports = router