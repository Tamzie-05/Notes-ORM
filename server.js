const express = require('express');
const login = require('./apis/login.js')
const register = require('./apis/register.js')
const forgotPassword = require('./apis/forgotpassword.js')
const app = express();
require('dotenv').config()

app.use(express.json());
app.use('/login', login);
app.use('/signup', register);
app.use('/forgot',forgotPassword)

app.get('/me', (_req,res)=>{
    res.send('hello world');
})

app.listen(process.env.PORT,()=>{
    console.log(`server is listening on port 5000 ${process.env.PORT}`)
})
module.exports = app;