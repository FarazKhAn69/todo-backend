const express = require("express")
const {verifyToken} = require('./jwtservice')
const loginauth = require('./loginauth')
const forgetauth = require('./forgetauth.js')
const {verifyTokenHandler} = require('./jwtservice')
const app = express()
const todoList = require('./Todolist')
const {Todo, User} = require('./Tododb')
const bodyParser = require("body-parser")
const crypto = require('crypto');
const signup = require("../src/signup")
const { createTodo, fetchTodosByUserId, updateTodo, deleteTodo } = require('./Todolist');
const mongoose = require('mongoose')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api/login', loginauth)
app.post('/forgetauth', forgetauth)
app.post('/signup',signup)
// app.post('/api/verify-token',verifyTokenHandler)



const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  // Verify the token
  const decoded = verifyToken(token.split(' ')[1]);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Token is valid, proceed to the next middleware or route handler
  next();
}

app.post('/create', createTodo);

app.get('/todos/:userId', fetchTodosByUserId);

// Update todo route
app.put('/update/:todoId', updateTodo)
  
// Delete todo route
app.delete('/delete', deleteTodo)


app.listen(3001, () => {
    console.log("port 3001 connected")
})