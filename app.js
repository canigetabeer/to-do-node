// app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory database (you can replace it with a real database like MongoDB or SQLite later)
let todos = [];


// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ message: "Task is required!" });
    }

    const newTodo = {
        id: todos.length + 1,
        task,
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a todo's completion status
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    const todo = todos.find(t => t.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = completed !== undefined ? completed : todo.completed;
    res.json(todo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(t => t.id === parseInt(id));

    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todos.splice(todoIndex, 1);
    res.status(204).end();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
