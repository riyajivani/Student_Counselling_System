const mongoose = require("mongoose")

const adminschema = new mongoose.Schema({
    id : {type : String},
    email :{type : String},
    password : {type : String}
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
}
);

const admin = new mongoose.model("admin",adminschema,"admin")
module.exports = admin