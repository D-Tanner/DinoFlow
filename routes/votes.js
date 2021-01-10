const express = require('express');
const router = express.Router();
const csrf = require('csurf')
const { Answer, Vote } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');

router.post("/answers/:id(\\d+)/votes", asyncHandler(async (req, res) => {
    //acquiring userId from local storage
    const userId = res.locals.user.id;
    //acquiring answerId from request and making it a decimal number
    const answerId = parseInt(req.params.id, 10);
    //acquiring from req.body
    const { isUpvote } = req.body
    //querying database for unique vote
    const voteExists = await Vote.findOne({ where: { userId, answerId } });
    //response variable
    let response;
    let voteCount;
    //setting up response if vote exists
    if (voteExists) {
        if (voteExists.isUpvote === isUpvote) {
            response = { sameVote: true }
        } else if (!req.body.isUpvote) {
            response = await voteExists.update({ isUpvote: false });
        } else {
            response = await voteExists.update({ isUpvote: true });
        }
        voteCount = await countVotes(answerId);
        //return response and voteCount
        return res.json({ response, voteCount })
    }
    //creating vote if vote does not exists and updating count
    else {
        //create vote and store in response variable
        response = await Vote.create(
            {
                userId,
                answerId,
                isUpvote
            }
        )
        //checks for upvote or downvote and updates vote count
        voteCount = await countVotes(answerId);

        res.json({ response, voteCount })
    }
}))

async function countVotes(answerId) {
    //acquiring all votes based on answerid
    const votes = await Vote.findAll({ where: { answerId } })
    //calculating vote total
    return voteCount = votes.reduce((acc, vote) => {
        if (vote.dataValues.isUpvote) {
            return ++acc;
        }
        return --acc;
    }, 0)
}
// router.get("/answers/:id(\\d+)/votes", asyncHandler(async (req, res) => {
//     const userId = res.locals.user.id;
//     const answerId = parseInt(req.params.id, 10);

//     const voteExists = await Vote.findOne({ where: { userId, answerId } });
//     console.log(voteExists);

//     res.json(voteExists)
// }))

module.exports = router