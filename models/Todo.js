const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
title: {
    type: String,
    required: true
},
content: {
    type: String,
    required: true
},
status: {
    type: String, 
    enum: ['todo'],
    default: 'todo',
},
dateCreated: {
    type: Date,
    default: Date.now
},
userId: {
    type: String,
    required: true
}
//require userCreated after user login is implemented
// userCreated: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
// }
})
module.exports = mongoose.model('Todo',TodoSchema,'todos');