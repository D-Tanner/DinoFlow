const faker = require('faker')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const questions = [
      // title: 'Example',
      // content: 'Example content for question',
      // userId: 3,
      // createdAt: new Date(),
      // updatedAt: new Date()
    ]
    for (let i = 1; i < 60; i++) {
      let newQuestion = {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: i,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      questions.push(newQuestion)
    }
    return queryInterface.bulkInsert('Questions', questions, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
