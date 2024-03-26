const express = require("express")
const app = express()
const Cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

<<<<<<< HEAD

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
=======
const PORT = process.env.PORT || 3000;

>>>>>>> 38eb09c87e5b3f1ef0f3006c6b14284d09e75154
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.static("files"));
app.use(Cors());
app.use('/upload',express.static('upload'));



const studentroutes = require("./routes/student.routes")
const facultyrouter = require("./routes/faculty.routes")
const adminrouter = require("./routes/admin.routes")
require("dotenv").config()
require("./database")


app.get('/',(req, res)=>{
    console.log("welcome to Student Counselling App");
    res.send("Welcome")
})

app.use("/student",studentroutes)  
app.use("/faculty",facultyrouter)
app.use("/admin",adminrouter)







app.listen(PORT, () => {
    console.log(`server is Started on ${PORT} !!`)
})