const User = require('../models/users');
const { hashPassword } = require('../util/passwords');
const express = require('express');
const validate = require('../middleware/validate')
const {registerSchema} = require('../validations/authvalidation')
require('dotenv').config()

const register = express.Router();

register.post('/',validate(registerSchema),async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        if(!name?.trim() || !email?.trim() || !password?.trim()){
            return res.status(422).json({message:"All fields are required"});
        }

        const hashedPassword = await hashPassword(password);

        const existingUser = await User.findOne({
            where:{email:email}
        });
        if(existingUser){
            return res.status(409).json({message:"A user with this email is already registered"});
        }
        
       const tamar = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        if(tamar){
            return res.status(201).json({message:"Successful registration"})
        }
        if(!tamar){
            return res.json({message:"Something went wrong. Please try again"})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
        
    }
});

module.exports = register;