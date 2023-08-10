const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')
const ErrorHandler = require('../middleware/errorHandler');

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/boards')
    }
    res.render('login', {
      title: 'Login',
      message: req.flash('errors') // Pass the flash error message to the view 
    })
  }
  
  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/boards')
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/boards')
    }
    try {
      res.render('signup', {
        title: 'Create Account',
        message: req.flash('errors')
      });
    } catch (error){
       // If an error occurs during rendering, pass it to the ErrorHandler middleware
      next(error);
    }
   
  }

  exports.postSignup = async (req, res, next) => {
    try {
      const validationErrors = [];
      if (!validator.isEmail(req.body.email))
        validationErrors.push({ msg: 'Please enter a valid email address.' });
      if (!validator.isLength(req.body.password, { min: 8 }))
        validationErrors.push({ msg: 'Password must be at least 8 characters long.' });
      if (req.body.password !== req.body.confirmPassword)
        validationErrors.push({ msg: 'Passwords do not match.' });
  
      if (validationErrors.length) {
        req.flash('errors', validationErrors);
        return res.redirect('../signup');
      }
  
      req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
  
      const existingUser = await User.findOne({
        $or: [
          { email: req.body.email },
          { userName: req.body.userName }
        ]
      });
  
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' });
        return res.redirect('../signup');
      }
  
      const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
      });
  
      await user.save();
  
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/boards');
      });
    } catch (error) {
      next(error);
    }
  };  

  exports.changeUsername = (req, res) => {
    res.render('changeUsername', {
      title: 'Change Username'
    })
  }

  exports.updateUsername = async (req, res, next) => {
    try {
      const { newUserName } = req.body
      
      if (!req.user) {
        return res.status(401).json({ message: 'You are not logged in.' })
      }

      const authenticatedUser = await User.findById(req.user.id)

      authenticatedUser.userName = newUserName
      
      await authenticatedUser.save()

      res.redirect('/boards')

      res.json({ message: 'Username updated successfully. '})
    } catch (error) {
      next(error)
    }
  }

  exports.changePassword = (req, res) => {
    res.render('changePassword', {
      title: 'Change Password'
    })
  }