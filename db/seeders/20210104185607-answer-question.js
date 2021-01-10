const faker = require('faker')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // const answers = []
    // for (let i = 1; i < 60; i++) {
    //   let newAnswer = {
    //     content: faker.lorem.paragraph(),
    //     userId: i,
    //     questionId: i,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    //   answers.push(newAnswer)
    // }
    // return queryInterface.bulkInsert('Answers', answers, {});
    return queryInterface.bulkInsert('Answers', [
      { content: 'Hello GENosaurus, nice to see you again. I would be glad to help you out in quest. I can even lead some of the meetings, as long as I can dismiss the meeting at the end of day. But I will say from the sound of the footsteps, it was in fact a t-rex', userId: 4, questionId: 1, createdAt: new Date(), updatedAt: new Date() },
      { content: 'They are absolutely not safe to eat. They have diseases and germs all over. Highly recommend to avoid these species.', userId: 8, questionId: 2, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Yes they are delicious. Especially the ones who come to take pictures of us. They have funny hats. It is a dumb species I am sure we will outlive them.', userId: 11, questionId: 3, createdAt: new Date(), updatedAt: new Date() },
      { content: 'I agree the Cats production was awful. I would be happy to be in your production. I like acting out things that will never happen to us, but it is fun to pretend.', userId: 6, questionId: 4, createdAt: new Date(), updatedAt: new Date() },
      { content: 'I found this on the wiki: There has been much speculation over the functions of Triceratops head adornments. The two main theories have revolved around use in combat and in courtship display, with the latter now thought to be the most likely primary function.', userId: 3, questionId: 5, createdAt: new Date(), updatedAt: new Date() },
      { content: 'There is absolutely no way the earth can give way and spilt into different land masses. You do not have to worry.', userId: 7, questionId: 6, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Unfortunately your friend cannot get those gains, because his arms are too small. You might want to tell him to focus on leg day.', userId: 5, questionId: 7, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Good luck doing the paperwork for that. Dino bureaucracy is notorious for wait times', userId: 3, questionId: 8, createdAt: new Date(), updatedAt: new Date() },
      { content: 'So you are the one jumping on my back!', userId: 3, questionId: 9, createdAt: new Date(), updatedAt: new Date() },
      { content: 'I think you have the opposite problem as me. But I do know from eating a few of you that there are sturdy bones in your neck, so I am certain you will be fine.', userId: 7, questionId: 10, createdAt: new Date(), updatedAt: new Date() },
      { content: 'I can help with your weird looking spine, I am highly skilled in the anatomic structure. You will want to get that checked quickly if you are to survive.', userId: 9, questionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { content: 'I find the best way to clean your teeth is to keep eating things. Then it will become the new normal.', userId: 10, questionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { content: 'I too enjoy mammoth tipping. I have some documentation passed down from my cousin. I will need to know your location to recommend the spots with the highest traffic. Happy tipping!', userId: 6, questionId: 13, createdAt: new Date(), updatedAt: new Date() },
      { content: 'An ice age is the total desolation of our world. There is nothing to do about that.', userId: 1, questionId: 14, createdAt: new Date(), updatedAt: new Date() },
      { content: 'I found this on the wiki: Scientists have conflicting opinions on this subject. Some paleontologists think that all dinosaurs were warm- blooded in the same sense that modern birds and mammals are: that is, they had rapid metabolic rates. Other scientists think it unlikely that any dinosaur could have had a rapid metabolic rate.', userId: 5, questionId: 15, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Answers', null, {});
  }
};
