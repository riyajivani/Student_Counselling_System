const express = require("express")
const router = express.Router()
const facultyController = require("../Controllers/faculty.controller")
const { validate4signup ,validate4login } = require("../utils/joi.validate")
const queryController = require("../Controllers/query.controller")


router.put("/createfaculty", validate4signup, facultyController.createFaculty)
router.post("/login", validate4login, facultyController.facultyLogin)
router.post("/getstudents", facultyController.getStudentsByBatch)
router.post("/getquery", queryController.displayQueryToFaculty)
router.get("/publicquery", queryController.publicQuery)
router.get("/querybystatus", queryController.queryByStatusForFaculty)


module.exports = router