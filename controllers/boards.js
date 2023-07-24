const Board = require('../models/Board');
// const Comment = require('../models/Comment');

module.exports = {
  getAllBoards: async (req, res) => {
    try {
      const boards = await Board.find({user: req.user.id}).sort({ createdAt: 'desc' }).lean();
      res.render('boards.ejs', { boards: boards });
    } catch (err) {
      console.log(err);
    }
  },
  getBoard: async (req, res) => {
    const board = await Board.findById(req.params.id);
    res.render('board.ejs', { board: board })
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
};
