const { Todo, User} = require('./Tododb');

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { list, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const newTodo = new Todo({
      list,
      userId: user._id
    });

    await newTodo.save();

    res.status(200).send('Todo added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};


// Retrieve todos by user ID
const fetchTodosByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (err) {
    console.error('Error retrieving todos:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Update a todo
const updateTodo = async (req,res ) => {
  try {
    const todoId = req.params.todoId;
    const { list } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, { list }, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).send('Internal server error');
  }
}

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const todoId = req.body.todoId;

    // Check if todoId is provided
    if (!todoId) {
      return res.status(400).send('Todo ID is required');
    }

    await Todo.findByIdAndDelete(todoId);
    res.send('Todo deleted successfully');
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).send('Internal server error');
  }
};


module.exports = {
  createTodo,
  fetchTodosByUserId,
  updateTodo,
  deleteTodo,
};
