const studentSchema = require("../Models/student.model")
const message = require("../utils/message.json")
const enums = require("../utils/enums.json")
const bcrypt = require("bcryptjs")


module.exports = {
    createstudent : async(req,res) => {
        const { id, name, email, password, semester } = res.body;
        
        try{
            const studentExist = await studentSchema.find({id : id})

            if(student.password)
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
                password,
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
        catch(err){}
        
        
    }
}