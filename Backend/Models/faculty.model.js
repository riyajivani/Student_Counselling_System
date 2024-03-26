const mongoose = require("mongoose")

const facultyschema = new mongoose.Schema({
        id : {type : String},
        name: {type : String},
        email :{type : String},
        password : {type : String},
        //batch : {type : String},
        // img: { 
        //     data: Buffer, 
        //     contentType: String 
        //   },
        total_query : {type : Number , default : 0},
        solved_query : {type : Number, default : 0},
        remaining_query : {type : Number, default : 0},
    role: { type: String },
    image: { type: String, default: null }
        
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
}
);

const faculty = new  mongoose.model("faculty",facultyschema,"faculty")
module.exports = faculty