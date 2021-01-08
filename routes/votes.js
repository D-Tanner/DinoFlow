const express = require('express');
const router = express.Router();
const csrf = require('csurf')
const { Question, Answer, Vote } = require('../db/models')
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');



router.post("/answers/:id(\\d+)/votes", asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10)
    const answerId = parseInt(req.params.id, 10)

    const { isUpvote } = req.body

    const voteChange = await Vote.create(
        {
            userId,
            answerId,
            isUpvote
        }
    )
    res.json(voteChange)
}))

module.exports = router