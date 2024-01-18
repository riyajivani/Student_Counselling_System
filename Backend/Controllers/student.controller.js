const studentSchema = require("../Models/student.model")
const message = require("../utils/message.json")
const enums = require("../utils/enums.json")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    createstudent : async(req,res) => {

        //console.log(req.body)
        const { id, name, email, password} = req.body;
        
        try{
            const studentExist = await studentSchema.find({id : id})

            console.log(studentExist)

            if(studentExist.length==0)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.ID_NOT_EXIST})
            }
            
            console.log(studentExist[0].password)
            if(studentExist[0].password)
            {
               return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_ALREADY_EXIST})
            }
            
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password,salt)
            
            const create ={
                id: id,
                name: name,
                email: email,
                password : hash
            }

            const studentdata = await studentSchema.updateOne({id: studentExist[0].id},{$set: create})
            //const studentdata = await studentSchema.create(create)
            console.log(studentdata)
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
        
        const {id,password} = req.body;

        try{
            const studentExist = await studentSchema.find({id : id})

            if(!studentExist)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_FOUND})
            }
            //console.log(studentExist[0].password)
            if(!studentExist[0].password)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_FOUND})
            }

            const studentPassword = studentExist[0].password

            const isMatch = await bcrypt.compare(password, studentPassword)

            if(!isMatch)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({ success: false, message: message.NOT_MATCH})
            }

            const data = {
                _id : studentExist[0]._id,
                id : studentExist[0].id,
                semester : studentExist[0].semester
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

            if(students.length!=0)
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