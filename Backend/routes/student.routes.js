const express = require("express")
const router = express.Router()
const studentController = require("../Controllers/student.controller")
const queryController = require("../Controllers/query.controller")
const commentController = require("../Controllers/comment.controller")
const { validate4signup, validate4login, validate4askQuery, validate4changeMode } = require("../utils/joi.validate")


router.put("/createstudent", validate4signup, studentController.createstudent)
router.post("/login", validate4login, studentController.studentLogin)
router.post("/askmentor", validate4askQuery, queryController.askMentor)
router.put("/changemode", validate4changeMode, queryController.changeMode)
router.get("/publicquery", queryController.publicQuery)
router.post("/getquery",queryController.displayQueryBySatusForStudent)
router.post("/getstudentsbybatch",studentController.displayAllStudentsByBatch)
router.post("/comment",commentController.addComment)
router.post("/comments",commentController.getComments)
router.put("/setprofileimage", studentController.setProfileImage)


module.exports = router