const faker = require('faker')
const bcrypt = require('bcryptjs')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 1; i < 10; i++) {
      let newUser = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        hashedPassword: await bcrypt.hash(`password${i}`, 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      users.push(newUser)
    }

    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
