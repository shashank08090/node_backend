const mongoose = require('mongoose')

const studentSchema= new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:String,
    email:String,
    phone:Number,

})

module.exports = mongoose.model('Student',studentSchema)