'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  Answer.associate = function (models) {
    Answer.belongsTo(models.Question, { foreignKey: 'questionId' })
    Answer.hasMany(models.Vote, { foreignKey: 'answerId', onDelete: 'CASCADE', hooks: true })
    Answer.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Answer;
};
