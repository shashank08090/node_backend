const express=require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const User = require('../model/user')
const jwt = require('jsonwebtoken')

router.get('/',(req,res,next)=>{
    res.status(200).json({
        "message":"user route working"
    })
})

router.post('/signup',(req,res,next)=>{
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

router.post('/login',(req,res,next)=>{
    User.find({name:req.body.name}).exec().then(user=>{
        if(user.length<1){
            return res.status(401).json({
                "message":"user does not exist"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
                return res.status(401).json({
                    "message":"password does not match"
                })
            }
            if(result){
                const token = jwt.sign({
                    name:user[0].name,
                    email:user[0].email

                },"XXsecretkeyXX",{
                    expiresIn:"24h"
                })
                res.status(200).json({
                    "username":user[0].username,
                    email:user[0].email,
                    token:token
                })
            }
        })
    }).catch(err=>{
        res.status(500).json({
            "message":"err"
        })
    })
})




module.exports=router