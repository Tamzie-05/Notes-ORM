const jwt = require('jsonwebtoken');
const { comparePassword } = require('../util/passwords');
const User = require('../models/users');
const validate =  require('../middleware/validate')
const {loginSchema} = require('../validations/authvalidation')
const express = require('express');
require('dotenv').config()

const login = express.Router();

login.post('/',validate(loginSchema),async(req,res)=>{
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
        const accessToken = jwt.sign({
            id:user.id,
            email:user.email
        },
        process.env.JWT_SECRET,{ expiresIn : '1h'}
    );

        const refreshToken = jwt.sign({
            id : user.id,
            email : user.email
        },
        process.env.REFRESH_TOKEN_SECRET,{ expiresIn : '1d'}
    );

    res.json({
        message:'Login successful',
        accessToken:accessToken,
        refreshToken:refreshToken
    });
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

module.exports = login;