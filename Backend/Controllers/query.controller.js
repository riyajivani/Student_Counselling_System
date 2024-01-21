const querySchema = require("../Models/query.model")
const studentSchema = require("../Models/student.model")
const facultySchema = require("../Models/faculty.model")
const message = require("../utils/message.json")
const enums = require("../utils/enums.json")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

module.exports = {

    askMentor : async (req, res) => {

        const {question , sid} = await req.body
        try{
            
            const student = await studentSchema.findOne({id : sid})
            const faculty = await facultySchema.findOne({ _id : student.facultyId })

            let totalqueryOfFaculty = parseInt(faculty.totalquery)
            let remainingquery = parseInt(faculty.remainingquery)

            totalqueryOfFaculty += 1
            remainingquery += 1

            let totalquery = parseInt(student.totalquery)
            totalquery += 1
        
            const que = {
                query : question,
                querybystudent : student._id
            }

            const querydata = await querySchema.create(que)
            const studentdata = await studentSchema.updateOne({ id : sid }, { $set : { totalquery : totalquery }})
            const facultydata = await facultySchema.updateOne({id : faculty.id}, {$set : { totalquery : totalqueryOfFaculty, remainingquery : remainingquery}})

            if(querydata && studentdata && facultydata)
            {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true , message : message.QUERY_SUCCESS})
            }
            else{
                return res
                        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                        .json({success : false , message : message.FAILED})
            }
        }
        catch(err){
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false , message : err.message})
        }
    },

    solveQuery : async (req, res) => {

    }

}