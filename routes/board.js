const express = require('express');
const router = express.Router();
const boardsController = require('../controllers/boards');
const { ensureAuth } = require('../middleware/auth')

router.get('/:id', ensureAuth, boardsController.getBoard);

router.post('/createBoard', boardsController.createBoard);

router.delete('/deleteBoard/:id', boardsController.deleteBoard);

module.exports = router;