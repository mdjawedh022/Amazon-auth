const express=require('express');
const bcrypt = require('bcrypt');
const { UserModel } = require('../model/users.model');
const jwt=require("jsonwebtoken")
const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{
    const {name,email,mobile,password}=req.body;
    try{
        bcrypt.hash(password, 4, async(err, hash)=>{
            if(err){
                console.log(err)
                res.status(400).send({"msg":err.message})
            }else{
                const user=new UserModel({name,email,mobile,password:hash})
            await user.save()
            res.status(200).send({"msg":"register has been successful!"})
            }
        })
    }catch(err){
        console.log(err)
        res.status(400).send({"msg":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
      const user=await UserModel.find({email})
      bcrypt.compare(password,user[0].password,(err,result)=>{
          if(result){
            let token = jwt.sign({ token:"amazon" }, 'jawed');
            res.send({"msg":"login done","token":token})
        }else{
            res.send({"msg":"login failed"})
            console.log(err)
        }
      })
    }catch(err){
        console.log(err)
    }
})



module.exports={
userRouter
}