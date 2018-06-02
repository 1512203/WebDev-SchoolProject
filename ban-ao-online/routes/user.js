var express = require('express');
var router = express.Router();
var passport = require('passport');

var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup', isNotLoggedIn, function(req, res, next) {
  var messages = req.flash('error');
  res.send({
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0,
  });
});

router.post('/signup', isNotLoggedIn, function(req, res, next) {
    passport.authenticate('local.signup', {
            failureFlash: true,
        }, function(err, user, info) {
            if (err) {
                return res.send({ 
                    loginSuccess: false,
                    message: err, 
                });
            }
            if (!user) {
                return res.send({ 
                    loginSuccess: false,
                    message: info,
                });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                res.render('user/profile.hbs', {
                    isNotLogin: false,
                    email: 'abc@xyz.com',
                });
            });
        }
    )(req, res, next);
});

router.get('/login', isNotLoggedIn, function(req, res, next) {
  var messages = req.flash('error');
  res.send({
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0,
  });
});

router.post('/login', passport.authenticate('local.signin', {
  successRedirect: './profile',
  failureRedirect: './login',
  failureFlash: true,
}));

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('user/profile', {
    email: 'ngquochuy08@gmail.com',
  });
});

router.get('/history', isLoggedIn, function(req, res, next) {
    res.render('user/history', {
        email: 'ngquochuy08@gmail.com',
    });
});

router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}


function isNotLoggedIn (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
