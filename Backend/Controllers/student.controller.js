const studentSchema = require("../Models/student.model")
const facultySchema = require("../Models/faculty.model")
const message = require("../utils/message.json")
const enums = require("../utils/enums.json")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    createstudent : async(req,res) => {

        const { id, name, email, password} = req.body;
        
        try{
            const studentExist = await studentSchema.find({id : id})

            if(studentExist.length==0)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.ID_NOT_EXIST})
            }
            
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
                password : hash,
                role : "student"
            }

            const studentd = await studentSchema.updateOne({id: studentExist[0].id},{$set: create})

            if(studentd)
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
        
        const {id, password} = req.body;
        try{
            const studentExist = await studentSchema.find({id : id})

            if(!studentExist)
            {   
                // console.log(studentExist);
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_FOUND})
            }
            if(!studentExist[0].password)
            {
                // console.log(studentExist);
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_FOUND})
            }

            const studentPassword = studentExist[0].password

            const isMatch = await bcrypt.compare(password, studentPassword)

            if(!isMatch)
            {
                console.log(studentExist);
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({ success: false, message: message.NOT_MATCH})
            }

            const data = {
                _id : studentExist[0]._id,
                id : studentExist[0].id,
                semester: studentExist[0].sem
            }
            
           const token = jwt.sign(data, process.env.JWT_SECRET);
           let faculty = {};
           if(studentExist[0].facultyId)
           {
            const facultydata = await facultySchema.findOne({ _id : studentExist[0].facultyId})

            faculty = {
                id : facultydata.id,
                name : facultydata.name,
                email: facultydata.email,
                image: facultydata.image
            }
           }

           const student = {
               id : studentExist[0].id,
               name : studentExist[0].name,
               batch : studentExist[0].batch,
               semester : studentExist[0].sem,
               email : studentExist[0].email,
               facultyId : studentExist[0].facultyId,
               total_query: studentExist[0].total_query,
               image: studentExist[0].image,
           } 

            return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: message.LOGIN_SUCCESS, token, student, faculty});

        }catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success:false , message: err.message})
        }
    },
    

    changePassword : async (req,res) => {
        
    },

    displayAllStudentsByBatch : async (req,res) => {
        const { batch } = req.body
       try{
            const students = await studentSchema.find({batch : batch}).sort({ id: 1 }).exec()
            if(students.length==0)
            {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : false , message : message.NO_STUDENTS})
            }
            return res
                    .status(enums.HTTP_CODE.OK)
                    .json({success : true , message : message.SUCCESS, students})
       } catch(error){
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success:false , message: error.message})
       }  
    },

    setProfileImage: async (req, res) => {
        const { id, image } = req.body

        try {
            const studentExist = await studentSchema.find({ id: id })

            if (!studentExist) {
                console.log(studentExist);
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: message.USER_NOT_FOUND })
            }

            const update = await studentSchema.updateOne({ id: id }, { $set: { image: image } });

            if (update) {
                return res
                    .status(enums.HTTP_CODE.OK)
                    .json({ success: true, message: message.SUCCESS })
            }
            else {
                return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: message.FAILED })
            }
        }
        catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message })
        }
    },
}