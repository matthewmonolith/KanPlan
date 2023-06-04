const Todo = require('../models/todotask');

module.exports = {
  getTodos: async (req, res) => {
    try {
      const allTodos = await Todo.find({ status: 'todo' });
      res.render('index.ejs', {todos: allTodos})
    } catch (error) {
      console.log(error);
    }
  },
  createTodo: async (req, res) => {
    try {
        await Todo.create({todo: req.body.todoItem, status: 'todo'})
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
  },
  markTodo: async (req, res) => {
    try {

    } catch (error) {
      console.log(error);
    }
  },
  markDoing: async (req, res) => {
    try {

    } catch (error) {
      console.log(error);
    }
  },
  markDone: async (req, res) => {
    try {

    } catch (error) {
      console.log(error);
    }
  },
  deleteTodo: async (req, res) => {
    try {

    } catch (error) {
      console.log(error);
    }
  },
}
