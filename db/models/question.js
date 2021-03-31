'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Question.associate = function (models) {
    Question.hasMany(models.Answer, { foreignKey: 'questionId', onDelete: "CASCADE", hooks: true })
    Question.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Question;
};
