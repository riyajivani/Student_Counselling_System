const mongoose = require("mongoose")

const facultyschema = new mongoose.Schema({
        id : {type : String},
        name: {type : String},
        email :{type : String},
        batch : {type : String, require : true},
        img: { 
            data: Buffer, 
            contentType: String 
          },
        totalquery : {type : Number , default : 0},
        solvedquery : {type : Number, default : 0},
        remainingquery : {type : Number, default : 0},
        
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
}
);

const faculty = new  mongoose.model("faculty",facultyschema,"faculty")
module.exports = faculty