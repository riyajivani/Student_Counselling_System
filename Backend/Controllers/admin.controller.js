const adminSchema = require("../Models/admin.model")
const message = require("../utils/message.json")
const enums = require("../utils/enums.json")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


module.exports = {

    // createAdmin : async (req,res) => {

    //     const {id, name, email, password} = await req.body

    //     try{
    //         const adminExist = await adminSchema.find({id : id})

    //         if(adminExist.password)
    //         {
    //            return res
    //                     .status(enums.HTTP_CODE.BAD_REQUEST)
    //                     .json({success : false , message : message.USER_ALREADY_EXIST})
    //         }
    //         const salt = await bcrypt.genSalt(10);
    //         const hash = await bcrypt.hash(password,salt)
            
    //         const create ={
    //             id,
    //             name,
    //             email,
    //             password : hash
    //         }

    //         const admindata = await adminSchema.create(create)

    //         if(admindata)
    //         {
    //             return res
    //                     .status(enums.HTTP_CODE.OK)
    //                     .json({success: true , message : message.SIGNUP_SUCCESS})
    //         }
    //         else{
    //             return res
    //                     .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
    //                     .json({success: false, message: message.FAILED})
    //         }

    //     }catch(err){
    //         return res
    //                 .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
    //                 .json({success:false , message: err.message})
    //     }
    // },

    adminLogin : async (req,res) => {
        
        const { email, password} = req.body;

        try{
            const adminExist = await adminSchema.findOne({email : email})

            if(!adminExist)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_FOUND})
            }

            const adminPassword = adminExist.password

            // const isMatch = await bcrypt.compare(password, adminPassword)

            const isMatch = (adminPassword === password)

            if(!isMatch)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({ success: false, message: message.NOT_MATCH})
            }

            const data = {
                _id : adminExist._id,
                email : adminExist.email
            }

            const token = jwt.sign(data, process.env.JWT_SECRET)

            return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: message.LOGIN_SUCCESS, token, admin: adminExist });

        }catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success:false , message: err.message})
        }
    },

    getAlladmin : async (req,res) => {
        
        try{
            const admin = await adminSchema.find()

            if(admin)
            {
                return res
				.status(enums.HTTP_CODE.OK)
                .json({success: true , admin : admin})
            }
            else
            {
                return res  
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        ,json({success: false , message : message.USER_NOT_FOUND})
            }
        }catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success:false , message: err.message})
        }
    }
}