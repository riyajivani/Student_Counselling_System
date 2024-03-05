const commentSchema = require("../Models/comment.model.js");
const studentSchema = require("../Models/student.model.js");
const querySchema = require("../Models/query.model.js");
const enums = require("../utils/enums.json");
const message = require("../utils/message.json");


module.exports = {
    addComment : async (req, res) => {
        const { qid, sid, comment } = req.body;
        try{

            const studentdata = await studentSchema.findOne({id : sid});
    
            const commentdata = {
                Comment : comment,
                queryId : qid,
                student : studentdata._id
            }
    
            const data = await commentSchema.create(commentdata);
    
            if (data) {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true, message : message.COMMENT_SUCCESS})
            } else {
                return res
                        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                        .json({success : false, message : message.FAILED})
            }
        }catch(error)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false, message : error.message})
        }
    },
    getComments : async (req, res) => {
        const { qid } = req.body;
        try{
            const comment = await commentSchema.find({queryId : qid}).populate("student");
            if(comment.length>0)
            {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true, message : message.SUCCESS, comment})
            }
            else{
                return res
                        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                        .json({success : false, message : message.FAILED})
            }
        }catch(error)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false, message : error.message})
        }
    }
}