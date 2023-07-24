const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  content: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    enum: ['todo'],
    default: 'todo',
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Todo', TodoSchema);
