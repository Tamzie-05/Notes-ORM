require('dotenv').config()

const express = require('express');
const login = require('./apis/login.js')
const register = require('./apis/register.js')
const forgotPassword = require('./apis/forgotpassword.js')
const resetPassword = require('./apis/resetpassword.js')
const authenticateToken = require('./middleware/authenticateToken.js');
const notes = require('./apis/notes.js')
const app = express();


app.use(express.json());
app.use('/login', login);
app.use('/signup', register);
app.use('/forgot',forgotPassword)
app.use('/notes',authenticateToken,notes)
app.use('/reset',resetPassword)


app.get('/me', authenticateToken, (req, res) => {
    res.json({
        message: 'You are authenticated',
        user: req.user
    });
});

app.listen(process.env.PORT,()=>{
    console.log(`server is listening on port ${process.env.PORT}`)
})
module.exports = app;