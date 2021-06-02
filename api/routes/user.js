const express=require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const User = require('../model/user')

router.get('/',(req,res,next)=>{
    res.status(200).json({
        "message":"user route working"
    })
})

router.post('/',(req,res,next)=>{
bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err){
        return res.status(500).json({
            "message":"error",
            "error":err
        })
    }else{
        const user = new User({
            _id:new mongoose.Types.ObjectId,
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hash
        
        })
        user.save().then(result=>{
            res.status(200).json({
                "message":"user created successfully",
                "new user":result
            })
        }).catch(err=>{
            res.status(500).json({
                "error":err
            })
        })
    }
})
})






module.exports=router