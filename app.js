const express= require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const StudentRoute= require('./api/routes/student')
const FacultyRoute= require('./api/routes/faculty')
app.use('/student',StudentRoute)
app.use('/faculty',FacultyRoute)


mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true,useUnifiedTopology:true});

mongoose.connection.on('connected',connected=>{
    console.log("connected successfully with the database")
})

mongoose.connection.on('error',error=>{
    console.log("could not connect with database")
})

// app.use((req,res,next)=>{
//     res.status(200).json({
//         "message":"app is running fine again with  nodemon"
//     })
// })


app.use((req,res,next)=>{
    res.status(404).json({
        "message" :"BRUTALSKY URL NOT FOUND "
    })
})

module.exports=app