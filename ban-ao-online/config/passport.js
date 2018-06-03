var passport = require('passport');
var controllers = require('../database/controllers');
var usersController = controllers.usersController;
var localStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    usersController.findUserById(id, done);
});

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, 
function(req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 8,});
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    usersController.findOneUser(email, function(error, users) {
        if (error) {
            return done(error);
        }
        if (users.length > 0) {
            return done(null, false, {
                message: 'Email is already in used',
            });
        }
        else {
            usersController.createNewUser(email, password, function(error, newUser) {
                if (error) {
                    return done(error);
                }
                return done(null, newUser);
            });
        }
    })
}));

passport.use('local.signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, function(req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    usersController.findOneUser(email, function(error, users) {
        if (error) {
            return done(error);
        }
        if (users.length != 1) {
            return done(null, false, {
                message: 'No user found',
            });
        }
        else {
            user = users[0];
            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Wrong password.'});
            }
            return done(null, user);
        }
    })
   
}));