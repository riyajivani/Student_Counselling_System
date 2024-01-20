const mongoose = require("mongoose")

const queryschema = new mongoose.Schema({
        query: {type : String},
        querybystudent : {type : mongoose.Schema.Types.ObjectId, ref : "student"},
        solvebyfaculty : {type : mongoose.Schema.Types.ObjectId, ref : "faculty"},
        solution : {type : String},
        mode : {type : String , default : "private"},
        status : {type : String , default : "Not solved"}
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
}
);

const query = new mongoose.model("query",queryschema,"query")
module.exports = query