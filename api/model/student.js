const mongoose = require('mongoose')

const studentSchema= new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:String,
    email:String,
    phone:Number,
    password:String

})

module.exports = mongoose.model('Student',studentSchema)