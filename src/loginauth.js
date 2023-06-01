const express = require('express')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const {user, User} = require('./Tododb')
// const collection = require("./mongodb")
const {verifyToken} = require("./jwtservice")
const app = express()

const PrivatekeyPath = 'keys/Privatekey.pem'
const Privatekey = fs.readFileSync(PrivatekeyPath, 'utf8');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 


const loginauth = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });


    if (!user) {
      // User not found
      res.status(401).send('Incorrect email');
      return;
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      // Incorrect password
      res.status(401).send('Incorrect Password');
      return;
    }

    // res.send('Login Successful')
    // Login successful


    const token = jwt.sign({ email }, Privatekey,{ algorithm: 'RS256' } ); // Replace with your own secret
   const verifed = verifyToken(token)
  //  console.log(verifed)
    // res.send({ token, message: "Login Sucessful" });

    res.json({ token, id: user._id, message: 'Login Successful' });

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

module.exports = loginauth;