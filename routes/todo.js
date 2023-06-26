const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos');
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos);

router.post('/createTodo', todosController.createTodo);

router.put('/markTodo', todosController.markTodo);

router.put('/markDoing', todosController.markDoing);

router.put('/markDone', todosController.markDone);

router.put('/updateContent', todosController.updateContent)

router.delete('/deleteTodo', todosController.deleteTodo);

module.exports = router;