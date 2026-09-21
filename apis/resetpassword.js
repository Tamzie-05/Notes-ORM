require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const { hashPassword } = require('../util/passwords');

const User = require('../models/users')

const resetPassword = express.Router()

resetPassword.post('/',async(req,res)=>{
    try{
        const{resetToken , newPassword} = req.body;
        if(!resetToken || !newPassword?.trim()){
            return res.status(400).json({message:'Reset Token and new password are required'});
        }
        let decoded;
        try{
            decoded = jwt.verify(resetToken , process.env.JWT_SECRET);
        }catch(err){
            return res.status(401).json({message : 'Invalid or expired reset  token'});
        }
        if(decoded.purpose !== 'password-reset'){
            return res.status(401).json({message : 'Invalid reset token'});
        }
        const user = await User.findByPk(decoded.id);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        const hashedPassword = await hashPassword(newPassword);
        await user.update({password : hashedPassword});
        res.json({message:'Password reset successful'});
    }catch(err){
        console.log("JWT_ERROR : ",err.message)
        res.status(500).json({message : err.message});
    }
});

module.exports = resetPassword;