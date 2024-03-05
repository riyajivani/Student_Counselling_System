const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    Comment : {type : String},
    queryId : {type : mongoose.Schema.Types.ObjectId, ref : "query"},
    student : {type : mongoose.Schema.Types.ObjectId, ref : "student"},
    like : {type : Number, default : 0}
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
}
);

const comment = mongoose.model("comment",commentSchema,"comment")
module.exports=comment;
