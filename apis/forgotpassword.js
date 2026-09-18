require('dotenv').config()

const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const User = require('../models/users');
const express = require('express');

const forgotPassword =  express.Router();
forgotPassword.post('/',async (req,res)=>{
    try{
       const email = req.body.email?.trim();
        if(!email){
            return res.status(400).json({message:"Email is required"});
        }
        const user = await User.findOne({
    where: {
        email: email
    }
});
if (!user){
    return res.status(404).json({message:"User not found"});
}
const resetToken = jwt.sign(
    {
        id: user.id,
        purpose:'password-reset'
    },
    process.env.JWT_SECRET,
    {
        expiresIn: '15m'
    });

    res.json({ message: 'Password reset token generated', resetToken: resetToken });
 } catch (err) { 
    res.status(500).json({ message: err.message });
 } 
}); 
module.exports = forgotPassword;
    


