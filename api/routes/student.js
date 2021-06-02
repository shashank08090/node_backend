const express=require('express')
const router = express.Router()
const Student = require('../model/student')
const mongoose = require('mongoose');

router.get('/',(req,res,next)=>{
    
    Student.find().then(result=>{
        res.status(200).json({
            studentData:result
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            errors:err
        })
    })
})

router.post('/',(req,res,next)=>{
    const student=new Student({
        _id: new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    })

    student.save().then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent:result
        })
    }).catch(error=>{
        console.log(error)
        res.status(500).json({
            errorrs:error
        })
    })

})

router.delete('/:id',(req,res,next)=>{
Student.remove({_id:req.params.id}).then(result=>{
    res.status(200).json({
        "message":"data deleted"
    })
}).catch(err=>res.status(500).json({
    "message":"could not delete data",
    "errror":err
}))
})


router.put('/:id',(req,res,next)=>{
    console.log(req.params.id)
    
})














module.exports = router