const facultySchema = require("../Models/faculty.model")
const studentSchema = require("../Models/student.model")
const message = require("../utils/message.json")
const enums = require("../utils/enums.json")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {

    createFaculty : async (req,res) => {

        const {id, name, email, password} = await req.body

        try{
            const facultyExist = await facultySchema.find({id : id})
            //console.log(facultyExist)
            if(facultyExist.length==0)
            {
               return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.ID_NOT_EXIST})
            }

            else if(facultyExist[0].password)
            {
               return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_ALREADY_EXIST})
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password,salt)
            
            const create ={
                id,
                name,
                email,
                password : hash,
                role : "faculty"
            }

            const facultydata = await facultySchema.updateOne({id : facultyExist[0].id},{$set : create})

            if(facultydata)
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

        }catch(err){
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success:false , message: err.message})
        }
    },

    facultyLogin : async (req,res) => {
        
        const {id, password} = req.body;

        try{
            const facultyExist = await facultySchema.findOne({id : id})

            if(!facultyExist)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_FOUND})
            }
            else if(facultyExist)
            {
                if(!facultyExist.password)
                {
                    return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_FOUND})
                }
                
            }

            const facultyPassword = facultyExist.password

            const isMatch = await bcrypt.compare(password, facultyPassword)

            if(!isMatch)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({ success: false, message: message.NOT_MATCH})
            }

            const data = {
                _id : facultyExist._id,
                id : facultyExist.id,
                name : facultyExist.name
            }

            const token = jwt.sign(data, process.env.JWT_SECRET)

            return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: message.LOGIN_SUCCESS, token, faculty: facultyExist });

        }catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success:false , message: err.message})
        }
    },

    changePassword : async (req,res) => {
        
    },

    getStudentsByBatch : async (req , res) => {
        const { id } = await req.body

        const facultyExist = await facultySchema.findOne({id : id})

        const students = await studentSchema.find({ facultyId : facultyExist._id})

        if(students.length == 0)
        {
            return res 
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({success : false , message : message.NOT_ASSIGNED})
        }
        // const studentsWithInfo = await Promise.all(students.map(async (student) => {
        //    const studentdata = await studentSchema.findOne({id : student.id})
        else{
            return res
                    .status(enums.HTTP_CODE.OK)
                    .json({success : true , message : message.SUCCESS , students : students})
        }
    },
    getAllfaculty: async (req, res) => {

        try {
            const faculty = await facultySchema.find()

            if (faculty) {
                return res
                    .status(enums.HTTP_CODE.OK)
                    .json({ success: true, faculty: faculty })
            }
            else {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    , json({ success: false, message: message.USER_NOT_FOUND })
            }
        } catch (err) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: err.message })
        }
    }

}