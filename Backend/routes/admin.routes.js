const express = require("express")
const router = express.Router()
const adminController = require("../Controllers/admin.controller")
const { validate4loginadmin } = require("../utils/joi.validate")

router.post("/login",validate4loginadmin,adminController.adminLogin)
router.post("/assignfaculty",adminController.assignFaculty)

module.exports = router