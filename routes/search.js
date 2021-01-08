const express = require('express')
const router = express.Router()
const { User, Question } = require('../db/models')
const { Op } = require('sequelize')
const { asyncHandler } = require('./utils')

router.get('/search', asyncHandler(async (req, res, next) => {
    const { term } = req.query
    const questions = await Question.findAll({
        where: {
            title: {
                [Op.iLike]: `%${term}%`
            }
        },
        order: [
            ['createdAt', 'DESC']
        ],
        include: ['Answers', { model: User, attributes: ['username'] }],
    })
    res.render('search', { title: 'Search for a question', questions })
}))



module.exports = router
