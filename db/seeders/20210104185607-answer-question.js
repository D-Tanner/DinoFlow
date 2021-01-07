const faker = require('faker')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const answers = []
    for (let i = 1; i < 60; i++) {
      let newAnswer = {
        content: faker.lorem.paragraph(),
        userId: i,
        questionId: i,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      answers.push(newAnswer)
    }
    return queryInterface.bulkInsert('Answers', answers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Answers', null, {});
  }
};
