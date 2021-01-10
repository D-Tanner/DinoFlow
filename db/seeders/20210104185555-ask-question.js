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
    // for (let i = 1; i < 60; i++) {
    //   let newQuestion = {
    //     title: faker.lorem.sentence(),
    //     content: faker.lorem.paragraph(),
    //     userId: i,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    //   questions.push(newQuestion)
    // }
    // return queryInterface.bulkInsert('Questions', questions, {});
    return queryInterface.bulkInsert('Questions', [
      { title: 'Was I chased by a t-rex? ...hilarious', content: 'So uh, I was chomping on my lunch when I heard a roar and thundering steps behind me. I ran without looking back. Wondering if I can get some help with a plan of finding out what is was. Anyone know what\'s goin on?', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Is this pterodactyle safe to eat?', content: 'I\'ve never eaten one of these things but I am so hungry. Are there any bones to avoid or diseases I should know about?', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'are humans edible?', content: 'I have been stalking these scientists for days in a jeep, and I am wondering if they are worth the wait.  Is the meet any good? Do they go well with a specific sauce?', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Is there interest in an extinction production?', content: 'With a background in play directing, I want to make a play about us going extinct. I know it is dark, but it will not be more tragic than the play Cats.  I would rather be hit by a meteor than watch that again.', userId: 4, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Does anybody know of a use for the horns on my head?', content: 'I feel like I am not using them properly. I keep bumping into trees.', userId: 5, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Is pangaea splitting a conspiracy?', content: 'I passed a crazy komodo dragon who said the world would split into different land masses and then said I would be dead while his species would live for thousands of years after.  Is this true?', userId: 6, createdAt: new Date(), updatedAt: new Date() },
      { title: 'anybody know of an arm workout? asking for a friend', content: 'One of my friends is a t-rex and he feels bad because his arms are so small. What are excersises that will get him gains?', userId: 7, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Can I change my name so it can be spelled correctly?', content: 'Everybody forgets the p at the beginning of my name, and I want that to change. Is there a valley where they sort out this kind of legal mess?', userId: 8, createdAt: new Date(), updatedAt: new Date() },
      { title: 'How to avoid being stepped on?', content: 'I am a tiny raptor that nearly gets killed by every large dinosaur. I try hopping on them but nearly get eaten.  Are there highways for people like me that I am not seeing?  I fear if I do not find a solution I will be stepped on', userId: 9, createdAt: new Date(), updatedAt: new Date() },
      { title: 'will my neck keep growing?', content: 'I have such a long neck that I am the only one who know the earth is not flat because I can see that high.  I fear my muscles will not be enough to support my long neck.  I am worried any help would be appreciated.', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'In need of a chiropractor', content: 'I have a lot of spine bones shooting out my back, and one of them is crooked. This is a problem since my spine is where I get my identity. Need a fix asap or I will be eaten.', userId: 10, createdAt: new Date(), updatedAt: new Date() },
      { title: 'How to best clean my teeth after a kill?', content: 'Eating other dinosaurs is great and all, but boy the mess is often too much! My arms are too small to brush my teeth, so I need a method of getting clean. Are there any dentists?', userId: 11, createdAt: new Date(), updatedAt: new Date() },
      { title: 'How to best tip over a mammoth', content: 'One of my favorite activities is tipping over mammoths when they are asleep, but they are often hard to find. Is there documentation of migration patterns of these animals?', userId: 5, createdAt: new Date(), updatedAt: new Date() },
      { title: 'What is an ice age?', content: 'I have been told this is something to worry about, but I do not even know what it is.', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Am I cold blooded?', content: 'I fell into a river and nearly froze. Why do I get so cold so often?', userId: 6, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
