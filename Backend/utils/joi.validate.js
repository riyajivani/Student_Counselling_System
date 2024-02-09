const Joi = require("joi")
const enums = require("../utils/enums.json")

module.exports = {

    validate4signup : (req, res, next) => {

        let schema = Joi.object().keys({
            id: Joi.string().required(),
            name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
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
    },
    validate4loginadmin : (req, res, next) => {

        let schema = Joi.object().keys({
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
    },

    validate4askQuery : (req,res,next) => {
        let schema = Joi.object().keys({
            question : Joi.string().required(),
            sid : Joi.string().required()
        })

        let { error } = schema.validate(req.body)
        if(error){
            return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({success : false , message : error.details[0].message})
        }

        else{
            next();
        }
    },

    validate4createstudent : (req, res, next) => {

        let schema = Joi.object().keys({
            id : Joi.string().required(),
            semester : Joi.number().required(),
            batch : Joi.string().required()
        })

        let { error } = schema.validate(req.body)

        if(error)
        {
            return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({success : false , message : error.details[0].message})
        }
        else{
            next()
        }
    },
    
    validate4createfaculty : (req, res, next) => {

        let schema = Joi.object().keys({
            id : Joi.string().required()
        })

        let { error } = schema.validate(req.body)

        if(error)
        {
            return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({success : false , message : error.details[0].message})
        }
        else{
            next()
        }
    },

    validate4delete : (req, res, next) => {

        let schema = Joi.object().keys({
            id : Joi.string().required()
        })

        let { error } = schema.validate(req.body)

        if(error)
        {
            return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({success : false , message : error.details[0].message})
        }
        else{
            next()
        }
    },

    validate4changeMode : (req, res, next) => {
            
            let schema = Joi.object().keys({
                qid : Joi.string().required(),
                mode : Joi.string().required()
            })
    
            let { error } = schema.validate(req.body)
    
            if(error)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : error.details[0].message})
            }
            else{
                next()
            }
    }

    

}