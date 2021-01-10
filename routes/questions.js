const express = require('express');
const router = express.Router();
const csrf = require('csurf')
const { Question, Answer, User } = require('../db/models')
const { check, validationResult } = require('express-validator');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils')


/* GET users listing. */
router.get('/ask-question', csrfProtection, asyncHandler(async (req, res, next) => {
  res.render('ask-question-page', { title: 'Ask a Question', question: {}, csrfToken: req.csrfToken() })
}));

const questionValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage("Please have a title."),
  check('content')
    .exists({ checkFalsy: true })
    .withMessage("Please fill out input field.")
]

const answerValidators = [
  check('content')
    .exists({ checkFalsy: true })
    .withMessage("Please fill out input field.")
]

router.post('/ask-question', csrfProtection, questionValidators, asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  let errors = [];

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    //I need to assign a question ID for each question that is posted ???
    await Question.create({ title, content, userId: req.session.auth.userId })
    // const question = await Question.findByPk() // ?????????????
    return res.redirect('/')
  } else {
    errors = validatorErrors.array().map((error) => error.msg)
  }

  res.render('ask-question-page', {
    title: 'Ask a Question',
    errors,
    question: {},
    csrfToken: req.csrfToken()
  })

}));

router.get('/question/:id(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
  const questionId = parseInt(req.params.id, 10)

  //Sebastian's old query
  // const question = await Question.findByPk(questionId, {
  //   include: [
  //     {
  //       model: Answer,
  //       include: [
  //         {
  //           model: User,
  //           attributes: [
  //             'username'
  //           ]
  //         }
  //       ],
  //     },
  //     {
  //       model: User,
  //       attributes: [
  //         'username'
  //       ]
  //     },
  //   ]
  // })

  //Original
  //const question = await Question.findByPk(questionId, { include: [{ model: User, attributes: ['username'] }, { model: Answer, include: ['Votes'] }] })

  const question = await Question.findByPk(questionId, {
    include: [{
      model: Answer,
      include: [
        {
          model: User,
          attributes: [
            'username'
          ]
        }
      ],
    },
    {
      model: User,
      attributes: [
        'username'
      ]
    }, { model: User, attributes: ['username'] }, { model: Answer, include: ['Votes'] }]
  })
  // const question = await Question.findByPk(questionId, { include: [{ model: Answer, include: [{ include: [{ model: User, attributes: ['username'] }] },
  // { model: User, attributes: ['username'] },
  // { model: Answer, include: ['Votes'] }] })
  for (let answer of question.Answers) {
    answer.dataValues.Votes = answer.Votes.reduce((acc, vote) => {
      if (vote.isUpvote) {
        return ++acc;
      }
      return --acc;
    }, 0)
  }



  const sortedAnswers = question.Answers.sort((a, b) => {
    // console.log("a   ", a.dataValues.Votes)
    // console.log("b   ", b.dataValues.Votes)
    if (a.dataValues.Votes <= b.dataValues.Votes) {
      // if (a.createdAt > b.createdAt) {
      return 1
    } else {
      return -1
    }
  })

  //previous main's question query that was replaced by Juan and Lu's query
  //const question = await Question.findByPk(questionId, { include: ['Answers', { model: User, attributes: ['username'] }] })


  res.render('question', { title: 'Question', question, answers: question.Answers, sortedAnswers, csrfToken: req.csrfToken() },)

}));

//!csrf messes up with 403 error
//TODO re-add , csrfProtection


router.post('/question/:id(\\d+)/answers', answerValidators, asyncHandler(async (req, res, next) => {
  const questionId = parseInt(req.params.id, 10)
  // console.log(questionId)
  // {userId} = Answer
  const { content } = req.body
  // console.log(req.session)
  const validatorErrors = validationResult(req)
  let errors = []
  if (validatorErrors.isEmpty()) {
    const ans = await Answer.create(
      {
        content,
        questionId,
        userId: req.session.auth.userId
      }
    )
    return res.json(ans)
  }
  else {
    errors = validatorErrors.array().map(err => err.msg)
  }

  res.json({ errors })

}))



module.exports = router;
