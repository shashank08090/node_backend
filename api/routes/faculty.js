const express=require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({
        
        "message":"this is faculty GET  request"
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        "message":"this is faculty POST request"
    })
})

















module.exports = router