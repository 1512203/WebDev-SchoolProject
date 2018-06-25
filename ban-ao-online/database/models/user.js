'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
      fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    address: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Product, {
        foreignKey: 'postedBy',
        as: 'products',
    });
    User.hasMany(models.Order, {
        foreignKey: 'userID',
        as: 'orders',
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
