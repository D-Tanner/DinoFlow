'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Question, { foreignKey: 'questionId' })
    User.hasMany(models.Vote, { foreignKey: 'userId' })
  };
  return User;
};
