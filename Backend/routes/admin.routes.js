const express = require("express")
const router = express.Router()
const adminController = require("../Controllers/admin.controller")
const { validate4login } = require("../utils/joi.validate")

router.post("/login",validate4login,adminController.adminLogin)

module.exports = router