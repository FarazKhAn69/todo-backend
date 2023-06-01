const express = require('express');
const bodyParser = require('body-parser');
// const collection = require("./mongodb");
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
const {User} = require('./Tododb')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const forgetauth = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      res.status(401).send('Incorrect email');
      return;
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // // Generate a new RSA key pair
    // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    //   modulusLength: 2048,
    // });

    // // Convert the private key to PEM format
    // const privateKeyPEM = privateKey.export({ type: 'pkcs1', format: 'pem' });

    // // Sign the token using the private key
    // const token = jwt.sign({ email }, privateKeyPEM, { algorithm: 'RS256' });

    // res.send({ token, message: 'Token Generated' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

module.exports = forgetauth;
