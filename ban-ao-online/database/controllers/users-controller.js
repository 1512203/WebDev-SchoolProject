var usersModel = require('../models').User;

module.exports = {
    createNewUser(email, password, phonenumber, fullname, address, done) {
        return usersModel
            .create({
                email: email,
                password: usersModel.encryptPassword(password),
                phonenumber: phonenumber,
                fullname: fullname,
                address: address,
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
    },

    updateUserInformation(usrID, userInfo, done) {
        if (userInfo.password) {
            userInfo.password = usersModel.encryptPassword(userInfo.password);
        }

        return usersModel
            .update(userInfo, {
                where: {
                    id: usrID,
                },
            })
            .then(function() {
                done(null);
            })
            .catch(function(error) {
                done(error);
            });
    },
};
