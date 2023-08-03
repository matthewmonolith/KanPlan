const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const boardsController = require('../controllers/boards')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex) 
router.get('/boards', boardsController.getAllBoards) 
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)
router.get('/changeUsername', ensureAuth, authController.changeUsername)

module.exports = router