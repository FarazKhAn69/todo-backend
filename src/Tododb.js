const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://farazinfinity:AOixgzUmRF5NCSK0@cluster0.jzbucpp.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("mongodb not connected");
  });

  const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
  });
  
  // Define the Todo schema
  const todoSchema = new mongoose.Schema({
    list: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', },
  });
  
  // Create the User model
  const User = mongoose.model('users', userSchema);
  
  // Create the Todo model
  const Todo = mongoose.model('Todo', todoSchema);
  
  module.exports = { User, Todo };