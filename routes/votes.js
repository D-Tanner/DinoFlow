const express = require('express');
const router = express.Router();
const csrf = require('csurf')
const { Question, Answer, Vote } = require('../db/models')
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');



router.post("/answers/:id(\\d+)/votes", asyncHandler(async (req, res) => {
    const userId = res.locals.user.id;
    const answerId = parseInt(req.params.id, 10);

    const { isUpvote } = req.body

    const voteExists = await Vote.findOne({ where: { userId, answerId } });
    console.log(voteExists);
    let updatedVote;
    if(voteExists){
        console.log("in the loop")
        if (!req.body.isUpvote) {
            console.log("changing to false")
            updatedVote = await voteExists.update({ isUpvote: false } );
        } else {
            console.log("changing to true")
            updatedVote = await voteExists.update({ isUpvote: true } );
        }
        console.log(" done with loop", updatedVote)
        return res.json(updatedVote)
    }
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