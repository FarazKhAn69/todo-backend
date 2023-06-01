const express = require('express')
const bodyParser = require('body-parser');
const { User } = require('./Tododb');
const app = express()


const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (user) {
            // Email already exists
            res.status(409).send('Email already exists');
        } else {
            const newUser = new User({ email, password })
            await newUser.save();
            res.send('User successfully Signup')
            
        //   const loginresult= await loginauth(req, res);
          
            
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

module.exports = signup;