const express = require("express")
const router = express.Router()
const studentController = require("../Controllers/student.controller")
const queryController = require("../Controllers/query.controller")
const { validate4signup ,validate4login ,validate4askQuery} = require("../utils/joi.validate")


router.put("/createstudent",validate4signup,studentController.createstudent)
router.post("/login",validate4login,studentController.studentLogin)
router.post("/askmentor",validate4askQuery,queryController.askMentor)



module.exports = router