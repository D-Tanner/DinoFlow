const express = require('express');
const router = express.Router();
const { Question } = require('../db/models')
const { asyncHandler } = require('./utils')
/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const questions = await Question.findAll()
  res.render('home-page', { title: 'Questions', questions });
}));


module.exports = router;
