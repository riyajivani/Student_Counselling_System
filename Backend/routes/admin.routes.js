const express = require("express")
const router = express.Router()
const adminController = require("../Controllers/admin.controller")
const { validate4loginadmin , validate4createstudent, validate4delete, validate4createfaculty} = require("../utils/joi.validate")
const { authAdmin } = require("../middlewere/auth")

router.post("/login", validate4loginadmin, adminController.adminLogin)
router.put("/assignfaculty", authAdmin, adminController.assignFaculty)
router.post("/createstudent", authAdmin, validate4createstudent, adminController.createStudent)
router.delete("/deletestudent",authAdmin, validate4delete, adminController.deleteStudent)
router.post("/createfaculty",authAdmin, validate4createfaculty, adminController.createFaculty)
router.delete("/deletefaculty",authAdmin, validate4delete, adminController.deleteFaculty)
router.get("/getallstudents", adminController.getAllStudent)
router.get("/getallfaculties", adminController.getAllfaculty)
router.get("/getallQuestion", adminController.getAllQuery)

module.exports = router