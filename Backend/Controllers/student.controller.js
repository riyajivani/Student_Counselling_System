const studentSchema = require("../Models/student.model")
const message = require("../utils/message.json")
const enums = require("../utils/enums.json")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


module.exports = {
    createstudent : async(req,res) => {
        const { id, name, email, password, semester } = req.body;
        
        try{
            const studentExist = await studentSchema.find({id : id})

            if(studentExist.password)
            {
               return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_FOUND})
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password,salt)
            
            const create ={
                id,
                name,
                email,
                password : hash,
                semester
            }

            const studentdata = await studentSchema.create(create)

            if(studentdata)
            {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success: true , message : message.SIGNUP_SUCCESS})
            }
            else{
                return res
                        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                        .json({success: false, message: message.FAILED})
            }

        }
        catch(err){
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success:false , message: err.message})
        }
    },

    studentLogin : async (req,res) => {
        
        const {id, email, password} = req.body;

        try{
            const studentExist = await studentSchema.find({id : id})

            if(!studentExist)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_FOUND})
            }
            else if(!studentExist.password)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_FOUND})
            }

            const studentPassword = studentExist.password

            const isMatch = await bcrypt.compare(password, studentPassword)

            if(!isMatch)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({ success: false, message: message.NOT_MATCH})
            }

            const data = {
                _id : studentExist._id,
                id : studentExist.id,
                semester : studentExist.semester
            }

            const token = jwt.sign(data, process.env.JWT_SECRET)

            return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: message.LOGIN_SUCCESS, token, student: studentExist });

        }catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success:false , message: err.message})
        }
    },

    getAllStudent : async (req,res) => {
        
        try{
            const students = await studentSchema.find()

            if(student)
            {
                return res
				.status(enums.HTTP_CODE.OK)
                .json({success: true , student : students})
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
    },

    changePassword : async (req,res) => {
        
    }
}