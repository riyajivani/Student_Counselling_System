const adminSchema = require("../Models/admin.model")
const facultySchema = require("../Models/faculty.model")
const studentSchema = require("../Models/student.model")
const message = require("../utils/message.json")
const enums = require("../utils/enums.json")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const admin = require("../Models/admin.model");


module.exports = {

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
                email : adminExist.email,
                role : admin.role
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
    },

    assignFaculty : async (req, res) => {
        
        const { batch , fid} = await req.body
        try{
            const facultyExist = await facultySchema.findOne({ id : fid })

            if(!facultyExist)
            {
                return res      
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.FACULTY_NOT_EXIST})
            }
            // const student = await studentSchema.updateOne({id : sid}, {$set : { facultyId : facultyExist._id}})
            const student = await studentSchema.updateMany({batch : batch}, {$set : { facultyId : facultyExist._id}})
            if(student)
            {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true , message : message.ASIGN_SUCCESS })
            }
            else{
                return res 
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.FAILED})
            }

        }
        catch(err)
        {
            return res 
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false , message : err.message})
        }
    },

    createStudent : async (req,res) => {

        const { id , semester , batch } = await req.body

        try{

            const studentExist = await studentSchema.findOne({id : id})

            if(studentExist)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_ALREADY_EXIST})
            }

            const data = {
                id,
                semester,
                batch
            }

        
            const student = await studentSchema.create(data)

            if(student)
            {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true , message : message.CREATE_SUCCESS})
            }
            else{
                return res  
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.FAILED})
            }
        }catch(err)
        {
            return res  
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false ,message : err.message})
        }
    },

    deleteStudent : async (req,res) => {
        const { id } = await req.body

        try{

            const studentExist = await studentSchema.findOne({id : id})

            if(!studentExist)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_EXIST})
            }
            const data = await studentSchema.deleteOne({id : id})

            if(data)
            {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true , message : message.DELETE_SUCCESS})
            }
            else{
                return res 
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_EXIST})
            }
        }catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false , message : err.message})
        }
    },

    updatestudent : async (req,res) => {},

    createFaculty : async (req,res) => {

        const { id } = await req.body

        try{

            const facultyExist = await facultySchema.findOne({id : id})

            if(facultyExist)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_ALREADY_EXIST})
            }

            const data = {
                id
            }

        
            const faculty = await facultySchema.create(data)

            if(faculty)
            {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true , message : message.CREATE_SUCCESS})
            }
            else{
                return res  
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.FAILED})
            }
        }catch(err)
        {
            return res  
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false ,message : err.message})
        }
    },

    deleteFaculty : async (req,res) => {
        const { id } = await req.body

        try{

            const facultyExist = await facultySchema.findOne({id : id})

            if(!facultyExist)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_EXIST})
            }
            const data = await facultySchema.deleteOne({id : id})

            if(data)
            {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true , message : message.DELETE_SUCCESS})
            }
            else{
                return res 
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false , message : message.USER_NOT_EXIST})
            }
        }catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false , message : err.message})
        }
    },
    
    updateFaculty : async (req,res) => {},

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

    getAllfaculty : async (req,res) => {
        
        try{
            const faculty = await facultySchema.find()

            if(faculty)
            {
                return res
				.status(enums.HTTP_CODE.OK)
                .json({success: true , faculty : faculty})
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