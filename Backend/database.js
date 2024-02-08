const mongoose = require("mongoose")

const db = mongoose.connect("mongodb+srv://monilghori:monil343@project.dblil8c.mongodb.net/Student_counselling_system?retryWrites=true&w=majority",{socketTimeoutMS: 0}).catch((err) => {console.log(err)});

module.exports = db;

// console.log("hello")

// const schema = new mongoose.Schema({
//     id : String,
//     name: String,
//     emain :String,
//     sem : Number,
//     batch : String
// })
// async function insertStudent ()
// {
//     try{
//         const Student = new mongoose.model("Student",schema)

//         const student = new Student({
//             id : '21ITUOS001',
//             name : "priyansh",
//             email : "priyansh@gmail.com",
//             sem : 6,
//             batch : "A"
//         })
//       const rs = await student.save()
//     }catch(err){
//         console.log(err);
//     }
    
// }

// insertStudent()
// mongoose.connection.close();