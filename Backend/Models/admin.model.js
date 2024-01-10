const mongoose = require("mongoose")

const adminschema = new mongoose.Schema({
    email :{type : String},
    password : {type : String},
    role : {type : String}
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
}
);

const admin = new mongoose.model("admin",adminschema,"admin")
module.exports = admin