const Board = require('../models/Board');
const Todo = require('../models/Todo');

module.exports = {
  getAllBoards: async (req, res) => {
    try {
      const boards = await Board.find({user: req.user.id}).sort({ createdAt: 'desc' }).lean();
      res.render('boards.ejs', { boards: boards });
    } catch (err) {
      console.log(err);
      res.redirect('/login')
    }
  },
  getBoard: async (req, res) => {
    const board = await Board.findById(req.params.id);
    const todos = await Todo.find({ board: req.params.id });
    res.render('todos.ejs', { board: board, todos: todos });
  },
  createBoard: async (req, res) => {
    try {
      await Board.create({
        title: req.body.title,
        user: req.user.id,
      });
      
      console.log('Board has been added!');
      res.redirect('/boards');
    } catch (err) {
      console.log(err);
    }
  },
  deleteBoard: async (req, res) => {
    try {
      await Board.findByIdAndRemove({ _id: req.params.id });
      await Todo.deleteMany({ board: req.params.id })
      res.redirect('/boards')
    } catch (err) {
      console.log(err)
    }
  }
};
