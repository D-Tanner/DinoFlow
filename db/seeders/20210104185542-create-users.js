const faker = require('faker')
const bcrypt = require('bcryptjs')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const users = [];
    // for (let i = 1; i < 60; i++) {
    //   let newUser = {
    //     username: faker.internet.userName(),
    //     email: faker.internet.email(),
    //     hashedPassword: await bcrypt.hash(`password${i}`, 10),
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    //   users.push(newUser)
    // }

    // return queryInterface.bulkInsert('Users', users, {});
    return queryInterface.bulkInsert('Users', [
      { username: 'GENosaurus', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()), createdAt: new Date(), updatedAt: new Date() },
      { username: 'chomper42', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()), createdAt: new Date(), updatedAt: new Date() },
      { username: 'dino-mite', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()), createdAt: new Date(), updatedAt: new Date() },
      { username: 'EDosaurus', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()), createdAt: new Date(), updatedAt: new Date() },
      { username: 'TimmyTheTriceratops', email: faker.internet.email(), hashedPassword: bcrypt.hashSync("password"), createdAt: new Date(), updatedAt: new Date() },
      { username: 'Bronto-Thunder', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()), createdAt: new Date(), updatedAt: new Date() },
      { username: 'little-arms-anonymous', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()), createdAt: new Date(), updatedAt: new Date() },
      { username: 'pete_the_pterodactyl', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()), createdAt: new Date(), updatedAt: new Date() },
      { username: 'dont-eat-me', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()), createdAt: new Date(), updatedAt: new Date() },
      { username: 'Spinosaurus', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()), createdAt: new Date(), updatedAt: new Date() },
      { username: 't-rexy', email: faker.internet.email(), hashedPassword: bcrypt.hashSync(faker.internet.password()), createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
