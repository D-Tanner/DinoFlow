'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Votes', [
      { userId: 1, answerId: 1, isUpvote: true, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, answerId: 1, isUpvote: true, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, answerId: 2, isUpvote: true, createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, answerId: 2, isUpvote: true, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, answerId: 3, isUpvote: true, createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, answerId: 3, isUpvote: true, createdAt: new Date(), updatedAt: new Date() },
      { userId: 7, answerId: 4, isUpvote: true, createdAt: new Date(), updatedAt: new Date() },
      { userId: 8, answerId: 5, isUpvote: true, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Votes', null, {});
  }
};
