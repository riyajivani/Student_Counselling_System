const jwt = require('jsonwebtoken');
const messages = require("../utils/message.json")
const enums = require("../utils/enums.json")
const adminSchema = require("../Models/admin.model")
const facultySchema = require("../Models/faculty.model")
require("dotenv").config()

module.exports = {
    authAdmin: async (req, res, next) => {
        let token;
        const { authorization } = req.headers;
        if (authorization && authorization.startsWith("Bearer")) {
            try {
                token = authorization.split(" ")[1];
                if (!token) {
                    return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({ success: false, message: messages.INVALID_TOKEN })
                }
                const user = jwt.verify(token, process.env.JWT_SECRET);
                console.log(user)
                req.user = await adminSchema.findOne({_id : user._id})

                if (req.user.role === "admin") {
                    next();
                } else {
                    return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({ success: false, message: messages.NOT_AUTHORIZED })
                }
            } catch (err) {
                return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: err.message })
            }
        } else {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: messages.INVALID_TOKEN_TYPE })
        }
    }
}