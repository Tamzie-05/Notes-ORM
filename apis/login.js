const jwt = require('jsonwebtoken');
const { comparePassword } = require('../util/passwords');
const User = require('../models/users');
const express = require('express');
require('dotenv').config()

const login = express.Router();

login.post('/',async(req,res)=>{
    try{
        const{email, password} = req.body;
        const user = await User.findOne({
            where: {
                email : email
            }
        });
        if(!user){return res.status(404).json({message:'User not found'});
        }
        const passwordCorrect = await comparePassword( password, user.password );

        if(!passwordCorrect){
            return res.status(401).json({message:'Password Incorrect'});
        }
        const token = jwt.sign({
            id:user.id,
            email:user.email
        },
        process.env.JWT_SECRET,
        { expiresIn : '1h'}
    );
    res.json({
        message:'Login successful',
        token:token
    });
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

module.exports = login;