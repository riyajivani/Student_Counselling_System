const mongoose = require("mongoose")

const studentschema = new mongoose.Schema({
        id : {type : String},
        name: {type : String},
        email :{type : String},
        password: { type: String },
        semester : {type : Number},
        batch : {type : String},
        totalquery : {type : Number,default : 0},
        facultyId : {type : mongoose.Schema.Types.ObjectId, ref : "faculty"}
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
}
);

const student = new mongoose.model("student",studentschema,"student")
module.exports = student