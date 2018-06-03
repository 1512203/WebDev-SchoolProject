'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Product, {
        foreignKey: 'postedBy',
        as: 'products',
    });
  };

  User.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
  }

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }
  return User;
};
