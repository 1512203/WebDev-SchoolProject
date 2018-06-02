var usersModel = require('../models').User;

module.exports = {
    createNewUser(email, password, done) {
        usersModel
        .create({
            email: email,
            password: usersModel.encryptPassword(password),
        })
        .then(function(newUser) {
            done(null, newUser);
        })
        .catch(function(error) {
            done(error);
        });
    },

    findOneUser(email, done) {
        usersModel
        .findAll({where: {
            email: email,
        }})
        .then(function(users) {
            done(null, users);
        })
        .catch(function(error) {
            done(error);
        });
    },

    findUserById(id, done) {
        usersModel
        .findById(id)
        .then(function(user) {
            done(null, user);
        })
        .catch(function(error) {
            done(error);
        });
    }
};
