const express = require("express")
const router = express.Router()
const facultyController = require("../Controllers/faculty.controller")
const { validate4signup, validate4login, validation4solvequery, validate4solveSharedQuery } = require("../utils/joi.validate")
const queryController = require("../Controllers/query.controller")


router.put("/createfaculty", validate4signup, facultyController.createFaculty)
router.post("/login", validate4login, facultyController.facultyLogin)
router.post("/getstudents", facultyController.getStudentsByBatch)
router.post("/getquery", queryController.displayQueryToFaculty)
router.get("/publicquery", queryController.publicQuery)
router.post("/querybystatus", queryController.displayQueryByStatusForFaculty)
router.put("/solvequery", validation4solvequery, queryController.solveQuery)
router.put("/sharequery", queryController.shareQueryToFaculty)
router.post("/getsharedquery", queryController.displaySharedQueryToOtherFaculty)
router.post("/sharedquery", queryController.displaySharedQueryForFaculty)
router.put("/removesharequery", queryController.removeSharedQuery)
router.put("/solvesharedquery", validate4solveSharedQuery, queryController.solveSharedQuery)
router.get("/getfaculties", facultyController.getAllfaculty)


module.exports = router