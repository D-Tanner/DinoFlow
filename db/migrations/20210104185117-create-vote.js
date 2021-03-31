'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      answerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Answers' }
      },
      // indexes: [{
      //   unique: true,
      //   fields: ['userId', 'answerId', 'upvotes']
      // }, {
      //   unique: true,
      //   fields: ['userId', 'answerId', 'downvotes']
      // }],
      isUpvote: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Votes');
  }
};
