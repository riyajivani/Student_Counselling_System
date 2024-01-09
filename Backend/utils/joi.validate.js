const Joi = require("joi")
const enums = require("../utils/enums.json")

module.exports = {

    validate4signup : (req, res, next) => {

        let schema = Joi.object().keys({
            id: Joi.string().required(),
            name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            semester: Joi.number()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },

    validate4login : (req, res, next) => {

        let schema = Joi.object().keys({
            id: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })

        let { error } = schema.validate(req.body)

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    }
}