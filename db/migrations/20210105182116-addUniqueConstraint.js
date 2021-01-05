'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Votes', ['userId', 'answerId'], {
      type: 'unique',
      name: 'users-votes'
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeConstraint('Votes', 'users-votes');
  }
};
